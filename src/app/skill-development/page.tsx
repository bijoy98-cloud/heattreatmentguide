
import { AppLayout } from "@/components/app-layout";
import { SkillDevelopment } from "@/components/skill-development";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Development - Heat Treatment Guide",
  description: "Curated video tutorials and resources for mastering heat treatment.",
};

export default function SkillDevelopmentPage() {
  return (
    <AppLayout>
      <SkillDevelopment />
    </AppLayout>
  );
}
