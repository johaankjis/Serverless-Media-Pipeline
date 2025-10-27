import { NextResponse } from "next/server"

export async function GET() {
  // Simulated job list with dynamic updates
  const jobs = [
    {
      id: "1",
      filename: "sample-video-1080p.mp4",
      status: "completed",
      progress: 100,
      createdAt: new Date(Date.now() - 300000).toISOString(),
      processingTime: 14.2,
    },
    {
      id: "2",
      filename: "product-demo.mp4",
      status: "processing",
      progress: Math.min(65 + Math.floor(Math.random() * 20), 100),
      createdAt: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "3",
      filename: "marketing-banner.jpg",
      status: "completed",
      progress: 100,
      createdAt: new Date(Date.now() - 600000).toISOString(),
      processingTime: 2.1,
    },
    {
      id: "4",
      filename: "tutorial-video.mp4",
      status: "pending",
      progress: 0,
      createdAt: new Date(Date.now() - 30000).toISOString(),
    },
  ]

  return NextResponse.json(jobs)
}
