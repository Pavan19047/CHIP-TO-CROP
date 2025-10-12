// Upload Types
export interface UploadFile {
  id: string;
  file: File;
  preview?: string;
  hash?: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  uploadedUrl?: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresIn: number;
}

export interface UploadResult {
  fileKey: string;
  url: string;
  hash: string;
  metadata: {
    filename: string;
    size: number;
    contentType: string;
    uploadedAt: Date;
  };
}

export interface BulkUploadJob {
  id: string;
  name: string;
  totalFiles: number;
  completedFiles: number;
  failedFiles: number;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  errors?: string[];
}
