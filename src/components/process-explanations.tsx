
'use client';

import { processesInfo } from "@/lib/heat-treatment-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "./ui/card";
import { BookOpen } from "lucide-react";

export function ProcessExplanations() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          Process Explanations
        </h1>
        <p className="text-muted-foreground max-w-3xl text-justify">
          Detailed guides on common steel heat treatment processes. Each step is
          critical for achieving the desired material properties.
        </p>
      </div>
      <Card>
        <Accordion type="single" collapsible className="w-full">
          {processesInfo.map((process) => (
            <AccordionItem
              value={process.id}
              key={process.id}
              className="px-6"
            >
              <AccordionTrigger className="py-6 text-lg hover:no-underline text-left">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <process.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span>{process.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-14">
                <p className="mb-4 text-base text-muted-foreground text-justify">
                  {process.description}
                </p>
                <div className="space-y-4 border-l-2 border-primary pl-6">
                  {process.steps.map((step, index) => (
                    <div key={index} className="relative">
                       <div className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-muted-foreground text-justify">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
