'use client';

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UploadCloud, ImageIcon } from 'lucide-react';
import { TomatoDetectionResponse } from '@/lib/types/tomato';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const typeLabels: Record<string, string> = {
  desi: 'Desi',
  hybrid: 'Hybrid',
  cherry: 'Cherry',
  labro: 'Laboro',
};

const ripenessColors: Record<string, string> = {
  ripe: 'bg-green-500/10 text-green-700 border-green-500/30',
  unripe: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
  unknown: 'bg-slate-500/10 text-slate-700 border-slate-500/30',
};

export function TomatoDetector() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<TomatoDetectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    setResult(null);
    setError(null);

    if (!selected) {
      setFile(null);
      setPreview(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError('Unsupported file format. Please upload JPG, PNG, or WebP images.');
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError('Please choose an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', file);
      setProgress(35);

      const response = await fetch('/api/tomatoes/detect', {
        method: 'POST',
        body: formData,
      });

      setProgress(65);

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Detection failed');
      }

      const data: TomatoDetectionResponse = await response.json();
      setResult(data);
      setProgress(100);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Upload Tomato Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border border-dashed rounded-lg p-4 text-center space-y-4">
              {preview ? (
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-lg border">
                  <Image
                    src={preview}
                    alt="Tomato preview"
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground py-6">
                  <ImageIcon className="h-12 w-12" />
                  <p className="text-sm">No image selected</p>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                <Button type="submit" disabled={!file || isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analysing…
                    </span>
                  ) : (
                    'Analyse Tomato'
                  )}
                </Button>
                {file && (
                  <Button type="button" variant="ghost" onClick={reset}>
                    Clear
                  </Button>
                )}
              </div>

              {progress > 0 && (
                <Progress value={progress} className="h-2" />
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result && !error && (
            <p className="text-sm text-muted-foreground">
              Upload an image to see tomato ripeness insights.
            </p>
          )}

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Total Tomatoes</p>
                  <p className="text-2xl font-semibold">{result.summary.total}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Ripe</p>
                  <p className="text-2xl font-semibold text-green-600">{result.summary.ripe}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Unripe</p>
                  <p className="text-2xl font-semibold text-amber-600">{result.summary.unripe}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Detected Types</p>
                  <p className="text-2xl font-semibold">{Object.keys(result.summary.types).length}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Breakdown by Type</h3>
                {Object.keys(result.summary.types).length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(result.summary.types).map(([type, stats]) => (
                      <div key={type} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{typeLabels[type] || type}</p>
                          <Badge variant="outline">{stats.total}</Badge>
                        </div>
                        <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                          <span>Ripe: {stats.ripe}</span>
                          <span>Unripe: {stats.unripe}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No tomato detections above confidence threshold.</p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Detections</h3>
                {result.detections.length > 0 ? (
                  <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {result.detections.map((det, index) => (
                      <div key={`${det.label}-${index}`} className="rounded-md border p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{det.label}</p>
                            <p className="text-xs text-muted-foreground">
                              Confidence: {(det.score * 100).toFixed(1)}%
                            </p>
                          </div>
                          <Badge className={ripenessColors[det.ripeness] || ripenessColors.unknown} variant="outline">
                            {det.ripeness === 'ripe' ? 'Ripe' : det.ripeness === 'unripe' ? 'Unripe' : 'Unknown'}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full border px-2 py-0.5">
                            {typeLabels[det.type] || det.type}
                          </span>
                          <span>
                            BBox: [{det.bbox.map((n) => n.toFixed(0)).join(', ')}]
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No detections met the confidence threshold.</p>
                )}
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
