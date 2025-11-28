
import { AppLayout } from "@/components/app-layout";
import { HTCalculator } from "@/components/ht-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process Parameter Calculator - Heat Treatment Guide",
  description: "Calculate heat treatment parameters using a rule-based calculator.",
};

export default function CalculatorPage() {
  return (
    <AppLayout>
      <HTCalculator />
    </AppLayout>
  );
}
