
'use server';

/**
 * @fileOverview Recommends optimal heat treatment parameters based on material composition and desired properties.
 *
 * - recommendHeatTreatmentParameters - A function that handles the recommendation process.
 * - RecommendHeatTreatmentParametersInput - The input type for the recommendHeatTreatmentParameters function.
 * - RecommendHeatTreatmentParametersOutput - The return type for the recommendHeatTreatmentParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendHeatTreatmentParametersInputSchema = z.object({
  materialComposition: z
    .string()
    .describe('The chemical composition of the material (e.g., percentage of carbon, chromium, etc.).'),
  desiredProperties: z
    .string()
    .describe('The desired mechanical properties of the material after heat treatment (e.g., hardness, tensile strength).'),
});
export type RecommendHeatTreatmentParametersInput = z.infer<
  typeof RecommendHeatTreatmentParametersInputSchema
>;

const RecommendHeatTreatmentParametersOutputSchema = z.object({
  temperatureRange: z
    .string()
    .describe('The recommended temperature range for the heat treatment process (e.g., 850-900°C).'),
  soakingTime: z
    .string()
    .describe('The recommended soaking time at the specified temperature (e.g., 2 hours).'),
  coolingMethod: z
    .string()
    .describe('The recommended cooling method after soaking (e.g., water quench, air cool).'),
  expectedResult: z
    .string()
    .describe('The expected result of the heat treatment process on the material properties.'),
});

export type RecommendHeatTreatmentParametersOutput = z.infer<
  typeof RecommendHeatTreatmentParametersOutputSchema
>;

const recommendHeatTreatmentParametersFlow = ai.defineFlow(
  {
    name: 'recommendHeatTreatmentParametersFlow',
    inputSchema: RecommendHeatTreatmentParametersInputSchema,
    outputSchema: RecommendHeatTreatmentParametersOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
        prompt: `You are an expert metallurgist specializing in heat treatment processes.

You will use the provided material composition and desired properties to recommend optimal heat treatment parameters, including temperature ranges, soaking times, and cooling methods.

Material Composition: ${input.materialComposition}
Desired Properties: ${input.desiredProperties}

Based on this information, provide the following:

- Temperature Range: The recommended temperature range for the heat treatment process.
- Soaking Time: The recommended soaking time at the specified temperature.
- Cooling Method: The recommended cooling method after soaking.
- Expected Result: The expected result of the heat treatment process on the material properties.`,
        model: ai.getModel('googleai/gemini-2.5-flash'),
        output: {
            schema: RecommendHeatTreatmentParametersOutputSchema,
        }
    });
    return output!;
  }
);


export async function recommendHeatTreatmentParameters(
  input: RecommendHeatTreatmentParametersInput
): Promise<RecommendHeatTreatmentParametersOutput> {
  return recommendHeatTreatmentParametersFlow(input);
}
