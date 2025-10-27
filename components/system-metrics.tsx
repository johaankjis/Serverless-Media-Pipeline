"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock, CheckCircle2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface Metrics {
  successRate: number
  avgProcessingTime: number
  totalProcessed: number
  failedJobs: number
}

export function SystemMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    successRate: 99.2,
    avgProcessingTime: 12.4,
    totalProcessed: 1247,
    failedJobs: 3,
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/metrics")
        if (response.ok) {
          const data = await response.json()
          setMetrics(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch metrics:", error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Metrics</CardTitle>
        <CardDescription>Real-time processing statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Activity className="h-4 w-4" />
              <span>Success Rate</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{metrics.successRate}%</p>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>Avg Processing</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{metrics.avgProcessingTime}s</p>
            <p className="text-xs text-muted-foreground">Per 10MB file</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Total Processed</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{metrics.totalProcessed.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <XCircle className="h-4 w-4" />
              <span>Failed Jobs</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{metrics.failedJobs}</p>
            <p className="text-xs text-muted-foreground">In DLQ</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
