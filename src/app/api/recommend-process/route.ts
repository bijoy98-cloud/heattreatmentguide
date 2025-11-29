import { NextResponse } from 'next/server';
import { recommendProcess, RecommendProcessInput } from '@/ai/flows/recommend-process-flow';
import { z } from 'zod';

const RequestBodySchema = z.object({
    steelType: z.string().min(1, "Steel type is required."),
    requiredProperties: z.string().min(1, "Required properties are required."),
    partThickness: z.number().positive("Part thickness must be a positive number."),
    process: z.string().min(1, "Process is required."),
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
    const aiResponse = await recommendProcess(parsed.data);
    
    if (!aiResponse || !aiResponse.steps || aiResponse.steps.length === 0) {
      return NextResponse.json(
        { message: 'AI failed to generate a valid process. Please adjust your inputs.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Success', data: aiResponse });

  } catch (error) {
    console.error('AI Process Recommendation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { message: `An error occurred while generating the recommendation: ${errorMessage}` },
      { status: 500 }
    );
  }
}

    