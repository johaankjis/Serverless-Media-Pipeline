"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, AlertCircle, Activity } from "lucide-react"
import { useEffect, useState } from "react"

interface QueueData {
  pending: number
  processing: number
  dlq: number
}

export function QueueStatus() {
  const [queue, setQueue] = useState<QueueData>({
    pending: 5,
    processing: 2,
    dlq: 0,
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/queue/status")
        if (response.ok) {
          const data = await response.json()
          setQueue(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch queue status:", error)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Queue Status</CardTitle>
        <CardDescription>Current processing queue state</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Layers className="h-4 w-4" />
                <span>Pending</span>
              </div>
              <span className="text-sm font-medium text-foreground">{queue.pending}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${Math.min((queue.pending / 10) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>Processing</span>
              </div>
              <span className="text-sm font-medium text-foreground">{queue.processing}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min((queue.processing / 5) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Dead Letter Queue</span>
              </div>
              <span className="text-sm font-medium text-foreground">{queue.dlq}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${Math.min((queue.dlq / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
