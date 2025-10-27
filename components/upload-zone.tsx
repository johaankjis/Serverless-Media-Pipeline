"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, File, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function UploadZone() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleUpload = async () => {
    if (files.length === 0) return

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")
      }

      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded and queued for processing`,
      })

      setFiles([])
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>Drag and drop files or click to browse</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">Drag and drop your media files here, or click to browse</p>
          <p className="text-xs text-muted-foreground mb-4">Supports images and videos up to 100MB</p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" asChild>
              <span>Browse Files</span>
            </Button>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-medium text-foreground mb-3">Selected Files</h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={handleUpload} className="w-full mt-4">
              Upload {files.length} file(s)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
