
import { AppLayout } from "@/components/app-layout";
import { HardnessBasedCalculator } from "@/components/hardness-based-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Hardness Calculator - Heat Treatment Guide",
  description: "An AI-powered calculator to determine heat treatment processes based on desired hardness and material.",
};

export default function HardnessCalculatorPage() {
  return (
    <AppLayout>
      <HardnessBasedCalculator />
    </AppLayout>
  );
}
