// src/app/api/suggest-treatment/route.ts

// *************************************************************************************************
// FIXED: Next.js App Router API Route
// 1. Removed `"use server"` (not needed for server-side API routes)
// 2. Only exporting an async function (POST)
// 3. Added robust error handling and validation
// *************************************************************************************************

import { NextResponse } from 'next/server';
import { suggestHeatTreatment } from '@/ai/flows/suggest-heat-treatment-flow';
import type { SuggestHeatTreatmentInput } from '@/ai/flows/suggest-heat-treatment-flow';
import { z } from 'zod';

// Request validation schema
const RequestBodySchema = z.object({
  steelType: z.string().min(1, "Steel type is required."),
  desiredProperties: z.string().min(1, "Desired properties is required."),
});

export async function POST(req: Request) {
  let body;

  // Parse JSON
  try {
    body = await req.json();
  } catch (error) {
    console.error('Error parsing request body JSON:', error);
    return NextResponse.json(
      { message: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  // Validate request body
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

  // Call AI flow
  try {
    const aiResponse = await suggestHeatTreatment(parsed.data as SuggestHeatTreatmentInput);

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
