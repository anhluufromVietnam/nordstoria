import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8001";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const productType = formData.get("productType") as string;
    const description = formData.get("description") as string;
    const scene = (formData.get("scene") as string) || "";

    if (!productType || !description) {
      return NextResponse.json(
        { error: "Missing product type or description" },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append("product_type", productType);
    backendFormData.append("description", description);
    backendFormData.append("scene", scene);

    const response = await fetch(`${BACKEND_URL}/generate-product`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: error.detail || "Product generation failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      result: `${BACKEND_URL}${data.result}`,
      jobId: data.job_id,
    });
  } catch (error) {
    console.error("Product generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
