
// src/app/api/suggest-treatment/route.ts (or .js)
// IMPORTANT: Make sure there is NO "use server"; at the top of this file
// if this is intended as a standard Next.js App Router API route.

import { NextResponse } from 'next/server';
import { suggestHeatTreatment } from '@/ai/flows/suggest-heat-treatment-flow';
import type { SuggestHeatTreatmentInput } from '@/ai/flows/suggest-heat-treatment-flow';
import { z } from 'zod';

const RequestBodySchema = z.object({
    steelType: z.string().min(1, "Steel type is required."),
    desiredProperties: z.string().min(1, "Desired properties are required."),
});

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    // Log the actual error for debugging, but return a generic message to the client
    console.error('Error parsing request body JSON:', error);
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = RequestBodySchema.safeParse(body);

  if (!parsed.success) {
      return NextResponse.json(
          { 
              message: 'Invalid request body.',
              errors: parsed.error.flatten().fieldErrors,
          }, 
          { status: 400 }
      );
  }
  
  try {
    const aiResponse = await suggestHeatTreatment(parsed.data);
    
    // Ensure aiResponse and heatTreatment are valid before proceeding
    if (!aiResponse || typeof aiResponse.heatTreatment !== 'string' || aiResponse.heatTreatment.trim() === '') {
      // You might want to log the AI response for debugging in the server logs
      console.error('AI generated an invalid or empty heatTreatment:', aiResponse);
      return NextResponse.json(
        { message: 'AI failed to generate a valid suggestion. Please adjust your inputs.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Success', data: aiResponse });

  } catch (error) {
    console.error('AI Suggestion Error:', error); // Keep detailed error for server logs
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { message: `An error occurred while generating the suggestion: ${errorMessage}` },
      { status: 500 }
    );
    
  }
}
