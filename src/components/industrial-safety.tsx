
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, HardHat, Eye, FireExtinguisher, ListChecks } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const safetyPrinciples = [
    {
        icon: HardHat,
        title: "Personal Protective Equipment (PPE)",
        description: "Always wear appropriate PPE, including safety glasses, heat-resistant gloves, and protective clothing when working near furnaces or handling hot parts."
    },
    {
        icon: Eye,
        title: "Situational Awareness",
        description: "Be aware of your surroundings at all times. Know the location of emergency stops, fire extinguishers, and first-aid kits."
    },
    {
        icon: FireExtinguisher,
        title: "Fire Prevention",
        description: "Keep flammable materials away from heat sources. Understand the different types of fires (e.g., oil, electrical) and the correct extinguisher to use for each."
    }
];

export function IndustrialSafety() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center gap-4">
            <ShieldAlert className="w-12 h-12 text-primary" />
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Industrial Safety</h1>
                <p className="text-lg text-muted-foreground mt-1 text-justify">
                    Best practices for a secure heat treatment environment.
                </p>
            </div>
        </div>
        <p className="text-muted-foreground max-w-4xl text-justify">
            Safety is the most critical aspect of any heat treatment operation. Working with high temperatures, heavy equipment, and hazardous materials requires a commitment to safety from everyone in the facility. This section provides guidelines and tools to help maintain a safe and productive workplace.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Core Safety Principles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyPrinciples.map((principle) => (
                <Card key={principle.title}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <principle.icon className="w-8 h-8 text-primary" />
                        <CardTitle>{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-justify">{principle.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section>
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <ListChecks className="w-6 h-6"/>
                    Hazard Identification Tool
                </CardTitle>
                <CardDescription className="text-justify">
                    Use our interactive tool to perform routine safety checks and identify potential hazards in your workspace before they become problems.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/hazard-identification">
                        Launch Hazard ID Tool
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
