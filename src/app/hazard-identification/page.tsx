
import { AppLayout } from "@/components/app-layout";
import { HazardIdTool } from "@/components/hazard-id-tool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hazard Identification Tool - Heat Treatment Guide",
  description: "An interactive checklist to identify and mitigate potential hazards in heat treatment operations.",
};

export default function HazardIdentificationPage() {
  return (
    <AppLayout>
        <HazardIdTool />
    </AppLayout>
  );
}
