
'use server';

/**
 * @fileOverview This flow compares two images of the same produce type to provide a grading analysis.
 *
 * - compareProduceForGrading - Compares two images and details the differences for grading.
 * - CompareProduceForGradingInput - The input type for the compareProduceForGrading function.
 * - CompareProduceForGradingOutput - The return type for the compareProduceForGrading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareProduceForGradingInputSchema = z.object({
  imageDataUriA: z
    .string()
    .describe(
      "The first image of the produce, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  imageDataUriB: z
    .string()
    .describe(
      "The second image of the produce, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fruitType: z.string().describe('The type of produce in the images (e.g., tomato, apple).'),
});
export type CompareProduceForGradingInput = z.infer<
  typeof CompareProduceForGradingInputSchema
>;

const CompareProduceForGradingOutputSchema = z.object({
  comparison: z
    .string()
    .describe(
      'A detailed analysis comparing the two images, explaining the visual differences that justify their respective classifications. Use markdown for lists.'
    ),
});
export type CompareProduceForGradingOutput = z.infer<
  typeof CompareProduceForGradingOutputSchema
>;

export async function compareProduceForGrading(
  input: CompareProduceForGradingInput
): Promise<CompareProduceForGradingOutput> {
  return compareProduceForGradingFlow(input);
}

const compareProduceForGradingPrompt = ai.definePrompt({
  name: 'compareProduceForGradingPrompt',
  input: {schema: CompareProduceForGradingInputSchema},
  output: {schema: CompareProduceForGradingOutputSchema},
  prompt: `You are an expert agricultural inspector with a keen eye for detail. Your task is to compare two images of a {{{fruitType}}} and explain the visual differences.

**Input Data:**
- **Produce Type:** {{{fruitType}}}
- **Image A:** {{media url=imageDataUriA}}
- **Image B:** {{media url=imageDataUriB}}

**Your Task:**

Provide a clear, concise comparison of the two images in a markdown bulleted list. Your analysis should be easy for a farm operator to understand. Do not include a summary sentence or any introductory paragraph.

**First, for each image, determine its classification (e.g., Ripe, Unripe, Grade A, Spoiled). Then, compare them based on the following criteria:**
*   **Classification:** State the classification you determined for each image.
*   **Color:** Is one more vibrant, more uniform, or a different shade? (e.g., "Image A has a deep, uniform red, while Image B is paler and slightly green near the stem.")
*   **Size & Shape:** Is there a noticeable difference in size? Is one more symmetrical or does it have deformities? (e.g., "Image A is larger and perfectly round, whereas Image B is smaller and slightly misshapen.")
*   **Blemishes & Defects:** Point out any bruises, spots, cracks, or signs of disease. Be specific. (e.g., "Image B shows a small black spot on its side and minor cracking near the top, which are absent in Image A.")
*   **Ripeness Indicators:** Connect the visual cues to ripeness if applicable (e.g., color, firmness suggested by texture).

**Output:**
Write your findings as a markdown bulleted list in the 'comparison' field.
`,
});

const compareProduceForGradingFlow = ai.defineFlow(
  {
    name: 'compareProduceForGradingFlow',
    inputSchema: CompareProduceForGradingInputSchema,
    outputSchema: CompareProduceForGradingOutputSchema,
  },
  async input => {
    const {output} = await compareProduceForGradingPrompt(input);
    return output!;
  }
);
