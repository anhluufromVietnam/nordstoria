import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8001";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const concept = (formData.get("concept") as string) || "";
    const product = (formData.get("product") as string) || "";

    if (!image) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", image);
    backendFormData.append("concept", concept);
    backendFormData.append("product", product);

    const response = await fetch(`${BACKEND_URL}/generate-campaign`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: error.detail || "Campaign generation failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      result: `${BACKEND_URL}${data.result}`,
      caption: data.caption,
      jobId: data.job_id,
    });
  } catch (error) {
    console.error("Campaign generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
