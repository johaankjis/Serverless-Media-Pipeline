import { Upload } from "lucide-react"
import { UploadZone } from "@/components/upload-zone"
import { ProcessingJobs } from "@/components/processing-jobs"
import { SystemMetrics } from "@/components/system-metrics"
import { QueueStatus } from "@/components/queue-status"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Upload className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Media Pipeline</h1>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <a href="#" className="text-foreground font-medium">
                Overview
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Storage
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Serverless Media Processing</h2>
          <p className="text-muted-foreground">Upload media files for automatic transcoding and processing</p>
        </div>

        <div className="grid gap-6 mb-8">
          <UploadZone />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <SystemMetrics />
          <QueueStatus />
        </div>

        <div className="grid gap-6">
          <ProcessingJobs />
        </div>
      </main>
    </div>
  )
}
