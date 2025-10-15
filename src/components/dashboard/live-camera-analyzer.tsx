
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { detectTomatoesAction, TomatoDetectionFormState } from '@/app/actions';
import { Camera, CameraOff, Play, Square, VideoOff, Loader2, Lightbulb, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useUSBCamera } from '@/hooks/use-usb-camera';

const initialState: TomatoDetectionFormState = {
  message: '',
};

export default function LiveCameraAnalyzer() {
  const [state, formAction] = useFormState(detectTomatoesAction, initialState);
  const [imageData, setImageData] = useState<string>('');
  const { toast } = useToast();
  const [fruitType, setFruitType] = useState('Tomato');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use USB camera hook
  const {
    videoRef,
    canvasRef,
    devices,
    selectedDevice,
    isStreaming,
    hasPermission,
    error: cameraError,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame,
    refreshDevices
  } = useUSBCamera();

  // Show camera errors as toasts
  useEffect(() => {
    if (cameraError) {
      toast({
        variant: 'destructive',
        title: 'Camera Error',
        description: cameraError,
      });
    }
  }, [cameraError, toast]);

  // Auto-start camera when permission is granted
  useEffect(() => {
    if (hasPermission && selectedDevice && !isStreaming) {
      startCamera(selectedDevice);
    }
  }, [hasPermission, selectedDevice, isStreaming, startCamera]);
  
  const handleCaptureAndAnalyze = useCallback(() => {
    if (isStreaming && fruitType) {
      setIsLoading(true);
      const dataUri = captureFrame();
      
      if (dataUri) {
        setImageData(dataUri);

        const formData = new FormData();
        formData.set('imageDataUri', dataUri);
        formData.set('fruitType', fruitType);
        formAction(formData);
      }
    }
  }, [fruitType, formAction, isStreaming, captureFrame]);

  useEffect(() => {
    if (isAnalyzing) {
        if (!fruitType) {
            toast({
                variant: 'destructive',
                title: 'No Produce Type Selected',
                description: 'Please select a produce type to start analysis.',
            });
            setIsAnalyzing(false);
            return;
        }
      analysisIntervalRef.current = setInterval(() => {
        handleCaptureAndAnalyze();
      }, 5000); // Analyze every 5 seconds
    } else {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
      setIsLoading(false);
    }

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [isAnalyzing, handleCaptureAndAnalyze, fruitType, toast]);

  useEffect(() => {
    setIsLoading(false);
  }, [state]);


  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <Card className="border-2 professional-shadow">
        <CardHeader className="border-b-2 border-border bg-muted/30">
          <CardTitle className="font-heading text-2xl font-bold">USB Camera Detection</CardTitle>
          <CardDescription className="text-base mt-2">
            Real-time tomato and fruit detection using USB camera. Automated analysis every 5 seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {/* Camera Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cameraSelect">Camera Device</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshDevices}
                  disabled={isAnalyzing}
                  className="h-8 gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
              <Select 
                value={selectedDevice || undefined}
                onValueChange={switchCamera} 
                disabled={isAnalyzing || devices.length === 0}
              >
                <SelectTrigger id="cameraSelect">
                  <SelectValue placeholder="Select camera device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                    </SelectItem>
                  ))}
                  {devices.length === 0 && (
                    <SelectItem value="none" disabled>
                      No cameras detected
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {devices.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {devices.length} camera{devices.length !== 1 ? 's' : ''} detected
                </p>
              )}
            </div>

            {/* Detection Mode */}
            <div className="space-y-2">
              <Label htmlFor="fruitType">Detection Mode</Label>
              <Select 
                value={fruitType}
                onValueChange={setFruitType} 
                disabled={isAnalyzing}
              >
                <SelectTrigger id="fruitType">
                  <SelectValue placeholder="Select detection mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tomato">🍅 Tomato (Specialized)</SelectItem>
                  <SelectItem value="Fruits">🍎 All Fruits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Camera Feed */}
            <div className="space-y-2">
              <Label>Camera Feed</Label>
              <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-border">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-contain" 
                  autoPlay 
                  muted 
                  playsInline 
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {hasPermission === false && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-6">
                    <VideoOff className="h-16 w-16 mb-4 text-red-400" />
                    <p className="text-center font-bold text-xl mb-3">Camera Access Blocked</p>
                    <p className="text-center text-sm text-gray-300 max-w-md mb-4">
                      You clicked "Block" or "Deny" on the browser permission popup.
                    </p>
                    <div className="bg-blue-600/20 border border-blue-400 rounded-lg p-4 mb-4 max-w-md">
                      <p className="text-xs text-blue-200 text-center leading-relaxed">
                        <span className="font-semibold">💡 How to fix:</span>
                        <br />
                        1. Click the <span className="font-bold">camera icon 📷</span> or <span className="font-bold">lock icon 🔒</span> in your browser's address bar
                        <br />
                        2. Change Camera permission to <span className="font-bold">"Allow"</span>
                        <br />
                        3. Or click the button below to try again
                      </p>
                    </div>
                    <Button
                      onClick={refreshDevices}
                      variant="secondary"
                      size="lg"
                      className="mt-2"
                    >
                      <RefreshCw className="h-5 w-5 mr-2" />
                      Retry Permission Request
                    </Button>
                  </div>
                )}
                
                {hasPermission === null && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-6">
                    <Loader2 className="h-16 w-16 animate-spin mb-4 text-blue-400" />
                    <p className="text-center font-bold text-xl mb-3">Waiting for Camera Permission</p>
                    <p className="text-center text-sm text-gray-300 max-w-md mb-4">
                      Your browser is asking for permission to use your camera...
                    </p>
                    <div className="bg-green-600/20 border border-green-400 rounded-lg p-4 max-w-md">
                      <p className="text-xs text-green-200 text-center leading-relaxed">
                        <span className="font-semibold">👆 Look at the top of your browser window!</span>
                        <br />
                        <br />
                        You should see a popup asking:
                        <br />
                        <span className="italic">"localhost wants to use your camera"</span>
                        <br />
                        <br />
                        Click <span className="font-bold bg-green-600 px-2 py-0.5 rounded">"Allow"</span> to continue
                      </p>
                    </div>
                  </div>
                )}
                
                {!isStreaming && hasPermission === true && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-4">
                    <Camera className="h-12 w-12 mb-3" />
                    <p className="text-center font-semibold text-lg mb-2">Camera Stopped</p>
                    <Button
                      onClick={() => startCamera(selectedDevice || undefined)}
                      variant="secondary"
                      className="mt-4"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Camera
                    </Button>
                  </div>
                )}
                
                {isLoading && isAnalyzing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                    <Loader2 className="h-12 w-12 animate-spin mb-3" />
                    <p className="text-center font-semibold text-lg">Analyzing Frame...</p>
                    <p className="text-sm text-gray-300 mt-1">Processing detections</p>
                  </div>
                )}

                {/* Live indicator */}
                {isStreaming && !isLoading && (
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-md shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">Live</span>
                  </div>
                )}

                {/* Analysis status */}
                {isAnalyzing && isStreaming && !isLoading && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-md shadow-lg">
                    <span className="text-xs font-bold uppercase tracking-wider">Analyzing</span>
                  </div>
                )}
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="analysis-toggle" 
                  checked={isAnalyzing} 
                  onCheckedChange={setIsAnalyzing} 
                  disabled={!fruitType || !isStreaming}
                />
                <Label htmlFor="analysis-toggle" className="cursor-pointer">
                  Enable Real-time Analysis
                </Label>
              </div>
              {isStreaming && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={stopCamera}
                  className="gap-2"
                >
                  <Square className="h-4 w-4" />
                  Stop
                </Button>
              )}
            </div>
            {cameraError && (
              <div className="w-full p-3 bg-destructive/10 border-2 border-destructive/30 rounded-md">
                <p className="text-sm text-destructive font-semibold">{cameraError}</p>
              </div>
            )}
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        {state.result ? (
          <>
            <Card className="border-2 professional-shadow">
              <CardHeader className="border-b-2 border-border bg-muted/30">
                <CardTitle className="font-heading text-2xl font-bold">Detection Results</CardTitle>
                <CardDescription className="text-base mt-2">
                  {state.message}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 border-2 border-primary/20 bg-primary/5">
                      <div className="text-3xl font-bold font-heading text-primary">{state.result.summary.total}</div>
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-1">Total Detected</div>
                    </div>
                    <div className="p-5 border-2 border-green-600/20 bg-green-50">
                      <div className="text-3xl font-bold font-heading text-green-700">{state.result.summary.ripe}</div>
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-1">Ripe</div>
                    </div>
                    <div className="p-5 border-2 border-orange-600/20 bg-orange-50">
                      <div className="text-3xl font-bold font-heading text-orange-700">{state.result.summary.unripe}</div>
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-1">Unripe</div>
                    </div>
                    <div className="p-5 border-2 border-blue-600/20 bg-blue-50">
                      <div className="text-3xl font-bold font-heading text-blue-700">{Object.keys(state.result.summary.by_type).length}</div>
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-1">Types</div>
                    </div>
                  </div>

                  {/* Detection details */}
                  {state.result.detections.length > 0 && (
                    <div className="space-y-3 mt-6">
                      <h4 className="font-heading font-bold text-lg border-b-2 border-border pb-2">Detailed Analysis</h4>
                      <div className="max-h-60 overflow-y-auto space-y-3">
                        {state.result.detections.map((detection, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border-2 border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <div className="font-semibold font-heading text-base">{detection.label}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Type:</span> {detection.fruit_type} • 
                                <span className={`ml-1 font-semibold ${detection.is_ripe ? 'text-green-700' : 'text-orange-700'}`}>
                                  {detection.is_ripe ? 'Ripe' : 'Unripe'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-lg font-bold font-heading text-primary">
                                {(detection.confidence * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Confidence</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {imageData && (
              <Card className="border-2 professional-shadow">
                <CardHeader className="border-b-2 border-border bg-muted/30">
                  <CardTitle className="font-heading text-xl font-bold">Captured Frame</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative w-full aspect-video border-2 border-border">
                    <Image 
                      src={imageData} 
                      alt="Captured for analysis" 
                      fill
                      className="object-contain" 
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <div className="p-12 border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center text-muted-foreground h-full bg-muted/20">
            <Lightbulb className="h-16 w-16 mb-4 text-primary"/>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Awaiting Detection</h3>
            <p className="text-base max-w-md">Enable real-time analysis to detect tomatoes and fruits in the live camera feed. Results will appear here automatically.</p>
          </div>
        )}
        {state.error && <p className="mt-4 text-sm text-destructive">{state.message}</p>}
      </div>
    </div>
  );
}
