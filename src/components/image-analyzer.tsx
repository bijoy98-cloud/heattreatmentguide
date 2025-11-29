
'use client';

import { useState, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, ScanSearch, Upload, Info, Percent, Gauge } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';

type AnalysisData = {
  phaseComposition: {
      martensite: number;
      ferrite: number;
      pearlite: number;
      bainite: number;
      austenite: number;
      carbides: number;
  };
  estimatedHardness: string;
  analysisSummary: string;
};

type AnalysisFormState = {
  message: string;
  data?: AnalysisData | null;
  errors?: {
    photoDataUri?: string[];
  } | null;
};

function SuggestionResult({ data }: { data: AnalysisData }) {
    const chartData = Object.entries(data.phaseComposition)
        .filter(([, value]) => value > 0)
        .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value, fill: `var(--color-${name})` }));

    const chartConfig = Object.fromEntries(
        Object.keys(data.phaseComposition).map((key, index) => [key, { label: key.charAt(0).toUpperCase() + key.slice(1), color: `hsl(var(--chart-${index + 1}))` }])
    );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold tracking-tight">AI Analysis Results</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><Percent className='h-5 w-5' />Phase Composition</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row items-center gap-6'>
                <div className="w-full md:w-1/2 h-[250px]">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        </PieChart>
                    </ChartContainer>
                </div>
                 <div className="w-full md:w-1/2 space-y-2">
                    <ul className='space-y-2'>
                        {chartData.map(entry => (
                             <li key={entry.name} className='flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md'>
                                <span className='flex items-center gap-2'>
                                    <div className='h-2 w-2 rounded-full' style={{backgroundColor: entry.fill}}></div>
                                    {entry.name}
                                </span>
                                <span className='font-semibold'>{entry.value}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><Gauge className='h-5 w-5' />Estimated Hardness</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-3xl font-bold text-primary'>{data.estimatedHardness}</p>
            </CardContent>
        </Card>
      </div>
      <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><Info className='h-5 w-5'/>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground'>{data.analysisSummary}</p>
            </CardContent>
        </Card>
    </div>
  );
}

function SuggestionSkeleton() {
  return (
    <div className="space-y-4">
        <Skeleton className="h-8 w-[300px]" />
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2 space-y-2'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
            <div className='space-y-2'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
         <Skeleton className="h-24 w-full" />
    </div>
  );
}

export function ImageAnalyzer() {
  const [state, setState] = useState<AnalysisFormState>({ message: '', data: null, errors: null });
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const hiddenDataUriInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (hiddenDataUriInput.current) {
          hiddenDataUriInput.current.value = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hiddenDataUriInput.current?.value) {
      setState({ message: 'Please upload an image.', errors: { photoDataUri: ['Please upload an image.'] }, data: null });
      toast({ variant: 'destructive', title: 'Error', description: 'Please upload an image.' });
      return;
    }
    
    setIsPending(true);
    setState({ message: '', data: null, errors: null });

    const body = {
      photoDataUri: hiddenDataUriInput.current.value,
    };

    try {
      const response = await fetch('/api/analyze-microstructure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
      const errorMessage = "An unexpected error occurred during analysis. Please try again later.";
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
          <ScanSearch className="h-8 w-8 text-primary" />
          AI Image Analyzer
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Upload a micrograph of a steel sample. The AI will analyze its microstructure, predict the phase composition, and estimate the hardness.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Microstructure Image</CardTitle>
            <CardDescription>
              Select a clear image file (PNG, JPG) of a polished and etched steel microstructure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid gap-2">
                <Label htmlFor="microstructure-image">Micrograph File</Label>
                <Input
                    id="microstructure-image"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className='cursor-pointer'
                    required
                />
                <input type="hidden" name="photoDataUri" ref={hiddenDataUriInput} />
                {state.errors?.photoDataUri && (
                    <p className="text-sm font-medium text-destructive">
                    {state.errors.photoDataUri[0]}
                    </p>
                )}
            </div>

            {preview && (
              <div className='space-y-2'>
                <Label>Image Preview</Label>
                <div className='relative w-full max-w-sm h-64 rounded-md border overflow-hidden'>
                    <Image src={preview} alt="Microstructure preview" layout='fill' objectFit='contain' />
                </div>
              </div>
            )}
            
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Image'
              )}
            </Button>
          </CardContent>
        </Card>

        {isPending && <SuggestionSkeleton />}
        {state.data && <SuggestionResult data={state.data} />}
      </form>
    </div>
  );
}
