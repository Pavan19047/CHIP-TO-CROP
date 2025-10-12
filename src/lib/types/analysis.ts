// Analysis Results Types
export interface AnalysisResult {
  id: string;
  imageUrl: string;
  filename: string;
  analyzedAt: Date;
  cropType: 'wheat' | 'corn' | 'rice' | 'soybean' | 'cotton' | 'other';
  detectionType: 'disease' | 'pest' | 'nutrient' | 'healthy' | 'unknown';
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'none';
  findings: string[];
  recommendations: string[];
  metadata: {
    quality: number;
    resolution: string;
    captureDate?: Date;
  };
}

export interface FilterOptions {
  cropType?: string[];
  detectionType?: string[];
  severity?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  confidenceMin?: number;
  searchQuery?: string;
}

export type SortField = 'analyzedAt' | 'confidence' | 'cropType' | 'severity';
export type SortDirection = 'asc' | 'desc';
