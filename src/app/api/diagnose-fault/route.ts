
import { NextResponse } from 'next/server';
import { diagnoseFault, DiagnoseFaultInput } from '@/ai/flows/diagnose-fault-flow';
import { z } from 'zod';

const RequestBodySchema = z.object({
    symptoms: z.string().min(1, "Symptoms are required."),
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
    const aiResponse = await diagnoseFault(parsed.data);
    
    if (!aiResponse || !aiResponse.possibleCauses || aiResponse.possibleCauses.length === 0) {
      return NextResponse.json(
        { message: 'AI failed to generate a valid diagnosis. Please adjust your inputs.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Success', data: aiResponse });

  } catch (error) {
    console.error('AI Fault Diagnosis Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { message: `An error occurred while generating the diagnosis: ${errorMessage}` },
      { status: 500 }
    );
  }
}
