import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8001";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const person = formData.get("person") as File;
    const clothing = formData.get("clothing") as File;

    if (!person || !clothing) {
      return NextResponse.json(
        { error: "Missing person or clothing image" },
        { status: 400 }
      );
    }

    // Forward to Python backend
    const pythonFormData = new FormData();
    pythonFormData.append("person", person);
    pythonFormData.append("clothing", clothing);

    const response = await fetch(`${BACKEND_URL}/try-on`, {
      method: "POST",
      body: pythonFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Try-on failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return result URL
    return NextResponse.json({
      success: true,
      result: `${BACKEND_URL}${data.result}`,
      jobId: data.job_id,
    });
  } catch (error) {
    console.error("Try-on error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
