'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { UploadFile } from '@/lib/types/upload';
import {
  calculateFileHash,
  generatePresignedUrl,
  uploadFileToPresignedUrl,
  validateImageFile,
  createImagePreview,
} from '@/lib/upload-utils';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  mode?: 'single' | 'bulk';
  onUploadComplete?: (results: UploadFile[]) => void;
  maxFiles?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  mode = 'single',
  onUploadComplete,
  maxFiles = mode === 'single' ? 1 : 50,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedHashes] = useState<Set<string>>(new Set());

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = async (fileList: FileList) => {
    const newFiles: UploadFile[] = [];

    for (let i = 0; i < Math.min(fileList.length, maxFiles - files.length); i++) {
      const file = fileList[i];
      const validation = validateImageFile(file);

      if (!validation.valid) {
        newFiles.push({
          id: crypto.randomUUID(),
          file,
          status: 'error',
          progress: 0,
          error: validation.error,
        });
        continue;
      }

      try {
        const [preview, hash] = await Promise.all([
          createImagePreview(file),
          calculateFileHash(file),
        ]);

        // Check for duplicates
        if (uploadedHashes.has(hash)) {
          newFiles.push({
            id: crypto.randomUUID(),
            file,
            preview,
            hash,
            status: 'error',
            progress: 0,
            error: 'Duplicate file detected',
          });
          continue;
        }

        newFiles.push({
          id: crypto.randomUUID(),
          file,
          preview,
          hash,
          status: 'pending',
          progress: 0,
        });
      } catch (error) {
        newFiles.push({
          id: crypto.randomUUID(),
          file,
          status: 'error',
          progress: 0,
          error: 'Failed to process file',
        });
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const fileList = e.dataTransfer.files;
      await processFiles(fileList);
    },
    [files.length, maxFiles]
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    await processFiles(fileList);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadFile = async (uploadFile: UploadFile) => {
    try {
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: 'uploading' as const } : f
        )
      );

      // Get presigned URL
      const { uploadUrl, fileKey } = await generatePresignedUrl(
        uploadFile.file.name,
        uploadFile.file.type
      );

      // Upload file
      await uploadFileToPresignedUrl(uploadUrl, uploadFile.file, (progress) => {
        setFiles((prev) =>
          prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f))
        );
      });

      // Mark as completed and add hash to uploaded set
      if (uploadFile.hash) {
        uploadedHashes.add(uploadFile.hash);
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: 'completed' as const,
                progress: 100,
                uploadedUrl: `/uploads/${fileKey}`,
              }
            : f
        )
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Upload failed',
              }
            : f
        )
      );
    }
  };

  const uploadAll = async () => {
    const pendingFiles = files.filter((f) => f.status === 'pending');
    await Promise.all(pendingFiles.map(uploadFile));

    const completed = files.filter((f) => f.status === 'completed');
    if (onUploadComplete) {
      onUploadComplete(completed);
    }
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'uploading':
      case 'processing':
        return <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
      default:
        return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const completedCount = files.filter((f) => f.status === 'completed').length;
  const errorCount = files.filter((f) => f.status === 'error').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {mode === 'single' ? 'Upload Image' : 'Bulk Upload Images'}
        </CardTitle>
        <CardDescription>
          {mode === 'single'
            ? 'Upload a single image for analysis'
            : `Upload up to ${maxFiles} images at once`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          )}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm font-medium mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supports JPEG, PNG, WebP (max 10MB per file)
          </p>
          <input
            type="file"
            multiple={mode === 'bulk'}
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="secondary" size="sm" className="cursor-pointer" asChild>
              <span>Browse Files</span>
            </Button>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary">
                  Total: {files.length}
                </Badge>
                {pendingCount > 0 && (
                  <Badge variant="outline">Pending: {pendingCount}</Badge>
                )}
                {completedCount > 0 && (
                  <Badge className="bg-green-100 text-green-800">
                    Completed: {completedCount}
                  </Badge>
                )}
                {errorCount > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    Errors: {errorCount}
                  </Badge>
                )}
              </div>
              {pendingCount > 0 && (
                <Button onClick={uploadAll} size="sm">
                  Upload All ({pendingCount})
                </Button>
              )}
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  {file.preview && (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {file.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="mt-2 h-1" />
                    )}
                    {file.error && (
                      <p className="text-xs text-red-600 mt-1">{file.error}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(file.status)}
                    {file.status !== 'uploading' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {errorCount > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorCount} file(s) failed to upload. Please review and try again.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
