
'use server';
/**
 * @fileOverview An AI flow that suggests a heat treatment process based on material and desired properties.
 *
 * - suggestHeatTreatment - A function that handles the suggestion process.
 * - SuggestHeatTreatmentInput - The input type for the suggestHeatTreatment function.
 * - SuggestHeatTreatmentOutput - The return type for the suggestHeatTreatment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestHeatTreatmentInputSchema = z.object({
  steelType: z.string().describe('The type of steel being used, e.g., "A2 Tool Steel" or "1095 High Carbon".'),
  desiredProperties: z.string().describe("The desired mechanical properties, e.g., 'High hardness for wear resistance' or 'Increased ductility for forming'."),
});
export type SuggestHeatTreatmentInput = z.infer<typeof SuggestHeatTreatmentInputSchema>;

const SuggestHeatTreatmentOutputSchema = z.object({
    heatTreatment: z.string().describe('The recommended heat treatment process (e.g., "Quench and Temper", "Annealing").'),
    temperatureRange: z.string().describe('The recommended temperature range for the primary step (e.g., "820-860°C").'),
    duration: z.string().describe('The recommended soaking time (e.g., "30-60 minutes").'),
});
export type SuggestHeatTreatmentOutput = z.infer<typeof SuggestHeatTreatmentOutputSchema>;

const suggestHeatTreatmentFlow = ai.defineFlow(
  {
    name: 'suggestHeatTreatmentFlow',
    inputSchema: SuggestHeatTreatmentInputSchema,
    outputSchema: SuggestHeatTreatmentOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a metallurgical expert. Based on the steel type and desired properties, suggest a single, primary heat treatment process. Provide a recommended temperature range and duration for the main step of that process.

      **Steel Type:** ${input.steelType}
      **Desired Properties:** ${input.desiredProperties}

      Your response should be concise and directly answer the user's need.
      `,
      model: ai.getModel('googleai/gemini-2.5-flash'),
      output: {
        schema: SuggestHeatTreatmentOutputSchema,
      },
    });

    return llmResponse.output || { heatTreatment: "", temperatureRange: "", duration: "" };
  }
);

export async function suggestHeatTreatment(input: SuggestHeatTreatmentInput): Promise<SuggestHeatTreatmentOutput> {
  return suggestHeatTreatmentFlow(input);
}
