import { DashboardStats, ActivityItem, KPIData, AlertSummary } from '@/lib/types/dashboard';

export const mockDashboardStats: DashboardStats = {
  imagesAnalyzed: 1247,
  activeAlerts: 8,
  qualityScore: 87.5,
  trendsUp: true,
};

export const mockActivityFeed: ActivityItem[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Disease detected in wheat crop',
    description: 'High confidence rust disease detection in batch-2024-001',
    timestamp: new Date('2025-10-12T10:30:00'),
    severity: 'high',
  },
  {
    id: '2',
    type: 'upload',
    title: 'Batch upload completed',
    description: '125 images processed successfully',
    timestamp: new Date('2025-10-12T09:15:00'),
  },
  {
    id: '3',
    type: 'analysis',
    title: 'Analysis complete',
    description: 'Corn health assessment finished',
    timestamp: new Date('2025-10-12T08:45:00'),
  },
  {
    id: '4',
    type: 'export',
    title: 'Report generated',
    description: 'Weekly quality report exported',
    timestamp: new Date('2025-10-12T07:00:00'),
  },
];

export const mockKPIData: KPIData[] = [
  {
    label: 'Images Analyzed',
    value: 1247,
    change: 12.5,
    trend: 'up',
    data: [
      { date: '2025-10-05', value: 180 },
      { date: '2025-10-06', value: 195 },
      { date: '2025-10-07', value: 210 },
      { date: '2025-10-08', value: 185 },
      { date: '2025-10-09', value: 220 },
      { date: '2025-10-10', value: 230 },
      { date: '2025-10-11', value: 240 },
    ],
  },
  {
    label: 'Detection Rate',
    value: 94.2,
    change: 2.1,
    trend: 'up',
    data: [
      { date: '2025-10-05', value: 92.1 },
      { date: '2025-10-06', value: 92.5 },
      { date: '2025-10-07', value: 93.0 },
      { date: '2025-10-08', value: 93.5 },
      { date: '2025-10-09', value: 93.8 },
      { date: '2025-10-10', value: 94.0 },
      { date: '2025-10-11', value: 94.2 },
    ],
  },
  {
    label: 'Avg Quality Score',
    value: 87.5,
    change: -1.2,
    trend: 'down',
    data: [
      { date: '2025-10-05', value: 89.0 },
      { date: '2025-10-06', value: 88.5 },
      { date: '2025-10-07', value: 88.2 },
      { date: '2025-10-08', value: 88.0 },
      { date: '2025-10-09', value: 87.8 },
      { date: '2025-10-10', value: 87.6 },
      { date: '2025-10-11', value: 87.5 },
    ],
  },
];

export const mockAlerts: AlertSummary[] = [
  {
    id: 'alert-1',
    cropType: 'Wheat',
    severity: 'critical',
    message: 'Severe rust disease detected - immediate action required',
    imageUrl: '/placeholder.svg?height=100&width=100',
    detectedAt: new Date('2025-10-12T10:30:00'),
    status: 'new',
  },
  {
    id: 'alert-2',
    cropType: 'Corn',
    severity: 'high',
    message: 'Nitrogen deficiency observed in multiple samples',
    imageUrl: '/placeholder.svg?height=100&width=100',
    detectedAt: new Date('2025-10-12T09:15:00'),
    status: 'acknowledged',
  },
  {
    id: 'alert-3',
    cropType: 'Rice',
    severity: 'medium',
    message: 'Moderate pest activity detected',
    imageUrl: '/placeholder.svg?height=100&width=100',
    detectedAt: new Date('2025-10-12T08:00:00'),
    status: 'acknowledged',
  },
];
