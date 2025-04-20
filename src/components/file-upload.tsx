"use client";

import * as React from "react";
import {
  IconCheck,
  IconFileUpload,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  dropzoneText?: string;
  uploadHandler?: (file: File) => Promise<{ success: boolean; error?: string }>;
  disabled?: boolean;
};

type FileStatus = "idle" | "uploading" | "success" | "error";

type UploadFile = {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  error?: string;
};

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  onFilesChange,
  className,
  dropzoneText = "Drag and drop files here, or click to select files",
  uploadHandler,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: UploadFile[] = [];
    const validFiles: File[] = [];

    Array.from(fileList).forEach((file) => {
      if (
        accept &&
        !file.type.match(accept.replace(/,/g, "|").replace(/\*/g, ".*"))
      ) {
        // Invalid file type
        return;
      }

      if (file.size > maxSize) {
        // File too large
        return;
      }

      const uploadFile: UploadFile = {
        file,
        id: Math.random().toString(36).substring(2, 11),
        progress: 0,
        status: "idle",
      };

      newFiles.push(uploadFile);
      validFiles.push(file);
    });

    if (files.length + newFiles.length > maxFiles) {
      // Too many files
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);

    if (onFilesChange) {
      onFilesChange([...files.map((f) => f.file), ...validFiles]);
    }

    if (uploadHandler) {
      newFiles.forEach((uploadFile) => {
        void handleUpload(uploadFile);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    handleFileChange(droppedFiles);
  };

  const handleUpload = async (uploadFile: UploadFile) => {
    if (!uploadHandler) return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === uploadFile.id ? { ...f, status: "uploading", progress: 0 } : f,
      ),
    );

    // Simulate progress
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id && f.status === "uploading" && f.progress < 90
            ? { ...f, progress: f.progress + 10 }
            : f,
        ),
      );
    }, 300);

    try {
      const result = await uploadHandler(uploadFile.file);

      if (result.success) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "success", progress: 100 }
              : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error",
                  error: result.error ?? "Upload failed",
                }
              : f,
          ),
        );
      }
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "error",
                error: "Upload failed",
              }
            : f,
        ),
      );
    } finally {
      clearInterval(interval);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((f) => f.id !== id);

      if (onFilesChange) {
        onFilesChange(updatedFiles.map((f) => f.file));
      }

      return updatedFiles;
    });
  };

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className={cn(
          "border-border group hover:bg-accent/50 relative flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition",
          isDragging && "border-primary bg-accent/50",
          disabled && "pointer-events-none opacity-60",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        <div className="pointer-events-none flex flex-col items-center justify-center p-4 text-center">
          <IconFileUpload className="text-muted-foreground group-hover:text-foreground mb-2 h-10 w-10" />
          <p className="mb-1 text-sm">{dropzoneText}</p>
          <p className="text-muted-foreground text-xs">
            {multiple
              ? `Up to ${maxFiles} files, max ${formatFileSize(maxSize)} each`
              : `Max file size: ${formatFileSize(maxSize)}`}
          </p>
          {accept && (
            <p className="text-muted-foreground mt-1 text-xs">
              Accepted file types: {accept.split(",").join(", ")}
            </p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-4 rounded-md border p-3">
                  <div className="flex-1 truncate">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="block truncate text-sm font-medium">
                        {file.file.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatFileSize(file.file.size)}
                      </span>
                      {file.status === "success" && (
                        <span className="text-green-500 dark:text-green-400">
                          <IconCheck className="h-4 w-4" />
                        </span>
                      )}
                      {file.status === "error" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="text-red-500 dark:text-red-400">
                                <IconX className="h-4 w-4" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{file.error}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    {file.status === "uploading" && (
                      <Progress value={file.progress} className="h-1" />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    type="button"
                    disabled={disabled}
                  >
                    <IconTrash className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// You'll need to create a Progress component or import it from your UI library
// Here's a simple example:

function Progress({
  value = 0,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: number }) {
  return (
    <div
      className={cn(
        "bg-secondary relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <div
        className="bg-primary h-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
