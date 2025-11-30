
'use server';
/**
 * @fileOverview An AI flow that diagnoses heat treatment faults.
 *
 * - diagnoseFault - A function that handles the diagnosis process.
 * - DiagnoseFaultInput - The input type for the diagnoseFault function.
 * - DiagnoseFaultOutput - The return type for the diagnoseFault function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiagnoseFaultInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the observed heat treatment fault or problem.'),
});
export type DiagnoseFaultInput = z.infer<typeof DiagnoseFaultInputSchema>;

const DiagnoseFaultOutputSchema = z.object({
    possibleCauses: z.array(z.string()).describe('A list of the most likely root causes for the described symptoms.'),
    correctiveActions: z.array(z.string()).describe('A list of actionable steps to take to correct the issue and prevent it from recurring.'),
});
export type DiagnoseFaultOutput = z.infer<typeof DiagnoseFaultOutputSchema>;

const diagnoseFaultFlow = ai.defineFlow(
  {
    name: 'diagnoseFaultFlow',
    inputSchema: DiagnoseFaultInputSchema,
    outputSchema: DiagnoseFaultOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a world-class metallurgist with 40 years of experience troubleshooting heat treatment problems.

      A user is describing a problem they are having. Based on the symptoms, provide a concise list of the most likely possible causes and a list of recommended corrective actions.

      **Symptoms:**
      ${input.symptoms}

      Your response should be structured to directly identify root causes and provide clear, actionable solutions.
      `,
      model: ai.getModel('googleai/gemini-2.5-flash'),
      output: {
        schema: DiagnoseFaultOutputSchema,
      },
    });

    return llmResponse.output || { possibleCauses: [], correctiveActions: [] };
  }
);

export async function diagnoseFault(input: DiagnoseFaultInput): Promise<DiagnoseFaultOutput> {
  return diagnoseFaultFlow(input);
}
