
"use client"

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { compareImagesAction, FormStateComparison } from '@/app/actions';
import { Upload, Lightbulb, Loader2, Contrast } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ReactMarkdown from 'react-markdown';

const initialState: FormStateComparison = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Contrast className="mr-2 h-4 w-4" />}
      Compare Images
    </Button>
  );
}

function ImageUploader({ side, preview, onFileChange, error }: { side: 'A' | 'B', preview: string | null, onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={`picture-${side}`}>Image {side}</Label>
            <div className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground relative">
            {preview ? (
                <Image src={preview} alt={`Image ${side} preview`} layout="fill" objectFit="contain" className="rounded-lg" />
            ) : (
                <div className="text-center">
                <Upload className="mx-auto h-8 w-8" />
                <p>Click to upload</p>
                </div>
            )}
            <Input id={`picture-${side}`} type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onFileChange} accept="image/*" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
}

export default function ImageComparisonAnalyzer() {
  const [state, formAction] = useActionState(compareImagesAction, initialState);
  
  const [previewA, setPreviewA] = useState<string | null>(null);
  const [imageDataA, setImageDataA] = useState<string>('');
  
  const [previewB, setPreviewB] = useState<string | null>(null);
  const [imageDataB, setImageDataB] = useState<string>('');

  const [fruitType, setFruitType] = useState('');

  const handleFileChange = (side: 'A' | 'B') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (side === 'A') {
            setPreviewA(result);
            setImageDataA(result);
        } else {
            setPreviewB(result);
            setImageDataB(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Comparison Tool</CardTitle>
          <CardDescription>
            Upload two images of the same produce type to compare their quality and grading.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <input type="hidden" name="imageDataUriA" value={imageDataA} />
          <input type="hidden" name="imageDataUriB" value={imageDataB} />
          <input type="hidden" name="fruitType" value={fruitType} />

          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fruitType">Produce Type</Label>
                <Select onValueChange={setFruitType}>
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
                {state.fieldErrors?.fruitType && <p className="text-sm text-destructive">{state.fieldErrors.fruitType[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <ImageUploader side="A" preview={previewA} onFileChange={handleFileChange('A')} error={state.fieldErrors?.imageDataUriA?.[0]} />
                 <ImageUploader side="B" preview={previewB} onFileChange={handleFileChange('B')} error={state.fieldErrors?.imageDataUriB?.[0]} />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div>
        {state.analysis?.comparison ? (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Result</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{state.analysis.comparison}</ReactMarkdown>
            </CardContent>
          </Card>
        ) : (
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground h-full">
            <Lightbulb className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Awaiting Comparison</h3>
            <p className="text-sm">Your AI-generated comparison will appear here.</p>
          </div>
        )}
        {state.error && <p className="mt-4 text-sm text-destructive">{state.message}</p>}
      </div>
    </div>
  );
}
