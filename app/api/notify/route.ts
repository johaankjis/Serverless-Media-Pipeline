import { type NextRequest, NextResponse } from "next/server"

// Simulated notification log
const notifications: Array<{
  id: string
  jobId: string
  filename: string
  status: string
  sentAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { jobId, filename, status } = await request.json()

    const notification = {
      id: Math.random().toString(36).substring(7),
      jobId,
      filename,
      status,
      sentAt: new Date().toISOString(),
    }

    notifications.push(notification)

    console.log("[v0] Notification sent:", notification)

    // In production, this would send email/webhook
    // await sendEmail({ ... })
    // await sendWebhook({ ... })

    return NextResponse.json({
      success: true,
      notification,
    })
  } catch (error) {
    console.error("[v0] Notification error:", error)
    return NextResponse.json({ error: "Notification failed" }, { status: 500 })
  }
}
