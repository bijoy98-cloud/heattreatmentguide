import { AppLayout } from "@/components/app-layout";
import { IndustrialTools } from "@/components/industrial-tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industrial Tools & References - Heat Treatment Guide",
    description: "A suite of utilities for heat treatment professionals, including temperature converters, thermocouple guides, and troubleshooting tips.",
};

export default function IndustrialToolsPage() {
  return (
    <AppLayout>
        <IndustrialTools />
    </AppLayout>
  );
}
