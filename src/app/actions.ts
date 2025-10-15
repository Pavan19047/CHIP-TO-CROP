
// @ts-nocheck
'use server';

import { analyzeImageForSortingErrors, AnalyzeImageForSortingErrorsOutput } from '@/ai/flows/image-analysis-advisor';
import { compareProduceForGrading, CompareProduceForGradingOutput } from '@/ai/flows/image-comparison-advisor';
import { generateImageFromPrompt, GenerateImageFromPromptOutput } from '@/ai/flows/image-generation-advisor';
import { getSuggestedLabelForImage, GetSuggestedLabelForImageOutput } from '@/ai/flows/data-labeling-advisor';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Tomato detection types
export type TomatoDetection = {
  bbox: number[];
  label: string;
  confidence: number;
  fruit_type: string;
  is_ripe: boolean;
};

export type TomatoDetectionResult = {
  detections: TomatoDetection[];
  summary: {
    total: number;
    ripe: number;
    unripe: number;
    by_type: Record<string, number>;
  };
};

export type TomatoDetectionFormState = {
  message: string;
  result?: TomatoDetectionResult;
  error?: boolean;
  fieldErrors?: {
    imageDataUri?: string[];
  };
};

const schema = z.object({
  imageDataUri: z.string().min(1, { message: 'Image is required.' }),
  fruitType: z.string().min(1, { message: 'Produce type is required.' }),
});

export type FormState = {
  message: string;
  analysis?: AnalyzeImageForSortingErrorsOutput;
  error?: boolean;
  fieldErrors?: {
    fruitType?: string[];
    imageDataUri?: string[];
  }
}

export async function analyzeImageAction(prevState: FormState, formData: FormData) : Promise<FormState> {
  const validatedFields = schema.safeParse({
    imageDataUri: formData.get('imageDataUri'),
    fruitType: formData.get('fruitType'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      message: 'Please check the form for errors.',
      error: true,
      fieldErrors: fieldErrors,
    };
  }

  try {
    const result = await analyzeImageForSortingErrors(validatedFields.data);
    revalidatePath('/dashboard/advisor');
    return {
      message: 'Analysis complete.',
      analysis: result,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during analysis. Please try again.',
      error: true,
    };
  }
}

const comparisonSchema = z.object({
  imageDataUriA: z.string().min(1, { message: 'Image A is required.' }),
  imageDataUriB: z.string().min(1, { message: 'Image B is required.' }),
  fruitType: z.string().min(1, { message: 'Produce type is required.' }),
});

export type FormStateComparison = {
  message: string;
  analysis?: CompareProduceForGradingOutput;
  error?: boolean;
  fieldErrors?: {
    fruitType?: string[];
    imageDataUriA?: string[];
    imageDataUriB?: string[];
  }
}

export async function compareImagesAction(prevState: FormStateComparison, formData: FormData): Promise<FormStateComparison> {
  const validatedFields = comparisonSchema.safeParse({
    imageDataUriA: formData.get('imageDataUriA'),
    imageDataUriB: formData.get('imageDataUriB'),
    fruitType: formData.get('fruitType'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please check the form for errors.',
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await compareProduceForGrading(validatedFields.data);
    revalidatePath('/dashboard/advisor');
    return {
      message: 'Comparison complete.',
      analysis: result,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during comparison. Please try again.',
      error: true,
    };
  }
}


const generationSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required.' }),
});

export type FormStateGeneration = {
  message: string;
  generatedImage?: GenerateImageFromPromptOutput;
  error?: boolean;
  fieldErrors?: {
    prompt?: string[];
  }
}

export async function generateImageAction(prevState: FormStateGeneration, formData: FormData): Promise<FormStateGeneration> {
  const validatedFields = generationSchema.safeParse({
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please check the form for errors.',
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await generateImageFromPrompt(validatedFields.data);
    revalidatePath('/dashboard/advisor');
    return {
      message: 'Image generation complete.',
      generatedImage: result,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during image generation. Please try again.',
      error: true,
    };
  }
}

const labelingSchema = z.object({
  imageDataUri: z.string().min(1, { message: 'Image is required.' }),
});

export type FormStateLabeling = {
  message: string;
  label?: GetSuggestedLabelForImageOutput;
  error?: boolean;
  fieldErrors?: {
    imageDataUri?: string[];
  }
}

export async function getSuggestedLabelAction(prevState: FormStateLabeling, formData: FormData): Promise<FormStateLabeling> {
  const validatedFields = labelingSchema.safeParse({
    imageDataUri: formData.get('imageDataUri'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please check the form for errors.',
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await getSuggestedLabelForImage(validatedFields.data);
    revalidatePath('/dashboard/advisor');
    return {
      message: 'Label suggestion complete.',
      label: result,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while suggesting a label. Please try again.',
      error: true,
    };
  }
}

// Tomato detection action for live feed
const tomatoDetectionSchema = z.object({
  imageDataUri: z.string().min(1, { message: 'Image is required.' }),
});

export async function detectTomatoesAction(
  prevState: TomatoDetectionFormState,
  formData: FormData
): Promise<TomatoDetectionFormState> {
  const validatedFields = tomatoDetectionSchema.safeParse({
    imageDataUri: formData.get('imageDataUri'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please check the form for errors.',
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Convert data URI to blob
    const dataUri = validatedFields.data.imageDataUri;
    const base64Data = dataUri.split(',')[1];
    const mimeType = dataUri.match(/:(.*?);/)?.[1] || 'image/jpeg';
    
    // Create form data for the API call
    const apiFormData = new FormData();
    const blob = Buffer.from(base64Data, 'base64');
    const file = new File([blob], 'image.jpg', { type: mimeType });
    apiFormData.append('image', file);

    // Call the tomato detection API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/api/tomatoes/detect`, {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Detection failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    revalidatePath('/dashboard/live-feed');
    return {
      message: result.summary.total > 0 
        ? `Detected ${result.summary.total} tomato(es): ${result.summary.ripe} ripe, ${result.summary.unripe} unripe`
        : 'No tomatoes detected in the image',
      result: result,
      error: false,
    };
  } catch (error) {
    console.error('Tomato detection error:', error);
    return {
      message: error instanceof Error ? error.message : 'An error occurred during tomato detection. Please try again.',
      error: true,
    };
  }
}
