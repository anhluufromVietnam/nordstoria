import os
import re
import io
import json
import uuid
from datetime import datetime, timezone

from dotenv import load_dotenv

load_dotenv()

from PIL import ImageDraw, ImageFont, ImageStat
import PIL.Image as PILImage

from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from google import genai
from google.genai.types import (
    RecontextImageSource,
    ProductImage,
    Image,
    GenerateImagesConfig,
    GenerateContentConfig,
    ImageConfig,
    Part,
)

PROJECT_ID = os.getenv(
    "GOOGLE_CLOUD_PROJECT",
    "spry-sensor-509018-t5"
)

LOCATION = os.getenv(
    "GOOGLE_CLOUD_LOCATION",
    "global"
)

client = genai.Client(
    vertexai=True,
    project=PROJECT_ID,
    location=LOCATION,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
os.makedirs("results", exist_ok=True)

# Model fallback chains: first available model wins.
IMAGEN_MODELS = [
    "imagen-4.0-generate-001",
    "imagen-3.0-generate-002",
    "imagen-3.0-generate-001",
]

GEMINI_IMAGE_MODELS = [
    "gemini-2.5-flash-image",
    "gemini-2.0-flash-preview-image-generation",
]

TEXT_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
]


def _save_image_bytes(data: bytes) -> str:
    job_id = str(uuid.uuid4())
    path = f"results/{job_id}.png"
    with open(path, "wb") as f:
        f.write(data)
    return job_id


BRAND_STAR_OUTER = ((50, 4), (58, 42), (96, 50), (58, 58), (50, 96), (42, 58), (4, 50), (42, 42))
BRAND_STAR_INNER = ((50, 22), (54, 46), (78, 50), (54, 54), (50, 78), (46, 54), (22, 50), (46, 46))
BRAND_WORDMARK = "VYIQ × NORD STORIA"


def _brand_logo_mark(size: int, outer, inner) -> Image.Image:
    mark = PILImage.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(mark)
    scale = size / 100.0
    draw.polygon([(x * scale, y * scale) for x, y in BRAND_STAR_OUTER], fill=outer)
    draw.polygon([(x * scale, y * scale) for x, y in BRAND_STAR_INNER], fill=inner)
    return mark


def _brand_font(size: int):
    for font_path in (
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        try:
            return ImageFont.truetype(font_path, size)
        except Exception:
            continue
    return ImageFont.load_default()


def _apply_brand_identity(image_bytes: bytes, variant: str = "product") -> bytes:
    """Stamp the VyIQ × Nord Storia logo + wordmark onto a generated image."""
    try:
        image = PILImage.open(io.BytesIO(image_bytes)).convert("RGBA")
        width, height = image.size

        corner = image.crop((int(width * 0.70), int(height * 84 // 100), width, height)).convert("L")
        brightness = ImageStat.Stat(corner).mean[0] if corner.size else 255
        if brightness < 110:
            outer, inner, text_fill = (239, 235, 227), (168, 191, 201), (239, 235, 227)
        else:
            outer, inner, text_fill = (16, 16, 18), (32, 54, 245), (16, 16, 18)

        mark_size = max(30, int(width * (0.055 if variant == "campaign" else 0.042)))
        alpha = 235 if variant == "campaign" else 255
        mark = _brand_logo_mark(mark_size, outer + (alpha,), inner + (alpha,))

        font = _brand_font(max(12, int(mark_size * 0.30)))
        probe = ImageDraw.Draw(PILImage.new("RGBA", (1, 1)))
        text_box = probe.textbbox((0, 0), BRAND_WORDMARK, font=font)
        text_w, text_h = text_box[2] - text_box[0], text_box[3] - text_box[1]

        gap = int(mark_size * 0.28)
        margin = int(width * 0.045)
        x = max(0, width - margin - (mark_size + gap + text_w))
        y = max(0, height - margin - mark_size)

        layer = PILImage.new("RGBA", image.size, (0, 0, 0, 0))
        layer.alpha_composite(mark, (x, y))
        text_layer = PILImage.new("RGBA", (text_w + 4, text_h + 4), (0, 0, 0, 0))
        ImageDraw.Draw(text_layer).text(
            (2 - text_box[0], 2 - text_box[1]),
            BRAND_WORDMARK,
            font=font,
            fill=text_fill + (alpha,),
        )
        layer.alpha_composite(text_layer, (x + mark_size + gap, y + (mark_size - text_h) // 2))
        image.alpha_composite(layer)

        output = io.BytesIO()
        image.convert("RGB").save(output, "PNG")
        return output.getvalue()
    except Exception as e:
        print("BRAND STAMP FALLBACK:", repr(e))
        return image_bytes


BRAND_LOGO_PATH = "brand/logo.png"
_brand_logo_cache = None


def _brand_logo_reference() -> bytes:
    global _brand_logo_cache
    if _brand_logo_cache:
        return _brand_logo_cache
    if os.path.exists(BRAND_LOGO_PATH):
        with open(BRAND_LOGO_PATH, "rb") as f:
            _brand_logo_cache = f.read()
        return _brand_logo_cache
    mark = _brand_logo_mark(512, (16, 16, 18, 255), (32, 54, 245, 255))
    os.makedirs("brand", exist_ok=True)
    buffer = io.BytesIO()
    mark.save(buffer, "PNG")
    _brand_logo_cache = buffer.getvalue()
    with open(BRAND_LOGO_PATH, "wb") as f:
        f.write(_brand_logo_cache)
    return _brand_logo_cache


def _place_logo_on_product(product_bytes: bytes, product_type: str) -> bytes:
    """Second-pass edit: place the real brand logo onto the generated product."""
    prompt = (
        f"First image: a professional product photo of a {product_type}. "
        "Second image: the official VyIQ × Nord Storia brand logo, an eight-pointed compass star. "
        f"Place this exact logo on the {product_type} as a small, elegant embroidered or printed brand mark "
        "on the most natural spot (chest or upper front for clothing, center or side panel for bags, "
        "side or tongue for sneakers, front panel for caps). "
        "Reproduce the star shape exactly as shown in the second image, scaled realistically for the product, "
        "with the thread or print color adapted to contrast subtly with the fabric. "
        "Keep the product design, colors, pose, lighting and studio background exactly unchanged. "
        "Photorealistic commercial catalog quality. No text, no watermark."
    )
    product_part = Part.from_bytes(data=product_bytes, mime_type="image/png")
    logo_part = Part.from_bytes(data=_brand_logo_reference(), mime_type="image/png")
    last_error = None

    for model in GEMINI_IMAGE_MODELS:
        try:
            response = client.models.generate_content(
                model=model,
                contents=[prompt, product_part, logo_part],
                config=GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                ),
            )
            if response.candidates:
                for part in response.candidates[0].content.parts:
                    if part.inline_data and part.inline_data.data:
                        return part.inline_data.data
        except Exception as e:
            last_error = e
            continue

    print("LOGO PLACEMENT FALLBACK:", repr(last_error))
    return product_bytes


def _generate_product_image(prompt: str) -> bytes:
    last_error = None

    for model in IMAGEN_MODELS:
        try:
            response = client.models.generate_images(
                model=model,
                prompt=prompt,
                config=GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio="1:1",
                ),
            )
            if response.generated_images:
                generated = response.generated_images[0]
                if generated.image and generated.image.image_bytes:
                    return generated.image.image_bytes
        except Exception as e:
            last_error = e
            continue

    for model in GEMINI_IMAGE_MODELS:
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt,
                config=GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                ),
            )
            if response.candidates:
                for part in response.candidates[0].content.parts:
                    if part.inline_data and part.inline_data.data:
                        return part.inline_data.data
        except Exception as e:
            last_error = e
            continue

    raise Exception(f"Product generation failed: {last_error}")


def _generate_campaign_image(prompt: str, source_image: bytes, mime_type: str = "image/png") -> bytes:
    image_part = Part.from_bytes(data=source_image, mime_type=mime_type)
    last_error = None

    for model in GEMINI_IMAGE_MODELS:
        for image_config in (
            ImageConfig(aspect_ratio="16:9", image_size="2K"),
            None,
        ):
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=[prompt, image_part],
                    config=GenerateContentConfig(
                        response_modalities=["TEXT", "IMAGE"],
                        image_config=image_config,
                    ),
                )
                if response.candidates:
                    for part in response.candidates[0].content.parts:
                        if part.inline_data and part.inline_data.data:
                            return part.inline_data.data
            except Exception as e:
                last_error = e
                continue

    raise Exception(f"Campaign generation failed: {last_error}")


def _generate_text(prompt: str) -> str:
    last_error = None

    for model in TEXT_MODELS:
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )
            if response.text:
                return response.text.strip()
        except Exception as e:
            last_error = e
            continue

    raise Exception(f"Text generation failed: {last_error}")


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "project": PROJECT_ID,
        "location": LOCATION,
    }


@app.post("/try-on")
async def try_on(
    person: UploadFile = File(...),
    clothing: UploadFile = File(...),
):
    job_id = str(uuid.uuid4())

    person_path = f"uploads/{job_id}_person.jpg"
    clothing_path = f"uploads/{job_id}_clothing.jpg"
    result_path = f"results/{job_id}.png"

    try:

        # -------------------------
        # Save person image
        # -------------------------

        person_data = await person.read()

        with open(person_path, "wb") as f:
            f.write(person_data)

        # -------------------------
        # Save clothing image
        # -------------------------

        clothing_data = await clothing.read()

        with open(clothing_path, "wb") as f:
            f.write(clothing_data)

        print("Calling Google Virtual Try-On...")

        # -------------------------
        # Google VTO
        # -------------------------

        result = client.models.recontext_image(
            model="virtual-try-on-001",

            source=RecontextImageSource(
                person_image=Image.from_file(
                    location=person_path
                ),

                product_images=[
                    ProductImage(
                        product_image=Image.from_file(
                            location=clothing_path
                        )
                    )
                ],
            ),
        )

        print("Google response:")
        print(result)

        # -------------------------
        # Check result
        # -------------------------

        if not result.generated_images:
            raise Exception(
                "Google did not return any generated image"
            )

        generated = result.generated_images[0]

        # Safety filter
        if generated.rai_filtered_reason:

            raise HTTPException(
                status_code=400,
                detail={
                    "type": "IMAGE_FILTERED",
                    "reason": generated.rai_filtered_reason,
                },
            )

        if generated.image is None:
            raise Exception(
                "Generated image is empty"
            )

        if not generated.image.image_bytes:
            raise Exception(
                "Generated image bytes are empty"
            )

        # -------------------------
        # Save result
        # -------------------------

        generated.image.save(
            result_path
        )

        print(
            f"Saved: {result_path}"
        )

        return {
            "success": True,
            "job_id": job_id,
            "result": f"/result/{job_id}",
        }

    except HTTPException:
        raise

    except Exception as e:

        print("TRY-ON ERROR:")
        print(repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@app.get("/result/{job_id}")
async def get_result(job_id: str):

    path = f"results/{job_id}.png"

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="Result not found"
        )

    return FileResponse(
        path,
        media_type="image/png"
    )


@app.post("/generate-product")
async def generate_product(
    product_type: str = Form(...),
    description: str = Form(...),
    scene: str = Form(""),
):
    prompt = (
        f"Professional e-commerce product photography of a {product_type}. "
        f"Product details: {description}. "
        f"Creative direction and mood: {scene}. "
        "The product must be a wearable fashion item (clothing, footwear, or fashion accessory) "
        "that a person can put on, suitable for virtual try-on. "
        "Single product centered on a clean seamless studio background, "
        "soft professional lighting, sharp focus, high detail, commercial catalog quality. "
        "No people, no text, no watermark, no logo."
    )

    try:
        image_bytes = _generate_product_image(prompt)
        image_bytes = _place_logo_on_product(image_bytes, product_type)
        image_bytes = _apply_brand_identity(image_bytes, "product")
        job_id = _save_image_bytes(image_bytes)
        return {
            "success": True,
            "job_id": job_id,
            "result": f"/result/{job_id}",
        }

    except Exception as e:
        print("GENERATE-PRODUCT ERROR:")
        print(repr(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-campaign")
async def generate_campaign(
    image: UploadFile = File(...),
    concept: str = Form(""),
    product: str = Form(""),
):
    image_data = await image.read()

    prompt = (
        "Transform this fashion photo into a high-end editorial campaign image. "
        f"Campaign theme: {concept}. Featured product: {product}. "
        "Keep the person, outfit and pose exactly the same. "
        "Enhance the background into a cinematic editorial scene with dramatic lighting, "
        "magazine cover quality, fashion campaign aesthetic. No text, no watermark."
    )

    try:
        campaign_bytes = _generate_campaign_image(prompt, image_data)
        campaign_bytes = _apply_brand_identity(campaign_bytes, "campaign")
        job_id = _save_image_bytes(campaign_bytes)

        caption_prompt = (
            "Write a short social media post caption for a fashion campaign. "
            f"Campaign theme: {concept}. Featured product: {product}. "
            "Brand: VyIQ × Nord Storia AI Studio — mention the brand naturally once. "
            "Tone: confident, aspirational, minimal. Maximum 2 sentences. "
            "Then on a new line add exactly 3 relevant hashtags starting with #. "
            "Return only the caption and hashtags, no quotes, no explanation."
        )

        try:
            caption = _generate_text(caption_prompt)
        except Exception as caption_error:
            print("CAPTION FALLBACK:", repr(caption_error))
            caption = (
                f"A new point of view. {concept}, made yours.\n"
                f"#{concept.replace(' ', '')} #NewCollection #MadeWithKiyoshi"
            )

        return {
            "success": True,
            "job_id": job_id,
            "result": f"/result/{job_id}",
            "caption": caption,
        }

    except Exception as e:
        print("GENERATE-CAMPAIGN ERROR:")
        print(repr(e))
        raise HTTPException(status_code=500, detail=str(e))


DELIVERIES_FILE = "deliveries.json"


@app.post("/deliver")
async def deliver_images(request: Request):
    body = await request.json()
    contact = str(body.get("contact", "")).strip()

    is_email = bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", contact))
    is_phone = bool(re.match(r"^\+?[0-9][0-9\s.\-]{7,14}$", contact))

    if not is_email and not is_phone:
        raise HTTPException(status_code=400, detail="Enter a valid email or phone number")

    record = {
        "contact": contact,
        "type": "email" if is_email else "phone",
        "assets": {
            "product": body.get("productUrl"),
            "tryOn": body.get("tryOnUrl"),
            "campaign": body.get("campaignUrl"),
        },
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    try:
        with open(DELIVERIES_FILE, "r", encoding="utf-8") as f:
            deliveries = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        deliveries = []

    deliveries.append(record)
    with open(DELIVERIES_FILE, "w", encoding="utf-8") as f:
        json.dump(deliveries, f, ensure_ascii=False, indent=2)

    return {
        "success": True,
        "type": record["type"],
        "message": f"Your images are on the way to {contact}",
    }
