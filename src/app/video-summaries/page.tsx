'use client';

import { useFormState, useFormStatus } from 'react-dom';
import AppHeader from '@/components/app-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateVideoSummary } from '@/ai/flows/generate-video-summary';
import { Loader2, Sparkles, FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';

const initialState = {
  summary: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Summarizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

export default function VideoSummaryPage() {
  const [state, formAction] = useFormState(generateVideoSummary, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.summary) {
      formRef.current?.reset();
    }
  }, [state.summary]);

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Video Summarizer" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generate a Video Summary</CardTitle>
              <CardDescription>
                Paste a YouTube video URL to get a concise summary of its content. (Note: May not work with all videos due to access restrictions).
              </CardDescription>
            </CardHeader>
            <form action={formAction} ref={formRef}>
              <CardContent>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>

          {state && state.summary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Video Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-stone dark:prose-invert max-w-none text-base text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {state.summary}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
