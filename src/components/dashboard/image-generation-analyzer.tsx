
"use client"

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { generateImageAction, FormStateGeneration } from '@/app/actions';
import { Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const initialState: FormStateGeneration = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Generate Image
    </Button>
  );
}

export default function ImageGenerationAnalyzer() {
  const [state, formAction] = useActionState(generateImageAction, initialState);

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Image Generation</CardTitle>
          <CardDescription>
            Describe the produce you want to see, and the AI will generate an image. 
            For example, "a Grade B tomato with blossom end rot" or "an overripe banana with brown spots".
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="prompt">Image Description</Label>
                <Textarea
                    id="prompt"
                    name="prompt"
                    placeholder="e.g., A ripe tomato with a small crack near the stem"
                    rows={3}
                />
                {state.fieldErrors?.prompt && <p className="text-sm text-destructive">{state.fieldErrors.prompt[0]}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div>
        {state.generatedImage?.imageDataUri ? (
          <Card>
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src={state.generatedImage.imageDataUri} alt="AI-generated produce" width={512} height={512} className="rounded-lg border" />
            </CardContent>
          </Card>
        ) : (
          <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground h-full">
            <ImageIcon className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Awaiting Generation</h3>
            <p className="text-sm">Your AI-generated image will appear here.</p>
          </div>
        )}
        {state.error && <p className="mt-4 text-sm text-destructive">{state.message}</p>}
      </div>
    </div>
  );
}
