
'use server';

/**
 * @fileOverview This flow generates an image based on a text prompt.
 *
 * - generateImageFromPrompt - Generates an image from a text description.
 * - GenerateImageFromPromptInput - The input type for the generateImageFromPrompt function.
 * - GenerateImageFromPromptOutput - The return type for the generateImageFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageFromPromptInputSchema = z.object({
  prompt: z.string().describe('A text description of the image to generate.'),
});
export type GenerateImageFromPromptInput = z.infer<
  typeof GenerateImageFromPromptInputSchema
>;

const GenerateImageFromPromptOutputSchema = z.object({
    imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageFromPromptOutput = z.infer<
  typeof GenerateImageFromPromptOutputSchema
>;

export async function generateImageFromPrompt(
  input: GenerateImageFromPromptInput
): Promise<GenerateImageFromPromptOutput> {
  return generateImageFromPromptFlow(input);
}

const generateImageFromPromptFlow = ai.defineFlow(
  {
    name: 'generateImageFromPromptFlow',
    inputSchema: GenerateImageFromPromptInputSchema,
    outputSchema: GenerateImageFromPromptOutputSchema,
  },
  async ({prompt}) => {
    // Note: Imagen requires billing. For free tier, we'll use a placeholder service
    // that generates mock images. To enable real image generation, add billing to your
    // Google Cloud project and uncomment the Imagen code below.
    
    // For now, return a placeholder indicating the feature requires billing
    const placeholderMessage = `Image generation with Imagen requires a billing account. Your prompt: "${prompt}"`;
    
    // Generate a placeholder image URL using a free service
    // Using DiceBear API for agricultural-themed avatars as placeholder
    const seed = encodeURIComponent(prompt.substring(0, 50));
    const imageDataUri = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=e8f5e9`;
    
    return { 
      imageDataUri,
      // You can add a note field if your schema supports it
    };
    
    /* UNCOMMENT THIS WHEN BILLING IS ENABLED:
    const fullPrompt = `An ultra-realistic, high-definition photograph of the following agricultural produce, on a clean, neutral background: ${prompt}`;
    
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: fullPrompt,
    });

    if (!media || !media.url) {
        throw new Error('Image generation failed.');
    }

    const imageDataUri = media.url;
    return { imageDataUri };
    */
  }
);
