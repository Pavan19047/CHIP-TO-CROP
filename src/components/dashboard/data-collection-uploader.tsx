
"use client"

import { useState, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSuggestedLabelAction, FormStateLabeling } from '@/app/actions';
import { Upload, Lightbulb, Loader2, Save, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const initialState: FormStateLabeling = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Tag className="mr-2 h-4 w-4" />}
      Get AI Suggestion
    </Button>
  );
}

export default function DataCollectionUploader() {
  const [state, formAction] = useActionState(getSuggestedLabelAction, initialState);
  const { toast } = useToast();

  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>('');
  
  const [produceType, setProduceType] = useState<string>('');
  const [quality, setQuality] = useState<string>('');
  
  const [isLabeled, setIsLabeled] = useState(false);

  useEffect(() => {
    if (state.label) {
      setProduceType(state.label.produceType);
      setQuality(state.label.quality);
    }
  }, [state.label]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setImageData(result);
        setIsLabeled(false); // Reset on new file
        setProduceType('');
        setQuality('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!produceType || !quality || !imageData) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please ensure produce type and quality are labeled before saving.",
        });
        return;
    }
    // In a real app, you'd save this to a database or a file store.
    // For this demo, we'll just show a success message.
    console.log({
        imageDataUri: imageData.substring(0, 50) + '...', // Don't log the full data URI
        label: `${quality} ${produceType}`,
    });
    toast({
        title: "Data Point Saved!",
        description: `Labeled "${quality} ${produceType}" and saved for training.`,
    });
    setIsLabeled(true);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Data Collection & Labeling</CardTitle>
          <CardDescription>
            Upload an image to get an AI-suggested label. Review, correct if needed, and save it to build your training dataset.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <input type="hidden" name="imageDataUri" value={imageData} />
          <CardContent className="space-y-4">
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
        {state.label || (produceType && quality) ? (
          <Card>
            <CardHeader>
              <CardTitle>Verify & Save Label</CardTitle>
              <CardDescription>Correct the AI's suggestion if needed, then save the data point.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="produceType">Produce Type</Label>
                <Select value={produceType} onValueChange={setProduceType}>
                    <SelectTrigger id="produceType">
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
                         <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="quality">Quality / Ripeness</Label>
                <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger id="quality">
                        <SelectValue placeholder="Select a quality label" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Grade A">Grade A (Premium)</SelectItem>
                        <SelectItem value="Grade B">Grade B (Standard)</SelectItem>
                        <SelectItem value="Grade C">Grade C (Processing)</SelectItem>
                        <SelectItem value="Ripe">Ripe</SelectItem>
                        <SelectItem value="Unripe">Unripe</SelectItem>
                        <SelectItem value="Overripe">Overripe</SelectItem>
                        <SelectItem value="Spoiled">Spoiled / Defective</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              {isLabeled && (
                 <Alert variant="default" className='border-green-500 text-green-700'>
                  <CheckCircle className="h-4 w-4 !text-green-500" />
                  <AlertTitle>Saved</AlertTitle>
                  <AlertDescription>
                    This data point has been saved to your dataset.
                  </AlertDescription>
                </Alert>
              )}
               {state.error && (
                 <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Suggestion Error</AlertTitle>
                  <AlertDescription>
                    {state.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
                <Button onClick={handleSave} className="w-full" disabled={isLabeled}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLabeled ? 'Saved!' : 'Confirm and Save'}
                </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground h-full">
            <Lightbulb className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Awaiting Image</h3>
            <p className="text-sm">Upload an image to get a suggested label from the AI.</p>
          </div>
        )}
      </div>
    </div>
  );
}
