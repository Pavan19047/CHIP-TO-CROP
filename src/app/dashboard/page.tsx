'use client';

import { DashboardOverview } from "@/components/dashboard/dashboard-overview-enhanced";
import { mockDashboardStats, mockActivityFeed, mockKPIData, mockAlerts } from "@/lib/mock-data/dashboard-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { ResultsTable } from "@/components/dashboard/results-table";
import { ReportGenerator } from "@/components/dashboard/report-generator";
import { AnalysisResult } from "@/lib/types/analysis";

// Mock analysis results for demo
const mockAnalysisResults: AnalysisResult[] = [
  {
    id: '1',
    imageUrl: '/placeholder.svg?height=100&width=100',
    filename: 'wheat_sample_001.jpg',
    analyzedAt: new Date('2025-10-12T10:30:00'),
    cropType: 'wheat',
    detectionType: 'disease',
    confidence: 94.5,
    severity: 'high',
    findings: ['Rust disease detected', 'Leaf discoloration'],
    recommendations: ['Apply fungicide', 'Monitor spread'],
    metadata: {
      quality: 87,
      resolution: '1920x1080',
      captureDate: new Date('2025-10-12'),
    },
  },
  {
    id: '2',
    imageUrl: '/placeholder.svg?height=100&width=100',
    filename: 'corn_field_042.jpg',
    analyzedAt: new Date('2025-10-12T09:15:00'),
    cropType: 'corn',
    detectionType: 'nutrient',
    confidence: 88.2,
    severity: 'medium',
    findings: ['Nitrogen deficiency', 'Yellow leaves'],
    recommendations: ['Add nitrogen fertilizer', 'Soil test recommended'],
    metadata: {
      quality: 92,
      resolution: '2048x1536',
    },
  },
  {
    id: '3',
    imageUrl: '/placeholder.svg?height=100&width=100',
    filename: 'rice_crop_128.jpg',
    analyzedAt: new Date('2025-10-12T08:00:00'),
    cropType: 'rice',
    detectionType: 'healthy',
    confidence: 96.8,
    severity: 'none',
    findings: ['Healthy crop', 'Good growth'],
    recommendations: ['Continue current practices'],
    metadata: {
      quality: 95,
      resolution: '1920x1080',
    },
  },
];

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Welcome to your agricultural analysis dashboard
                </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="upload">Upload Data</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-6">
                    <DashboardOverview
                        stats={mockDashboardStats}
                        activities={mockActivityFeed}
                        kpis={mockKPIData}
                        alerts={mockAlerts}
                    />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4 mt-6">
                    <div className="grid gap-6">
                        <ImageUpload 
                            mode="bulk" 
                            maxFiles={50}
                            onUploadComplete={(results) => {
                                console.log('Upload complete:', results);
                            }}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-4 mt-6">
                    <ResultsTable 
                        results={mockAnalysisResults}
                        onViewDetails={(result) => {
                            console.log('View details:', result);
                        }}
                        onExport={(filtered) => {
                            console.log('Export:', filtered);
                        }}
                    />
                </TabsContent>

                <TabsContent value="reports" className="space-y-4 mt-6">
                    <ReportGenerator results={mockAnalysisResults} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
