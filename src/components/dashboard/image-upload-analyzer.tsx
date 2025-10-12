
"use client"

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { analyzeImageAction, FormState } from '@/app/actions';
import { Upload, Lightbulb, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ReactMarkdown from 'react-markdown';

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

export default function ImageUploadAnalyzer() {
  const [state, formAction] = useActionState(analyzeImageAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>('');
  const [fruitType, setFruitType] = useState('');

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
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analyze from File</CardTitle>
          <CardDescription>
            Upload an image of an incorrectly classified item to get AI-powered feedback on potential causes.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <input type="hidden" name="imageDataUri" value={imageData} />
          <input type="hidden" name="fruitType" value={fruitType} />
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="fruitType">Expected Produce Type</Label>
                <Select onValueChange={setFruitType} name="fruitType">
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
            <div className="space-y-2">
              <Label htmlFor="picture">Produce Image</Label>
              <div className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground relative">
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
               {state.fieldErrors?.imageDataUri && <p className="text-sm text-destructive">{state.fieldErrors.imageDataUri[0]}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div>
        {state.analysis?.analysis ? (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{state.analysis.analysis}</ReactMarkdown>
            </CardContent>
          </Card>
        ) : (
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground h-full">
            <Lightbulb className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Awaiting Analysis</h3>
            <p className="text-sm">Your AI-generated insights will appear here.</p>
          </div>
        )}
        {state.error && <p className="mt-4 text-sm text-destructive">{state.message}</p>}
      </div>
    </div>
  );
}
