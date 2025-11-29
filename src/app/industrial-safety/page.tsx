
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, HardHat, Eye, FireExtinguisher, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { navItems } from "@/lib/heat-treatment-data";

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

export default function IndustrialSafetyPage() {
  const industrialSafetyParent = navItems.find(item => item.href === '/industrial-safety');
  const safetyFeatures = industrialSafetyParent?.children || [];

  return (
    <AppLayout>
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-background p-8">
          <div className="relative z-10 space-y-6">
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
          </div>
          <div className="absolute inset-0 z-0 bg-grid-slate-100/[0.03] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </section>

        {safetyFeatures.length > 0 && (
          <section>
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              Explore Our Safety Tools
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {safetyFeatures.map((feature) => (
                <Link key={feature.href} href={feature.href} className="block h-full">
                  <Card className="group h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-grow">
                        <CardTitle className="text-xl">{feature.label}</CardTitle>
                        <CardDescription className="mt-2 text-justify">
                          {feature.description || `Explore ${feature.label.toLowerCase()} and expand your knowledge.`}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

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
      </div>
    </AppLayout>
  );
}
