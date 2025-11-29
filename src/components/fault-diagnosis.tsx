
'use client';

import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Wrench, Lightbulb, CheckSquare } from 'lucide-react';

type FaultDiagnosisData = {
    possibleCauses: string[];
    correctiveActions: string[];
};

type FaultDiagnosisFormState = {
  message: string;
  data?: FaultDiagnosisData | null;
  errors?: {
    symptoms?: string[];
  } | null;
};

function SuggestionResult({ data }: { data: FaultDiagnosisData | null }) {
  if (!data) {
    return null;
  }
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold tracking-tight">AI Fault Diagnosis</h3>
        <div className='grid md:grid-cols-2 gap-6'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Lightbulb className='h-6 w-6 text-amber-500' />
                        Possible Causes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='space-y-3'>
                        {data.possibleCauses.map((cause, index) => (
                            <li key={index} className='flex items-start gap-3'>
                                <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-amber-500" />
                                <span className="text-sm text-muted-foreground">{cause}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <CheckSquare className='h-6 w-6 text-green-500' />
                        Corrective Actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='space-y-3'>
                        {data.correctiveActions.map((action, index) => (
                             <li key={index} className='flex items-start gap-3'>
                                <CheckSquare className="mt-1 h-4 w-4 shrink-0 text-green-500" />
                                <span className="text-sm text-muted-foreground">{action}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

function SuggestionSkeleton() {
  return (
    <div className="space-y-4">
        <Skeleton className="h-8 w-[300px]" />
        <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
            <div className='space-y-2'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    </div>
  );
}

export function FaultDiagnosis() {
  const [state, setState] = useState<FaultDiagnosisFormState>({ message: '', data: null, errors: null });
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setState({ message: '', data: null, errors: null });
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/diagnose-fault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok) {
        setState({ message: result.message, errors: result.errors, data: null });
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message || 'An error occurred.',
        });
      } else {
        setState({ message: result.message, data: result.data, errors: null });
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setState({ message: errorMessage, data: null, errors: null });
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Wrench className="h-8 w-8 text-primary" />
          AI Fault Diagnosis
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Describe the symptoms you're observing (e.g., distortion, cracking, soft spots), and the AI will suggest possible causes and corrective actions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Describe Symptoms</CardTitle>
            <CardDescription>
              Provide a detailed description of the problem you are facing. The more detail, the better the diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="symptoms">Observed Symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., 'Parts are cracking during oil quench.', 'The surface has soft spots after hardening and tempering.', 'Severe warping on thin sections of 4140 steel.'"
                rows={5}
                required
              />
              {state.errors?.symptoms && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.symptoms[0]}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Diagnosing...
                </>
              ) : (
                'Diagnose Fault'
              )}
            </Button>
          </CardContent>
        </Card>

        {isPending && <SuggestionSkeleton />}
        <SuggestionResult data={state.data} />
      </form>
    </div>
  );
}
