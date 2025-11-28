'use client';

import { useFormState, useFormStatus } from 'react-dom';
import AppHeader from '@/components/app-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { recommendHeatTreatmentParameters } from '@/ai/flows/recommend-heat-treatment-parameters';
import { Loader2, Wand2 } from 'lucide-react';

const initialState = {
  temperatureRange: '',
  soakingTime: '',
  coolingMethod: '',
  expectedResult: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Recommending...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendation
        </>
      )}
    </Button>
  );
}

export default function ParameterToolPage() {
  const [state, formAction] = useFormState(recommendHeatTreatmentParameters, initialState);

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="AI-Enhanced Parameter Tool" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          <form action={formAction}>
            <Card>
              <CardHeader>
                <CardTitle>Virtual Metallurgist</CardTitle>
                <CardDescription>
                  Describe your material and desired properties, and our AI will recommend heat treatment parameters.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="materialComposition">Material Composition</Label>
                  <Textarea
                    id="materialComposition"
                    name="materialComposition"
                    placeholder="e.g., AISI 1045 steel (0.45% C, 0.75% Mn)"
                    required
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desiredProperties">Desired Properties</Label>
                  <Textarea
                    id="desiredProperties"
                    name="desiredProperties"
                    placeholder="e.g., High hardness (55 HRC), good toughness"
                    required
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
          
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>AI Recommendation</CardTitle>
              <CardDescription>
                Optimal parameters will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state && state.temperatureRange ? (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-semibold text-card-foreground">Temperature Range</h3>
                    <p className="text-muted-foreground">{state.temperatureRange}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Soaking Time</h3>
                    <p className="text-muted-foreground">{state.soakingTime}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Cooling Method</h3>
                    <p className="text-muted-foreground">{state.coolingMethod}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Expected Result</h3>
                    <p className="text-muted-foreground">{state.expectedResult}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <p>Awaiting input...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
