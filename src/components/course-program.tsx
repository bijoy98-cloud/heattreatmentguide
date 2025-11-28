
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

const courseStructure = {
  beginner: [
    "Introduction to Ferrous Metallurgy & Heat Treatment",
    "Principles of Iron-Carbon Phase Diagram",
    "Basic Heat Treatment Processes: Annealing, Normalizing",
    "Introduction to Quenching & Tempering",
    "Safety in Heat Treatment Operations",
  ],
  intermediate: [
    "Hardenability: Jominy End-Quench Test & Its Importance",
    "TTT and CCT Diagrams: Understanding Transformations",
    "Surface Hardening: Carburizing, Nitriding, Carbonitriding",
    "Advanced Quenching Techniques & Quenchants",
    "Common Heat Treatment Defects and How to Avoid Them",
  ],
  advanced: [
    "Advanced Metallurgy: Tool Steels, Stainless Steels, Superalloys",
    "Furnace Atmospheres & Vacuum Heat Treating",
    "Pyrometry: AMS 2750 Standards & Practices",
    "CQI-9 Heat Treat System Assessment Overview",
    "Process Control, Quality Assurance & Troubleshooting",
  ],
};

export function CourseProgram() {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-3xl font-bold tracking-tight">Structured Course Program</h2>
        <p className="mt-2 text-muted-foreground">
            A comprehensive 45-day course designed for all skill levels, from beginners to advanced professionals.
        </p>
       </div>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Beginner Level (Days 1-15)</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 p-2">
              {courseStructure.beginner.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Intermediate Level (Days 16-30)</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 p-2">
              {courseStructure.intermediate.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl">Advanced Level (Days 31-45)</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 p-2">
              {courseStructure.advanced.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-destructive mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
