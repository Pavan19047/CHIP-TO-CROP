'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const advisorInputSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  context: z.object({
    userRole: z.string().optional(),
    recentActivity: z.array(z.string()).optional(),
    systemData: z.record(z.any()).optional(),
  }).optional(),
});

export type AdvisorInput = z.infer<typeof advisorInputSchema>;

export interface AdvisorResponse {
  answer: string;
  confidence: number;
  sources: string[];
  followUpQuestions: string[];
}

/**
 * AI Advisor using Google Genkit
 * Answers user questions based on app data and documentation
 */
export async function askAdvisor(input: AdvisorInput): Promise<AdvisorResponse> {
  try {
    const validated = advisorInputSchema.parse(input);

    // Build context for the AI
    const contextString = validated.context
      ? `
User Role: ${validated.context.userRole || 'Unknown'}
Recent Activity: ${validated.context.recentActivity?.join(', ') || 'None'}
System Context: ${JSON.stringify(validated.context.systemData || {})}
`
      : '';

    // Call AI advisor flow using gemini-2.5-flash (free tier, fast & intelligent)
    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: `You are an AI advisor for the Chip to Crop agricultural image analysis platform. 
Answer the following question based on your knowledge of the system and the provided context.

Context:
${contextString}

User Question: ${validated.question}

Provide a helpful, accurate answer. If you're not certain, say so. Include relevant sources or references if applicable.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    // Extract follow-up questions from the response
    const followUpPattern = /Follow-up questions?:?\s*([\s\S]*)/i;
    const followUpMatch = result.text.match(followUpPattern);
    const followUpQuestions = followUpMatch
      ? followUpMatch[1]
          .split('\n')
          .map((q) => q.replace(/^[-*\d.)\s]+/, '').trim())
          .filter((q) => q.length > 0)
          .slice(0, 3)
      : [];

    // Clean the answer by removing follow-up section if present
    const cleanAnswer = result.text.replace(followUpPattern, '').trim();

    return {
      answer: cleanAnswer,
      confidence: 0.85, // Could be derived from model confidence scores
      sources: [
        'System Documentation',
        'User Guide',
        'Best Practices',
      ],
      followUpQuestions,
    };
  } catch (error) {
    console.error('AI Advisor Error:', error);
    return {
      answer: 'I apologize, but I encountered an error processing your question. Please try rephrasing or contact support.',
      confidence: 0,
      sources: [],
      followUpQuestions: [],
    };
  }
}

// Common FAQ retrieval
export async function getFAQs(): Promise<Array<{ question: string; answer: string; category: string }>> {
  return [
    {
      category: 'Getting Started',
      question: 'How do I upload images for analysis?',
      answer: 'Navigate to the Dashboard and click on "Upload Data". You can drag and drop images or click to browse. We support JPEG, PNG, and WebP formats up to 10MB.',
    },
    {
      category: 'Analysis',
      question: 'What crops can the system analyze?',
      answer: 'Our system currently supports wheat, corn, rice, soybean, and cotton. We can detect diseases, pests, and nutrient deficiencies across these crops.',
    },
    {
      category: 'Results',
      question: 'How do I interpret the confidence score?',
      answer: 'Confidence scores above 90% indicate high certainty. Scores between 70-90% are moderately confident. Below 70% suggests the model is uncertain and manual review is recommended.',
    },
    {
      category: 'Reports',
      question: 'Can I export my analysis results?',
      answer: 'Yes! Go to the Results page and click "Export". You can download results as PDF or CSV format, with options to filter by date range, crop type, and severity.',
    },
    {
      category: 'Account',
      question: 'How do I set up notifications?',
      answer: 'Visit Settings > Notifications to configure email and in-app alerts. You can set thresholds for different severity levels and choose which events trigger notifications.',
    },
  ];
}
