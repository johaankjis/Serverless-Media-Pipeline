"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Job {
  id: string
  filename: string
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  createdAt: string
  processingTime?: number
}

export function ProcessingJobs() {
  const [jobs, setJobs] = useState<Job[]>([
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
      progress: 65,
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
  ])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/jobs")
        if (response.ok) {
          const data = await response.json()
          setJobs(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch jobs:", error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
    }
  }

  const getStatusBadge = (status: Job["status"]) => {
    const variants: Record<Job["status"], "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      processing: "secondary",
      failed: "destructive",
      pending: "outline",
    }

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Jobs</CardTitle>
        <CardDescription>Recent media processing activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(job.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{job.filename}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-muted-foreground">{formatTime(job.createdAt)}</p>
                    {job.processingTime && (
                      <p className="text-xs text-muted-foreground">Processed in {job.processingTime}s</p>
                    )}
                  </div>
                  {job.status === "processing" && (
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-4">{getStatusBadge(job.status)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
