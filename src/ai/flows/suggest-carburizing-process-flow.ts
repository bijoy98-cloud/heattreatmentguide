
'use server';
/**
 * @fileOverview An AI flow that recommends a full carburizing process.
 *
 * - suggestCarburizingProcess - A function that handles the recommendation process.
 * - SuggestCarburizingProcessInput - The input type for the suggestCarburizingProcess function.
 * - SuggestCarburizingProcessOutput - The return type for the suggestCarburizingProcess function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { steelGrades } from '@/lib/heat-treatment-data';


const SuggestCarburizingProcessInputSchema = z.object({
  steelType: z.string().describe('The type of steel being used, e.g., "8620".'),
  desiredSurfaceHardness: z.string().describe("The target surface hardness, e.g., '60-62 HRC'."),
  desiredCoreHardness: z.string().optional().describe("The target core hardness, e.g., '300-350 HB'."),
  desiredCaseDepth: z.number().describe('The target effective case depth in mm.'),
  partThickness: z.number().describe('The thickest section of the part in mm.'),
});
export type SuggestCarburizingProcessInput = z.infer<typeof SuggestCarburizingProcessInputSchema>;


const GraphDataPointSchema = z.object({
    time: z.number().describe('The cumulative time in hours at this point in the cycle.'),
    temperature: z.number().describe('The temperature in Celsius at this point in the cycle.'),
    label: z.string().describe('A brief label for this point on the graph (e.g., "Start Quench").'),
});

const SuggestCarburizingProcessOutputSchema = z.object({
    carburizingTemperature: z.string().describe('The recommended temperature for the carburizing phase (e.g., "925°C").'),
    soakingTime: z.string().describe('The recommended soaking time at the carburizing temperature to achieve the desired case depth (e.g., "5.5 hours").'),
    quenchingTemperature: z.string().describe('The recommended temperature from which to quench the part (e.g., "840°C").'),
    processNotes: z.array(z.string()).describe('A list of important notes and considerations for the full process, including tempering recommendations.'),
    graphData: z.array(GraphDataPointSchema).describe('An array of data points to plot a time-temperature graph of the process.'),
});
export type SuggestCarburizingProcessOutput = z.infer<typeof SuggestCarburizingProcessOutputSchema>;

// Tool to get steel properties
const getCarburizingSteelProperties = ai.defineTool(
    {
        name: 'getCarburizingSteelProperties',
        description: 'Retrieves the chemical composition and carburizing factor of a specific steel grade suitable for carburizing.',
        inputSchema: z.object({ steelType: z.string() }),
        outputSchema: z.object({
            carbon: z.number(),
            alloyFactor: z.number(),
            carburizingFactor: z.number(),
        }).optional(),
    },
    async (input) => {
        const steel = steelGrades.find(s => s.value === input.steelType);
        if (steel && steel.carburizingFactor) {
            return {
                carbon: steel.carbon,
                alloyFactor: steel.alloyFactor,
                carburizingFactor: steel.carburizingFactor,
            };
        }
        return undefined;
    }
);

const suggestCarburizingProcessFlow = ai.defineFlow(
  {
    name: 'suggestCarburizingProcessFlow',
    inputSchema: SuggestCarburizingProcessInputSchema,
    outputSchema: SuggestCarburizingProcessOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a world-class metallurgical engineer specializing in carburizing. Your task is to devise a precise carburizing cycle based on the user's requirements.

      **User Request:**
      - Steel Grade: ${input.steelType}
      - Target Surface Hardness: ${input.desiredSurfaceHardness}
      - Target Core Hardness: ${input.desiredCoreHardness || 'Not specified'}
      - Target Effective Case Depth: ${input.desiredCaseDepth} mm
      - Part Thickness: ${input.partThickness} mm

      **Instructions:**

      1.  **Analyze Material:** Use the 'getCarburizingSteelProperties' tool to get the steel's properties.
      2.  **Determine Parameters:**
          -   **Preheating:** Always include a preheating step at 650°C.
          -   **Carburizing Temperature:** Usually around 925°C, but can be adjusted. State the chosen temperature.
          -   **Soaking Time:** Calculate the required soaking time. A common formula is Time (hr) = (Case Depth (mm) / K)^2, where K is a factor (approx 0.5 for gas carburizing at 925°C). Adjust this time based on the steel's carburizing factor.
          -   **Quenching Temperature:** Decide whether to quench directly from carburizing temp or to use a lower temperature (e.g., 840°C) to refine the grain structure. State the chosen temperature.
      3.  **Provide Process Notes:** Create a list of essential notes. This MUST include:
          - A recommendation for the quenching medium (e.g., "Quench in fast oil").
          - A recommendation for a post-quench cold treatment if applicable (e.g., "Follow with sub-zero treatment at -75°C for 2 hours to minimize retained austenite").
          - A specific tempering temperature and duration to achieve the target surface hardness (e.g., "Temper at 150-200°C for 2 hours").
          - A note about controlling carbon potential in the furnace atmosphere.
      4.  **Generate Graph Data:** Create a realistic time-temperature graph for the *entire* cycle (Ramp to Preheat -> Preheat Soak -> Ramp to Carburize -> Carburizing Soak -> Cool to Quench Temp -> Quench).
          - The graph must start at room temperature (25°C).
          - Include points for each phase: ramp up to preheat, preheat soak, ramp to carburize, carburizing soak, cooling to quench temp (if applicable), and the quench itself.
          - Be realistic with ramps. A ramp from 25°C to 650°C takes time (e.g., 1.5 hours), as does the ramp from 650°C to 925°C (e.g., 1 hour). A quench is very fast (e.g., 0.1 hours).

      Your final output must strictly adhere to the JSON schema.
      `,
      model: ai.getModel('googleai/gemini-2.5-flash'),
      tools: [getCarburizingSteelProperties],
      output: {
        schema: SuggestCarburizingProcessOutputSchema,
      },
    });

    return llmResponse.output || { carburizingTemperature: '', soakingTime: '', quenchingTemperature: '', processNotes: [], graphData: [] };
  }
);


export async function suggestCarburizingProcess(input: SuggestCarburizingProcessInput): Promise<SuggestCarburizingProcessOutput> {
  return suggestCarburizingProcessFlow(input);
}
