import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Using gemini-2.5-flash - best for free tier (fast, intelligent, good price-performance)
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
