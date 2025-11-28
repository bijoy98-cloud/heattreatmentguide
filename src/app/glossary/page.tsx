
import { AppLayout } from "@/components/app-layout";
import { GlossaryList } from "@/components/glossary-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary of Terms - Heat Treatment Guide",
  description: "A searchable glossary of common terms and definitions used in metallurgy and heat treatment.",
};


export default function GlossaryPage() {
  return (
    <AppLayout>
      <GlossaryList />
    </AppLayout>
  );
}
