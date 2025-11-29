
import { AppLayout } from "@/components/app-layout";
import { Sparkles } from "lucide-react";

export default function SuggestionPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Sparkles className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">AI Material Suggestion</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
        <p className="text-muted-foreground">The AI-powered material and heat treatment suggestion tool will be implemented here.</p>
      </div>
    </AppLayout>
  );
}
