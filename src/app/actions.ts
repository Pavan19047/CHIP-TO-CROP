
// @ts-nocheck
'use server';

import { analyzeImageForSortingErrors, AnalyzeImageForSortingErrorsOutput } from '@/ai/flows/image-analysis-advisor';
import { compareProduceForGrading, CompareProduceForGradingOutput } from '@/ai/flows/image-comparison-advisor';
import { generateImageFromPrompt, GenerateImageFromPromptOutput } from '@/ai/flows/image-generation-advisor';
import { getSuggestedLabelForImage, GetSuggestedLabelForImageOutput } from '@/ai/flows/data-labeling-advisor';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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
