'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileDown, Calendar as CalendarIcon, Loader2, CheckCircle2, Download } from 'lucide-react';
import { generateReport, getReportPreview, scheduleReport, type ReportConfig } from '@/app/actions/reports';
import { AnalysisResult } from '@/lib/types/analysis';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ReportGeneratorProps {
  results: AnalysisResult[];
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ results }) => {
  const [config, setConfig] = useState<ReportConfig>({
    format: 'csv',
    title: 'Analysis Report',
    includeCharts: true,
    includeSummary: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<{ url: string; filename: string } | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  React.useEffect(() => {
    // Load preview data
    getReportPreview(results).then(setPreviewData);
  }, [results]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedReport(null);

    try {
      const result = await generateReport(results, {
        ...config,
        dateRange: dateRange.from && dateRange.to ? {
          from: dateRange.from,
          to: dateRange.to,
        } : undefined,
      });

      if (result.success && result.downloadUrl && result.filename) {
        setGeneratedReport({
          url: result.downloadUrl,
          filename: result.filename,
        });
      }
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedReport) {
      const link = document.createElement('a');
      link.href = generatedReport.url;
      link.download = generatedReport.filename;
      link.click();
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Configuration */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>
            Export analysis results in PDF or CSV format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Report Title</Label>
                <Input
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  placeholder="Analysis Report"
                />
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select
                  value={config.format}
                  onValueChange={(value: 'pdf' | 'csv') =>
                    setConfig({ ...config, format: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                    <SelectItem value="pdf">PDF (Document)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range (Optional)</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, 'PPP') : 'From date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, 'PPP') : 'To date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Options (PDF only) */}
            {config.format === 'pdf' && (
              <div className="space-y-3 p-4 border rounded-lg">
                <Label className="text-base">PDF Options</Label>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-charts" className="font-normal">
                    Include charts and visualizations
                  </Label>
                  <Switch
                    id="include-charts"
                    checked={config.includeCharts}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeCharts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-summary" className="font-normal">
                    Include executive summary
                  </Label>
                  <Switch
                    id="include-summary"
                    checked={config.includeSummary}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, includeSummary: checked })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || results.length === 0}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>

          {/* Success Message */}
          {generatedReport && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="flex items-center justify-between">
                <span>Report generated successfully!</span>
                <Button onClick={handleDownload} size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Preview</CardTitle>
          <CardDescription>Summary of included data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {previewData ? (
            <>
              <div>
                <Label className="text-sm text-muted-foreground">Total Results</Label>
                <p className="text-2xl font-bold">{previewData.totalResults}</p>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Date Range</Label>
                <p className="text-sm">
                  {format(previewData.dateRange.from, 'PP')} -{' '}
                  {format(previewData.dateRange.to, 'PP')}
                </p>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Avg. Confidence</Label>
                <p className="text-xl font-semibold">
                  {previewData.avgConfidence.toFixed(1)}%
                </p>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Severity Breakdown</Label>
                <div className="space-y-1 mt-2">
                  {Object.entries(previewData.severityBreakdown).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between text-sm">
                      <Badge variant="outline" className="capitalize">
                        {severity}
                      </Badge>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Crop Types</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(previewData.cropTypeBreakdown).map(([crop, count]) => (
                    <Badge key={crop} variant="secondary">
                      {crop}: {count as number}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-sm">Loading preview...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
