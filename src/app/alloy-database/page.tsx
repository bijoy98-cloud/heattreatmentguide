
import { AppLayout } from "@/components/app-layout";
import { AlloyDatabase } from "@/components/alloy-database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alloy Database - Heat Treatment Guide",
  description: "A searchable database of metallurgical alloys and their properties.",
};

export default function AlloyDatabasePage() {
  return (
    <AppLayout>
      <AlloyDatabase />
    </AppLayout>
  );
}
