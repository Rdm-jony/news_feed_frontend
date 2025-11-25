"use client"

import { AlertCircleIcon, BookImage, ImageIcon, UploadIcon, XIcon } from "lucide-react"

import {
    FileMetadata,
    formatBytes,
    useFileUpload,
} from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface MultiFileUploaderProps {
    onChange: (files: ((File | FileMetadata)[])) => void
}

export default function MaultiFileUploader({ onChange }: MultiFileUploaderProps) {
    const maxSizeMB = 5
    const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
    const maxFiles = 6

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            clearFiles,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
        maxSize,
        multiple: true,
        maxFiles,

    })
    useEffect(() => {
        const fileList = files.map((f) => f.file)
        onChange(fileList)
    }, [files, onChange])

    return (
        <div className="flex flex-col gap-2  ">
            {/* Drop area */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                data-files={files.length > 0 || undefined}
                className="relative flex  flex-col items-center  overflow-hidden rounded-xl  border-input  transition-colors not-data-[files]:justify-center has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
            >
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                />

                <Button variant="outline" className="bg-primary/10" onClick={()=>openFileDialog()}>
                    <BookImage />
                    Photo
                </Button>
            </div>

            {errors.length > 0 && (
                <div
                    className="flex items-center gap-1 text-xs text-destructive"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}

            {/* File list */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="aspect-square shrink-0 rounded bg-accent">
                                    <img
                                        src={file.preview}
                                        alt={file.file.name}
                                        className="size-10 rounded-[inherit] object-cover"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="truncate text-[13px] font-medium">
                                        {file.file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatBytes(file.file.size)}
                                    </p>
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                                onClick={() => removeFile(file.id)}
                                aria-label="Remove file"
                            >
                                <XIcon aria-hidden="true" />
                            </Button>
                        </div>
                    ))}

                    {/* Remove all files button */}
                    {files.length > 1 && (
                        <div>
                            <Button size="sm" variant="outline" onClick={()=>clearFiles()}>
                                Remove all files
                            </Button>
                        </div>
                    )}
                </div>
            )}


        </div>
    )
}
