
import { AppLayout } from "@/components/app-layout";
import { QualityAssurance } from "@/components/quality-assurance";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Assurance - Heat Treatment Guide",
  description: "Learn about Quality Assurance in heat treatment, including testing, analysis, and compliance.",
};

export default function QualityAssurancePage() {
  return (
    <AppLayout>
      <QualityAssurance />
    </AppLayout>
  );
}
