
import { NextResponse } from 'next/server';
import { analyzeMicrostructure } from '@/ai/flows/analyze-microstructure-flow';
import type { AnalyzeMicrostructureInput } from '@/ai/flows/analyze-microstructure-flow';
import { z } from 'zod';

const RequestBodySchema = z.object({
    photoDataUri: z.string().min(1, "Image data is required."),
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
    const aiResponse = await analyzeMicrostructure(parsed.data as AnalyzeMicrostructureInput);
    
    if (!aiResponse || !aiResponse.phaseComposition) {
      return NextResponse.json(
        { message: 'AI failed to generate a valid analysis. Please try a different image.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Success', data: aiResponse });

  } catch (error) {
    console.error('AI Image Analysis Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { message: `An error occurred while generating the analysis: ${errorMessage}` },
      { status: 500 }
    );
  }
}
