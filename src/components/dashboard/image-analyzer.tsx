
"use client"

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { analyzeImageAction, FormState } from '@/app/actions';
import { Upload, Lightbulb, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockSortSessions } from '@/lib/mock-data';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Analyze Image
    </Button>
  );
}

export default function ImageAnalyzer() {
  const [state, formAction] = useActionState(analyzeImageAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>('');

  const highErrorSessions = mockSortSessions.filter(s => s.errorRate > 0.05);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setImageData(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analyze Misclassification</CardTitle>
          <CardDescription>
            Upload an image of an incorrectly classified fruit to get AI-powered feedback on potential causes.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <input type="hidden" name="imageDataUri" value={imageData} />
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="session">High-Error Session (Optional)</Label>
                <Select name="session">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a session" />
                  </SelectTrigger>
                  <SelectContent>
                    {highErrorSessions.map(session => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.id} ({(session.errorRate * 100).toFixed(1)}% error)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="picture">Fruit Image</Label>
              <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground relative">
                {preview ? (
                  <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" className="rounded-lg" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8" />
                    <p>Click to upload or drag and drop</p>
                  </div>
                )}
                <Input id="picture" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div>
        {state.message && (
          <Alert variant={state.error ? 'destructive' : 'default'} className="mb-4">
            <AlertTitle>{state.error ? 'Error' : 'Analysis Result'}</AlertTitle>
            <AlertDescription>
                {state.analysis ? state.analysis.likelyCauses : state.message}
            </AlertDescription>
          </Alert>
        )}
        {!state.message && (
             <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground h-full">
                <Lightbulb className="h-12 w-12 mb-4"/>
                <h3 className="text-lg font-semibold">Awaiting Analysis</h3>
                <p className="text-sm">Your AI-generated insights will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
