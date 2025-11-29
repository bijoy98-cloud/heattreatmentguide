import { NextResponse } from 'next/server';
import { suggestHeatTreatment, SuggestHeatTreatmentInput } from '@/ai/flows/suggest-heat-treatment-flow';
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
    
    if (!aiResponse || !aiResponse.heatTreatment) {
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
