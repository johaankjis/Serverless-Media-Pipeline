import { NextResponse } from "next/server"

export async function GET() {
  // Simulated metrics
  const metrics = {
    successRate: 99.2 + Math.random() * 0.5,
    avgProcessingTime: 12 + Math.random() * 3,
    totalProcessed: 1247 + Math.floor(Math.random() * 10),
    failedJobs: Math.floor(Math.random() * 5),
  }

  return NextResponse.json(metrics)
}
