import { type NextRequest, NextResponse } from "next/server"

// Simulated storage bucket
const uploadedFiles: Array<{
  id: string
  filename: string
  size: number
  uploadedAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Simulate file upload to object storage
    const fileData = {
      id: Math.random().toString(36).substring(7),
      filename: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    }

    uploadedFiles.push(fileData)

    // Trigger processing function (simulated)
    await fetch(`${request.nextUrl.origin}/api/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId: fileData.id, filename: file.name }),
    })

    return NextResponse.json({
      success: true,
      file: fileData,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
