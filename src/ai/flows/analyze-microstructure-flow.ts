
'use server';
/**
 * @fileOverview An AI flow that analyzes a steel microstructure image.
 * 
 * - analyzeMicrostructure - A function that handles the analysis process.
 * - AnalyzeMicrostructureInput - The input type for the function.
 * - AnalyzeMicrostructureOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeMicrostructureInputSchema = z.object({
  photoDataUri: z.string().describe("A data URI of a micrograph image of a polished and etched steel sample. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type AnalyzeMicrostructureInput = z.infer<typeof AnalyzeMicrostructureInputSchema>;

const AnalyzeMicrostructureOutputSchema = z.object({
  phaseComposition: z.object({
    martensite: z.number().describe('Percentage of martensite in the microstructure.'),
    ferrite: z.number().describe('Percentage of ferrite in the microstructure.'),
    pearlite: z.number().describe('Percentage of pearlite in the microstructure.'),
    bainite: z.number().describe('Percentage of bainite in the microstructure.'),
    austenite: z.number().describe('Percentage of retained austenite in the microstructure.'),
    carbides: z.number().describe('Percentage of visible carbides in the microstructure.'),
  }).describe('The estimated percentage of each metallurgical phase. The sum of all percentages should be 100.'),
  estimatedHardness: z.string().describe("The estimated hardness range based on the microstructure, e.g., '58-62 HRC' or '180-220 HBW'."),
  analysisSummary: z.string().describe('A brief summary of the key features observed in the microstructure, including grain size, phase distribution, and any notable defects.'),
});
export type AnalyzeMicrostructureOutput = z.infer<typeof AnalyzeMicrostructureOutputSchema>;

const analyzeMicrostructureFlow = ai.defineFlow(
  {
    name: 'analyzeMicrostructureFlow',
    inputSchema: AnalyzeMicrostructureInputSchema,
    outputSchema: AnalyzeMicrostructureOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are an expert metallurgist specializing in the analysis of steel microstructures. You will be given a micrograph image.

      Analyze the provided image and perform the following tasks:
      1.  **Phase Composition**: Identify and estimate the percentage of each visible metallurgical phase (martensite, ferrite, pearlite, bainite, retained austenite, carbides). Ensure the total percentage adds up to 100. If a phase is not present, its value should be 0.
      2.  **Hardness Estimation**: Based on the identified phases and their morphology, provide an estimated hardness range in the most appropriate scale (e.g., HRC for hardened steels, HBW for annealed steels).
      3.  **Analysis Summary**: Write a concise summary describing the key features of the microstructure. Comment on the grain size (e.g., fine, coarse), the distribution and morphology of the phases, and note any visible defects like micro-cracks, inclusions, or decarburization.

      Image to analyze: {{media url=photoDataUri}}
      `,
      output: {
        schema: AnalyzeMicrostructureOutputSchema,
      },
    });

    return llmResponse.output!;
  }
);

export async function analyzeMicrostructure(input: AnalyzeMicrostructureInput): Promise<AnalyzeMicrostructureOutput> {
  return analyzeMicrostructureFlow(input);
}
