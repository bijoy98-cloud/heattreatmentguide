
import { AppLayout } from "@/components/app-layout";
import { MessageSquare } from "lucide-react";

export default function AskGeminiPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">Live AI Chat</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
        <p className="text-muted-foreground">The AI-powered chat assistant will be implemented here.</p>
      </div>
    </AppLayout>
  );
}
