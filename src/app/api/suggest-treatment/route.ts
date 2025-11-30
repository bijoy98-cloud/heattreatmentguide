// src/app/api/suggest-treatment/route.ts

// *************************************************************************************************
// CRITICAL FIX: ENSURE THESE TWO POINTS ARE ADDRESSED:
// 1. DELETE THIS LINE IF IT'S PRESENT: "use server";
//    (Next.js App Router API Routes like this one are server-side by default and do NOT need it.)
// 2. ENSURE THERE ARE NO OTHER `export` STATEMENTS IN THIS FILE THAT ARE NOT `async function`s.
//    (e.g., remove `export const runtime = 'edge';`, `export const dynamic = 'force-dynamic';`, etc.,
//     if they are present AND you also have "use server"; somewhere, or if they are causing issues.)
// *************************************************************************************************

import { NextResponse } from 'next/server';
import { suggestHeatTreatment } from '@/ai/flows/suggest-heat-treatment-flow';
import type { SuggestHeatTreatmentInput } from '@/ai/flows/suggest-heat-treatment-flow';
import { z } from 'zod';

const RequestBodySchema = z.object({
    steelType: z.string().min(1, "Steel type is required."),
    desiredProperties: z.string().min(1, "Desired properties is required."),
});

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
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
    
    if (!aiResponse || typeof aiResponse.heatTreatment !== 'string' || aiResponse.heatTreatment.trim() === '') {
      console.error('AI generated an invalid or empty heatTreatment:', aiResponse);
      return NextResponse.json(
        { message: 'AI failed to generate a valid suggestion. Please adjust your inputs.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Success', data: aiResponse });

  } catch (error) {
    console.error('AI Suggestion Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { message: `An error occurred while generating the suggestion: ${errorMessage}` },
      { status: 500 }
    );
    
  }
}
