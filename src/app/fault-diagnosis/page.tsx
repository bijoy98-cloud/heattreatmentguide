
import { AppLayout } from "@/components/app-layout";
import { Wrench } from "lucide-react";

export default function FaultDiagnosisPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Wrench className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">AI Fault Diagnosis</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
        <p className="text-muted-foreground">The AI tool to diagnose heat treatment faults will be implemented here.</p>
      </div>
    </AppLayout>
  );
}
