
import { AppLayout } from "@/components/app-layout";
import { ManagementSystem } from "@/components/management-system";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management System - Heat Treatment Guide",
  description: "Explore the management systems, process flows, and documentation standards for heat treatment operations.",
};

export default function ManagementSystemPage() {
  return (
    <AppLayout>
      <ManagementSystem />
    </AppLayout>
  );
}

    