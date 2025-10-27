import { NextResponse } from "next/server"

export async function GET() {
  // Simulated queue status
  const queueStatus = {
    pending: Math.floor(Math.random() * 10),
    processing: Math.floor(Math.random() * 5),
    dlq: Math.floor(Math.random() * 3),
  }

  return NextResponse.json(queueStatus)
}
