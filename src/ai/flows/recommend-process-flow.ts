
'use server';
/**
 * @fileOverview An AI flow that recommends a full heat treatment process based on material and desired hardness.
 *
 * - recommendProcess - A function that handles the recommendation process.
 * - RecommendProcessInput - The input type for the recommendProcess function.
 * - RecommendProcessOutput - The return type for the recommendProcess function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { steelGrades } from '@/lib/heat-treatment-data';

// Define schemas for the flow
const RecommendProcessInputSchema = z.object({
  steelType: z.string().describe('The type of steel being used, e.g., "4140" or "AISI 1045".'),
  requiredProperties: z.string().describe("The target hardness or mechanical properties, e.g., '58 HRC' or 'soft and machinable'"),
  partThickness: z.number().describe('The thickest section of the part in inches.'),
  process: z.string().describe('The general heat treatment process to perform, e.g., "Hardening", "Annealing".')
});

export type RecommendProcessInput = z.infer<typeof RecommendProcessInputSchema>;

const ProcessStepSchema = z.object({
    name: z.string().describe('The name of this step in the process (e.g., "Austenitize", "Quench", "Temper").'),
    temperature: z.string().describe('The temperature for this step, including units (e.g., "850°C" or "1550°F").'),
    duration: z.string().describe('The duration of this step (e.g., "2 hours" or "1 hour per inch of thickness").'),
    notes: z.string().describe('Important notes or details for this step (e.g., "Quench in agitated oil" or "Furnace cool slowly").'),
});

const GraphDataPointSchema = z.object({
    time: z.number().describe('The cumulative time in hours at this point in the cycle.'),
    temperature: z.number().describe('The temperature in Celsius at this point in the cycle.'),
    label: z.string().describe('A brief label for this point on the graph (e.g., "Start Quench").'),
});

const RecommendProcessOutputSchema = z.object({
  steps: z.array(ProcessStepSchema).describe('A list of detailed steps for the recommended heat treatment process.'),
  graphData: z.array(GraphDataPointSchema).describe('An array of data points to plot a time-temperature graph of the process.'),
});

export type RecommendProcessOutput = z.infer<typeof RecommendProcessOutputSchema>;

// Tool to get steel properties
const getSteelProperties = ai.defineTool(
    {
        name: 'getSteelProperties',
        description: 'Retrieves the chemical composition and hardenability of a specific steel grade.',
        inputSchema: z.object({ steelType: z.string() }),
        outputSchema: z.object({
            carbon: z.number(),
            alloyFactor: z.number(),
            hardenability: z.string(),
        }).optional(),
    },
    async (input) => {
        const steel = steelGrades.find(s => s.value === input.steelType);
        if (steel) {
            return {
                carbon: steel.carbon,
                alloyFactor: steel.alloyFactor,
                hardenability: steel.hardenability,
            };
        }
        return undefined;
    }
);


const recommendProcessFlow = ai.defineFlow(
  {
    name: 'recommendProcessFlow',
    inputSchema: RecommendProcessInputSchema,
    outputSchema: RecommendProcessOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a world-class metallurgical engineer specializing in heat treatment. Your task is to devise a precise, multi-step heat treatment plan and corresponding time-temperature graph data based on the user's request.

      **User Request:**
      - Steel Grade: ${input.steelType}
      - Target Properties: ${input.requiredProperties}
      - Part Thickness: ${input.partThickness} inches
      - Desired Process: ${input.process}

      **Instructions:**

      1.  **Analyze Request:** Use the 'getSteelProperties' tool to understand the material's characteristics (carbon content, alloy factor, hardenability).
      2.  **Devise Process Steps:** Create a sequence of clear, actionable steps. Each step must include a name, temperature, duration, and critical notes.
          - Base your calculations on sound metallurgical principles.
          - Factor in the steel's properties and part thickness. For example, soaking times are often dependent on thickness (e.g., 1 hour per inch).
          - Be specific (e.g., instead of just "Quench", say "Quench in agitated oil").
      3.  **Generate Graph Data:** Create a series of (time, temperature) data points that accurately represent the entire process from start to finish.
          - The graph should start and end at room temperature (25°C).
          - Include points for the start and end of each ramp, soak, and cooling phase.
          - Time should be cumulative in hours.
          - Be realistic with heating/cooling rates. A ramp from 25°C to 850°C should take time (e.g., 1.5 hours), not be instantaneous. A quench is very fast (e.g., 0.1 hours). A furnace cool is very slow (e.g., 8+ hours).
      4.  **Format Output:** Your final output must strictly adhere to the provided JSON schema for both 'steps' and 'graphData'. Ensure all fields are correctly populated.

      **Example Thought Process for Hardening 4140 Steel (1-inch thick) to 50 HRC:**
      - *Tool Call:* \`getSteelProperties({ steelType: '4140' })\` -> Returns { carbon: 0.4, alloyFactor: 1.1, hardenability: 'oil' }.
      - *Process Logic:* 4140 is an oil-hardening steel. To get 50 HRC, I need to harden and then temper. Hardening temp will be ~850°C. Soak for ~1 hr/inch. Quench in oil. Tempering temp for 50 HRC is around 425°C. Temper soak for ~2hr.
      - *Graph Logic:* Start at (0, 25). Ramp to 850°C over 1.5h -> (1.5, 850). Soak for 1h -> (2.5, 850). Quench to 60°C in 0.1h -> (2.6, 60). Then a separate tempering cycle can be shown or integrated. For this task, create one continuous graph if possible, showing a cool down, then ramp to temper temp. So, after quench at (2.6, 60), cool to room temp -> (3.6, 25). Ramp to temper temp 425°C in 1h -> (4.6, 425). Soak 2h -> (6.6, 425). Air cool to 25°C in 1h -> (7.6, 25).
      `,
      tools: [getSteelProperties],
      output: {
        schema: RecommendProcessOutputSchema,
      },
    });

    return llmResponse.output || { steps: [], graphData: [] };
  }
);

export async function recommendProcess(input: RecommendProcessInput): Promise<RecommendProcessOutput> {
  return recommendProcessFlow(input);
}
