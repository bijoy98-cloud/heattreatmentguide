
import { AppLayout } from "@/components/app-layout";
import { IndustrialSafety } from "@/components/industrial-safety";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Safety - Heat Treatment Guide",
  description: "Guidelines and best practices for ensuring safety in heat treatment environments.",
};

export default function IndustrialSafetyPage() {
  return (
    <AppLayout>
      <IndustrialSafety />
    </AppLayout>
  );
}
