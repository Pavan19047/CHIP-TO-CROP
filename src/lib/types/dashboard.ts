// Dashboard Types
export interface DashboardStats {
  imagesAnalyzed: number;
  activeAlerts: number;
  qualityScore: number;
  trendsUp: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'analysis' | 'alert' | 'export';
  title: string;
  description: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface KPIData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  data: { date: string; value: number }[];
}

export interface AlertSummary {
  id: string;
  cropType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  imageUrl: string;
  detectedAt: Date;
  status: 'new' | 'acknowledged' | 'resolved';
}
