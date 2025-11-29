
'use client';

import { useState } from "react";
import { processesInfo } from "@/lib/heat-treatment-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { BookOpen, CheckCircle } from "lucide-react";

export function ProcessExplanations() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProcesses = processesInfo.filter(
    (process) =>
      process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          Process Explanations
        </h1>
        <p className="text-muted-foreground max-w-3xl text-justify">
          Explore detailed information on a wide range of heat treatment processes. Use the search bar to filter by name or description.
        </p>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search processes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProcesses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcesses.map((process) => (
            <Card key={process.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <process.icon className="w-6 h-6 text-primary" />
                  {process.name}
                </CardTitle>
                <CardDescription className="text-justify pt-2">{process.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="steps">
                    <AccordionTrigger>View Process Steps</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4 pt-2">
                        {process.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">{step.title}</h4>
                                <p className="text-muted-foreground text-sm text-justify">{step.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8">
          No processes found for "{searchTerm}".
        </p>
      )}
    </div>
  );
}
