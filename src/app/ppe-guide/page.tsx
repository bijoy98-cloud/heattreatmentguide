
'use client';
import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Glasses, HardHat, Shield } from "lucide-react";

const ppeItems = [
  {
    category: "Eye and Face Protection",
    icon: Glasses,
    items: [
      { name: "Safety Glasses with Side Shields", usage: "General workshop use, minimum requirement.", standard: "ANSI Z87.1" },
      { name: "Goggles", usage: "Protection from chemical splashes and dust.", standard: "ANSI Z87.1" },
      { name: "Face Shield", usage: "Worn over safety glasses during quenching, grinding, or handling molten materials.", standard: "ANSI Z87.1" },
    ],
  },
  {
    category: "Hand Protection",
    icon: HardHat,
    items: [
      { name: "Heat-Resistant Gloves (e.g., Kevlar, Aluminized)", usage: "Handling hot parts, loading/unloading furnaces.", standard: "EN 407" },
      { name: "Cut-Resistant Gloves", usage: "Handling sharp parts or materials.", standard: "ANSI/ISEA 105" },
      { name: "Chemical-Resistant Gloves (e.g., Nitrile, Neoprene)", usage: "Handling quench oils, solvents, or cleaning chemicals.", standard: "EN 374" },
    ],
  },
  {
    category: "Body Protection",
    icon: Shield,
    items: [
      { name: "Flame-Retardant (FR) Clothing", usage: "Daily wear in a heat treatment environment.", standard: "NFPA 2112" },
      { name: "Aluminized Jacket/Apron/Suit", usage: "High-heat applications, working near open furnaces, handling molten salt or metal.", standard: "EN 11612" },
      { name: "Leather Apron/Jacket", usage: "Provides protection from sparks and moderate heat.", standard: "N/A" },
    ],
  },
];

export default function PPEGuidePage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Glasses className="h-8 w-8 text-primary" />
            Personal Protective Equipment (PPE) Guide
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
            An interactive guide to the essential Personal Protective Equipment for heat treatment facilities, including types, uses, and safety standards.
          </p>
        </div>

        <div className="space-y-6">
          {ppeItems.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><category.icon className="h-6 w-6" /> {category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-4">
                       <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Usage:</span> {item.usage}
                          </p>
                           <p className="text-xs text-muted-foreground/80">
                              <span className="font-medium">Standard:</span> {item.standard}
                          </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
