
import { AppLayout } from "@/components/app-layout";
import { HardnessConverter } from "@/components/hardness-converter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardness Converter - Heat Treatment Guide",
  description: "Convert hardness values between Rockwell (HRC), Vickers (HV), and Brinell (HBW).",
};

export default function HardnessConverterPage() {
  return (
    <AppLayout>
      <HardnessConverter />
    </AppLayout>
  );
}
