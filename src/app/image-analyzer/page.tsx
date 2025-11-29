
import { AppLayout } from "@/components/app-layout";
import { Scan } from "lucide-react";

export default function ImageAnalyzerPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Scan className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">AI Image Analyzer</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
        <p className="text-muted-foreground">The tool for analyzing microstructures and defects from images will be implemented here.</p>
      </div>
    </AppLayout>
  );
}
