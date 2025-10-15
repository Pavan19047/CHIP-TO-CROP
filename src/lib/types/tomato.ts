export interface TomatoDetection {
  label: string;
  type: string;
  ripeness: "ripe" | "unripe" | "unknown";
  score: number;
  bbox: number[];
}

export interface TomatoDetectionSummary {
  total: number;
  ripe: number;
  unripe: number;
  types: Record<string, { total: number; ripe: number; unripe: number }>;
}

export interface TomatoDetectionResponse {
  detections: TomatoDetection[];
  summary: TomatoDetectionSummary;
  error?: string;
}
