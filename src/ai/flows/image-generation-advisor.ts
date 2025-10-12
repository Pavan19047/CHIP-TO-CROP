
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
    const fullPrompt = `An ultra-realistic, high-definition photograph of the following agricultural produce, on a clean, neutral background: ${prompt}`;
    
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: fullPrompt,
    });
    
    const imageDataUri = media.url;
    if (!imageDataUri) {
        throw new Error('Image generation failed.');
    }
    
    return { imageDataUri };
  }
);
