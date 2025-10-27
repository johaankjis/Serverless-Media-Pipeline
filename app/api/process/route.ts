import { type NextRequest, NextResponse } from "next/server"

// Simulated job queue
const jobQueue: Array<{
  id: string
  fileId: string
  filename: string
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  createdAt: string
  processingTime?: number
}> = []

export async function POST(request: NextRequest) {
  try {
    const { fileId, filename } = await request.json()

    // Create processing job
    const job = {
      id: Math.random().toString(36).substring(7),
      fileId,
      filename,
      status: "pending" as const,
      progress: 0,
      createdAt: new Date().toISOString(),
    }

    jobQueue.push(job)

    // Simulate async processing
    setTimeout(() => {
      const jobIndex = jobQueue.findIndex((j) => j.id === job.id)
      if (jobIndex !== -1) {
        jobQueue[jobIndex].status = "processing"
        jobQueue[jobIndex].progress = 50
      }
    }, 2000)

    setTimeout(() => {
      const jobIndex = jobQueue.findIndex((j) => j.id === job.id)
      if (jobIndex !== -1) {
        jobQueue[jobIndex].status = "completed"
        jobQueue[jobIndex].progress = 100
        jobQueue[jobIndex].processingTime = Math.random() * 10 + 5

        // Send notification
        fetch(`${request.nextUrl.origin}/api/notify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobId: job.id,
            filename: job.filename,
            status: "completed",
          }),
        })
      }
    }, 8000)

    return NextResponse.json({
      success: true,
      job,
    })
  } catch (error) {
    console.error("[v0] Processing error:", error)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
