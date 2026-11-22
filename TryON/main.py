import os
import re
import io
import json
import uuid
import base64
from datetime import datetime, timezone

from dotenv import load_dotenv

load_dotenv()

from PIL import ImageDraw, ImageFont, ImageStat
import PIL.Image as PILImage

from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

import httpx

# ---------------------------------------------------------------------------
# Meta Model API (Muse Image for images, Muse Spark for text)
# ---------------------------------------------------------------------------
META_API_URL = os.getenv("META_API_URL", "https://api.meta.ai/v1")
MODEL_API_KEY = os.getenv("MODEL_API_KEY", "")
IMAGE_MODEL = os.getenv("MUSE_IMAGE_MODEL", "muse-image-1.0")
TEXT_MODEL = os.getenv("MUSE_TEXT_MODEL", "muse-spark-1.3")

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

_client = httpx.Client(timeout=180.0)


def _meta_headers():
    return {
        "Authorization": f"Bearer {MODEL_API_KEY}",
        "Content-Type": "application/json",
    }


def _require_key():
    if not MODEL_API_KEY:
        raise Exception("MODEL_API_KEY is not set. Configure Meta Model API key in TryON/.env")


def _decode_b64_image(data: list) -> bytes:
    if not data:
        raise Exception("Muse Image returned no images")
    item = data[0]
    b64 = item.get("b64_json") or item.get("b64") or ""
    if not b64:
        url = item.get("url", "")
        if url:
            resp = _client.get(url)
            resp.raise_for_status()
            return resp.content
        raise Exception("Muse Image response has no image data")
    return base64.b64decode(b64)


def _generate_product_image(prompt: str) -> bytes:
    """Text-to-image via Meta Muse Image (OpenAI-compatible endpoint)."""
    _require_key()
    resp = _client.post(
        f"{META_API_URL}/images/generations",
        headers=_meta_headers(),
        json={
            "model": IMAGE_MODEL,
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024",
            "response_format": "b64_json",
            "output_format": "png",
        },
    )
    resp.raise_for_status()
    return _decode_b64_image(resp.json().get("data", []))


def _sniff_mime(data: bytes) -> str:
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "image/webp"
    if data.startswith(b"GIF"):
        return "image/gif"
    return "image/png"


def _edit_images(prompt: str, images: list[bytes], mime: str = "", size: str = "1024x1024") -> bytes:
    """Image edit / multi-image composition via Meta Muse Image edits endpoint."""
    _require_key()
    files = []
    for i, img in enumerate(images):
        img_mime = mime or _sniff_mime(img)
        ext = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif"}.get(img_mime, "png")
        files.append(("image", (f"image{i}.{ext}", img, img_mime)))
    resp = _client.post(
        f"{META_API_URL}/images/edits",
        headers={"Authorization": f"Bearer {MODEL_API_KEY}"},
        files=files,
        data={"model": IMAGE_MODEL, "prompt": prompt, "n": 1, "size": size},
    )
    resp.raise_for_status()
    return _decode_b64_image(resp.json().get("data", []))


def _generate_campaign_image(prompt: str, source_image: bytes, mime_type: str = "") -> bytes:
    return _edit_images(prompt, [source_image], mime_type, size="1792x1024")


def _try_on_image(person_bytes: bytes, clothing_bytes: bytes) -> bytes:
    """Virtual try-on: compose person + garment into one photo with Muse Image."""
    prompt = (
        "Virtual try-on: dress the person in the first image wearing the garment "
        "from the second image. Keep the person's face, hair, pose, body shape, "
        "lighting and background exactly the same; replace only the clothing "
        "with the garment, matching its color, fabric, cut and details "
        "realistically with natural folds and shadows. Photorealistic, "
        "high detail, no text, no watermark."
    )
    return _edit_images(prompt, [person_bytes, clothing_bytes], size="1024x1024")


def _generate_text(prompt: str) -> str:
    """Text generation via Muse Spark (OpenAI-compatible chat completions)."""
    _require_key()
    resp = _client.post(
        f"{META_API_URL}/chat/completions",
        headers=_meta_headers(),
        json={
            "model": TEXT_MODEL,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    resp.raise_for_status()
    choices = resp.json().get("choices") or []
    if choices:
        content = (choices[0].get("message") or {}).get("content")
        if content:
            return str(content).strip()
    raise Exception("Text generation returned no content")


def _save_image_bytes(data: bytes) -> str:
    job_id = str(uuid.uuid4())
    path = f"results/{job_id}.png"
    with open(path, "wb") as f:
        f.write(data)
    return job_id


BRAND_STAR_OUTER = ((50, 4), (58, 42), (96, 50), (58, 58), (50, 96), (42, 58), (4, 50), (42, 42))
BRAND_STAR_INNER = ((50, 22), (54, 46), (78, 50), (54, 54), (50, 78), (46, 54), (22, 50), (46, 46))
BRAND_WORDMARK = "VYIQ × NORD STORIA"


def _brand_logo_mark(size: int, outer, inner):
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
    """Second-pass edit: place the brand mark onto the product with Muse Image."""
    prompt = (
        f"First image: a professional product photo of a {product_type}. "
        "Second image: the official VyIQ Nord Storia brand logo, an eight-pointed compass star. "
        f"Place this exact logo on the {product_type} as a small, elegant embroidered or printed brand mark "
        "on the most natural spot. Reproduce the star shape exactly, scaled realistically, "
        "with thread or print color adapted to contrast subtly with the fabric. "
        "Keep the product design, colors, pose, lighting and background unchanged. "
        "Photorealistic commercial catalog quality. No text, no watermark."
    )
    try:
        return _edit_images(prompt, [product_bytes, _brand_logo_reference()])
    except Exception as e:
        print("LOGO PLACEMENT FALLBACK: ", repr(e))
        return product_bytes


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "provider": "meta",
        "image_model": IMAGE_MODEL,
        "text_model": TEXT_MODEL,
        "configured": bool(MODEL_API_KEY),
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

        print("Calling Muse Image virtual try-on...")

        # -------------------------
        # Muse Image VTO (compose person + garment)
        # -------------------------

        image_bytes = _try_on_image(person_data, clothing_data)

        with open(result_path, "wb") as f:
            f.write(image_bytes)

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
