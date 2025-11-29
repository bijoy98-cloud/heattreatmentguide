
import { AppLayout } from "@/components/app-layout";
import { Carburizing } from "@/components/carburizing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carburizing Process - Heat Treatment Guide",
  description: "An in-depth guide to the steel carburizing process, including an AI-powered parameter generator.",
};

export default function CarburizingPage() {
  return (
    <AppLayout>
      <Carburizing />
    </AppLayout>
  );
}
