"use client";

import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Sprout, Thermometer, Timer, Sparkles, AlertTriangle, Lightbulb } from "lucide-react";

type FormState = {
  message: string;
  data?: {
    heatTreatment: string;
    temperatureRange: string;
    duration: string;
  } | null;
  errors?: {
    steelType?: string[];
    desiredProperties?: string[];
  } | null;
};

function SuggestionResult({
  data,
}: {
  data: {
    heatTreatment: string;
    temperatureRange: string;
    duration: string;
  };
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold tracking-tight text-primary">
        AI Generated Suggestion
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Heat Treatment
            </CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.heatTreatment}</div>
            <p className="text-xs text-muted-foreground">Recommended process</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.temperatureRange}</div>
            <p className="text-xs text-muted-foreground">Target temperature range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.duration}</div>
             <p className="text-xs text-muted-foreground">Recommended soaking time</p>
          </CardContent>
        </Card>
      </div>
       <Card className="mt-6 bg-accent/50 border-accent/20">
            <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Disclaimer
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
            <p>
                This AI-generated suggestion is for informational purposes only. Always verify parameters against material datasheets and industry standards for critical applications.
            </p>
            </CardContent>
        </Card>
    </div>
  );
}

function SuggestionSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-[300px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-4 w-[120px] mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
       <Skeleton className="h-24 w-full" />
    </div>
  );
}

export function MaterialSuggestion() {
  const [state, setState] = useState<FormState>({ message: "", data: null, errors: null });
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setState({ message: '', data: null, errors: null });
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/suggest-treatment', {
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
          <Sparkles className="h-8 w-8 text-primary" />
          AI Material Suggestion
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Describe your steel and the desired outcome to receive an AI-powered
          heat treatment suggestion. The more detail you provide, the better
          the recommendation.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>
                Provide the details of your steel and what you want to achieve.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="steelType">1. Steel Grade</Label>
                <Input
                  id="steelType"
                  name="steelType"
                  placeholder="e.g., A2 Tool Steel, 1095 High Carbon"
                  required
                />
                {state.errors?.steelType && (
                  <p className="text-sm font-medium text-destructive">
                    {state.errors.steelType[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desiredProperties">
                  2. Desired Mechanical Properties
                </Label>
                <Textarea
                  id="desiredProperties"
                  name="desiredProperties"
                  placeholder="e.g., High hardness for wear resistance, increased ductility for forming..."
                  rows={4}
                  required
                />
                {state.errors?.desiredProperties && (
                  <p className="text-sm font-medium text-destructive">
                    {state.errors.desiredProperties[0]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          <Button type="submit" disabled={isPending} size="lg" className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Suggestion
                </>
            )}
          </Button>
        </form>

        <div className="space-y-6">
            {isPending ? (
                <SuggestionSkeleton />
            ) : state.data ? (
                <SuggestionResult data={state.data} />
            ) : (
                <Card className="flex h-full flex-col items-center justify-center p-8 border-dashed">
                    <div className="text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                            <Lightbulb className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Your AI suggestions will appear here.</h3>
                        <p className="mt-2 text-muted-foreground">
                            Fill out the form to the left to get started. Provide as much detail as possible for the best results.
                        </p>
                    </div>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
