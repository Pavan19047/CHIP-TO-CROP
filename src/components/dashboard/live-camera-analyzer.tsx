
"use client"

import { useState, useActionState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { analyzeImageAction, FormState } from '@/app/actions';
import { Camera, Lightbulb, Loader2, VideoOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ReactMarkdown from 'react-markdown';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

const initialState: FormState = {
  message: '',
};

export default function LiveCameraAnalyzer() {
  const [state, formAction] = useActionState(analyzeImageAction, initialState);
  const [imageData, setImageData] = useState<string>('');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [fruitType, setFruitType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };
    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        if (analysisIntervalRef.current) {
            clearInterval(analysisIntervalRef.current);
        }
    }
  }, [toast]);
  
  const handleCaptureAndAnalyze = useCallback(() => {
    if (videoRef.current && fruitType) {
      setIsLoading(true);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImageData(dataUri);

        const formData = new FormData();
        formData.set('imageDataUri', dataUri);
        formData.set('fruitType', fruitType);
        formAction(formData);
      }
    }
  }, [fruitType, formAction]);

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
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analyze from Live Feed</CardTitle>
          <CardDescription>
            Use your camera to capture an image for real-time analysis, simulating a production environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="fruitType">Expected Produce Type</Label>
            <Select onValueChange={setFruitType} name="fruitType" disabled={isAnalyzing}>
                <SelectTrigger id="fruitType">
                    <SelectValue placeholder="Select a produce type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Apple">Apple</SelectItem>
                    <SelectItem value="Banana">Banana</SelectItem>
                    <SelectItem value="Carrot">Carrot</SelectItem>
                    <SelectItem value="Cucumber">Cucumber</SelectItem>
                    <SelectItem value="Lentil">Lentil</SelectItem>
                    <SelectItem value="Onion">Onion</SelectItem>
                    <SelectItem value="Potato">Potato</SelectItem>
                    <SelectItem value="Tomato">Tomato</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
                <Label>Camera Feed</Label>
                <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground relative">
                   <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                   {hasCameraPermission === false && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 rounded-lg">
                            <VideoOff className="h-10 w-10 mb-2"/>
                            <p className="text-center font-semibold">Camera access is required.</p>
                            <p className="text-center text-sm">Please enable camera permissions in your browser settings and refresh the page.</p>
                       </div>
                   )}
                   {hasCameraPermission === null && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                            <Loader2 className="h-10 w-10 animate-spin"/>
                       </div>
                   )}
                   {isLoading && isAnalyzing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 rounded-lg">
                           <Loader2 className="h-10 w-10 animate-spin mb-2"/>
                           <p className="text-center font-semibold">Analyzing...</p>
                       </div>
                   )}
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="flex items-center space-x-2">
                <Switch id="analysis-toggle" checked={isAnalyzing} onCheckedChange={setIsAnalyzing} disabled={!fruitType || hasCameraPermission !== true}/>
                <Label htmlFor="analysis-toggle" className="cursor-pointer">Enable Real-time Analysis</Label>
            </div>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        {state.analysis?.analysis ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Latest Analysis</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{state.analysis.analysis}</ReactMarkdown>
              </CardContent>
            </Card>
            {imageData && (
              <Card>
                <CardHeader>
                  <CardTitle>Last Captured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image src={imageData} alt="Captured for analysis" width={600} height={400} className="rounded-lg" />
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground h-full">
            <Lightbulb className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Awaiting Analysis</h3>
            <p className="text-sm">Enable real-time analysis to see live insights here.</p>
          </div>
        )}
        {state.error && <p className="mt-4 text-sm text-destructive">{state.message}</p>}
      </div>
    </div>
  );
}
