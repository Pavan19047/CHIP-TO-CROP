
'use server';

/**
 * @fileOverview This flow provides an AI-suggested label for an image of produce.
 *
 * - getSuggestedLabelForImage - Analyzes an image and suggests a classification label.
 * - GetSuggestedLabelForImageInput - The input type for the getSuggestedLabelForImage function.
 * - GetSuggestedLabelForImageOutput - The return type for the getSuggestedLabelForImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetSuggestedLabelForImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of produce, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GetSuggestedLabelForImageInput = z.infer<
  typeof GetSuggestedLabelForImageInputSchema
>;

const GetSuggestedLabelForImageOutputSchema = z.object({
  produceType: z
    .string()
    .describe(
      'The identified type of produce (e.g., Tomato, Apple, Banana, Carrot, Cucumber, Lentil, Onion, Potato, Other).'
    ),
  quality: z
    .string()
    .describe(
      'The suggested quality or ripeness label (e.g., Grade A, Ripe, Unripe, Spoiled).'
    ),
});
export type GetSuggestedLabelForImageOutput = z.infer<
  typeof GetSuggestedLabelForImageOutputSchema
>;

export async function getSuggestedLabelForImage(
  input: GetSuggestedLabelForImageInput
): Promise<GetSuggestedLabelForImageOutput> {
  return getSuggestedLabelForImageFlow(input);
}

const getSuggestedLabelPrompt = ai.definePrompt({
  name: 'getSuggestedLabelPrompt',
  input: {schema: GetSuggestedLabelForImageInputSchema},
  output: {schema: GetSuggestedLabelForImageOutputSchema},
  prompt: `You are an expert agricultural inspector. Your task is to analyze an image of produce and suggest a precise label for it.

**Input Image:**
{{media url=imageDataUri}}

**Your Task:**
1.  **Identify the Produce:** Determine the type of produce in the image. Choose from: Apple, Banana, Carrot, Cucumber, Lentil, Onion, Potato, Tomato. If it's none of these, classify it as 'Other'.
2.  **Determine the Quality/Ripeness:** Assess the produce and assign a quality label. Choose the *most fitting* label from:
    *   'Grade A' (Premium quality, perfect condition)
    *   'Grade B' (Standard quality, minor imperfections)
    *   'Grade C' (Processing quality, significant defects but usable)
    *   'Ripe' (Perfect for consumption)
    *   'Unripe' (Not yet ready)
    *   'Overripe' (Past its prime)
    *   'Spoiled' (Visible signs of decay, mold, etc.)

**Output:**
Return the identified produce type and the quality label in the specified format. Only return the final labels.
`,
});

const getSuggestedLabelForImageFlow = ai.defineFlow(
  {
    name: 'getSuggestedLabelForImageFlow',
    inputSchema: GetSuggestedLabelForImageInputSchema,
    outputSchema: GetSuggestedLabelForImageOutputSchema,
  },
  async input => {
    const {output} = await getSuggestedLabelPrompt(input);
    return output!;
  }
);
