'use server';

/**
 * @fileOverview An AI agent that summarizes the content of a video.
 *
 * - generateVideoSummary - A function that generates a summary of a video.
 * - GenerateVideoSummaryInput - The input type for the generateVideoSummary function.
 * - GenerateVideoSummaryOutput - The return type for the generateVideoSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoSummaryInputSchema = z.object({
  videoUrl: z
    .string()
    .url()
    .describe('The URL of the video to summarize.'),
});
export type GenerateVideoSummaryInput = z.infer<
  typeof GenerateVideoSummaryInputSchema
>;

const GenerateVideoSummaryOutputSchema = z.object({
  summary: z.string().describe('The summary of the video.'),
});
export type GenerateVideoSummaryOutput = z.infer<
  typeof GenerateVideoSummaryOutputSchema
>;

export async function generateVideoSummary(
  input: GenerateVideoSummaryInput
): Promise<GenerateVideoSummaryOutput> {
  return generateVideoSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoSummaryPrompt',
  input: {schema: GenerateVideoSummaryInputSchema},
  output: {schema: GenerateVideoSummaryOutputSchema},
  prompt: `You are an expert summarizer of video content.

  Please watch the video at the following URL: {{{videoUrl}}}

  Then, provide a concise summary of the video's key takeaways, covering the core topics and insights presented. Focus on the most important information that viewers should remember.
  `,
});

const generateVideoSummaryFlow = ai.defineFlow(
  {
    name: 'generateVideoSummaryFlow',
    inputSchema: GenerateVideoSummaryInputSchema,
    outputSchema: GenerateVideoSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
