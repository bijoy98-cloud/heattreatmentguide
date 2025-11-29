
import { AppLayout } from "@/components/app-layout";
import { ImageAnalyzer } from "@/components/image-analyzer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Image Analyzer - Heat Treatment Guide",
    description: "Upload a micrograph to analyze phase composition and estimate hardness.",
};

export default function ImageAnalyzerPage() {
  return (
    <AppLayout>
      <ImageAnalyzer />
    </AppLayout>
  );
}
