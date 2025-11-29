
import { AppLayout } from "@/components/app-layout";
import { ProcessExplanations } from "@/components/process-explanations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process Explanations - Heat Treatment Guide",
  description: "Detailed explanations of common and advanced heat treatment processes, including steps and descriptions.",
};

export default function ProcessesPage() {
  return (
    <AppLayout>
      <ProcessExplanations />
    </AppLayout>
  );
}
