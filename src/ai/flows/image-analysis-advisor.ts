
'use server';

/**
 * @fileOverview This flow provides image analysis advice for sorting sessions with above-average error rates.
 *
 * - analyzeImageForSortingErrors - Analyzes images of incorrectly classified fruit to identify potential issues.
 * - AnalyzeImageForSortingErrorsInput - The input type for the analyzeImageForSortingErrors function.
 * - AnalyzeImageForSortingErrorsOutput - The return type for the analyzeImageForSortingErrors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeImageForSortingErrorsInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of incorrectly classified fruit, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fruitType: z.string().describe('The type of fruit in the image (e.g., tomato, apple).'),
});
export type AnalyzeImageForSortingErrorsInput = z.infer<
  typeof AnalyzeImageForSortingErrorsInputSchema
>;

const AnalyzeImageForSortingErrorsOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'A detailed analysis of the produce in the image, including its likely classification and any visual defects or quality issues. Use markdown for lists.'
    ),
});
export type AnalyzeImageForSortingErrorsOutput = z.infer<
  typeof AnalyzeImageForSortingErrorsOutputSchema
>;

export async function analyzeImageForSortingErrors(
  input: AnalyzeImageForSortingErrorsInput
): Promise<AnalyzeImageForSortingErrorsOutput> {
  return analyzeImageForSortingErrorsFlow(input);
}

const analyzeImageForSortingErrorsPrompt = ai.definePrompt({
  name: 'analyzeImageForSortingErrorsPrompt',
  input: {schema: AnalyzeImageForSortingErrorsInputSchema},
  output: {schema: AnalyzeImageForSortingErrorsOutputSchema},
  prompt: `You are an expert agricultural inspector. Your task is to analyze an image of produce and provide a detailed quality assessment.

**Input Data:**
- **Expected Produce Type:** {{{fruitType}}}
- **Image:** {{media url=imageDataUri}}

**Your Task:**
Provide a clear, concise analysis of the image in a markdown bulleted list. Your analysis should be easy for a farm operator to understand. Do not include a summary sentence or any introductory paragraph.

**Your analysis should cover the following points:**
1.  **Identification:** First, confirm if the item in the image matches the 'Expected Produce Type'.
    *   If it does not match (e.g., a banana when expecting a tomato), state this clearly as the primary issue.
    *   If it matches, proceed with the analysis.
2.  **Classification:** Determine the likely classification (e.g., Ripe, Unripe, Grade A, Grade B, Spoiled). State this classification clearly.
3.  **Visual Evidence:** Justify your classification with visual evidence from the image. Focus on:
    *   **Color:** Describe the color uniformity, vibrancy, and any discoloration.
    *   **Size & Shape:** Note any irregularities, deformities, or significant size deviations.
    *   **Blemishes & Defects:** Point out any bruises, spots, cracks, mold, or signs of disease.

**Output:**
Write your findings as a markdown bulleted list in the 'analysis' field.
`,
});

const analyzeImageForSortingErrorsFlow = ai.defineFlow(
  {
    name: 'analyzeImageForSortingErrorsFlow',
    inputSchema: AnalyzeImageForSortingErrorsInputSchema,
    outputSchema: AnalyzeImageForSortingErrorsOutputSchema,
  },
  async input => {
    const {output} = await analyzeImageForSortingErrorsPrompt(input);
    return output!;
  }
);
