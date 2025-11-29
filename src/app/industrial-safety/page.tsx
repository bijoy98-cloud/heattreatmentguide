
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ShieldAlert, Glasses, ListChecks, ShieldCheck, HardHat, Shield } from "lucide-react";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";

const safetyTopics = [
  {
    title: "Furnace and Equipment Safety",
    description: "Furnaces operate at extreme temperatures and require strict safety protocols to prevent burns, electrical shock, and other serious injuries.",
    points: [
      "Never operate a furnace without proper training.",
      "Always check that ventilation and exhaust systems are fully operational before starting a furnace.",
      "Ensure all safety interlocks and emergency stops are functional.",
      "Keep the area around furnaces clear of flammable materials.",
      "Be aware of hot surfaces even after the furnace is turned off. Use caution and thermal gloves.",
    ],
  },
  {
    title: "Hazardous Material Handling",
    description: "Heat treatment involves various chemicals and materials that can be hazardous if not handled correctly. This includes quench oils, salts, and cleaning solvents.",
    points: [
      "Consult the Safety Data Sheet (SDS) for any chemical before use.",
      "Ensure proper ventilation when working with solvents or oil quenchants to avoid inhaling fumes.",
      "Have spill containment kits readily available, especially near quench tanks.",
      "Molten salt baths are extremely dangerous; use specialized tools and full-body PPE.",
      "Properly label and store all chemicals in designated areas.",
    ],
  },
  {
    title: "Emergency Procedures",
    description: "Knowing how to react in an emergency can prevent a minor incident from becoming a major catastrophe. Regular training is key.",
    points: [
      "Locate and know how to use fire extinguishers, especially Class B (for oil fires) and Class C (for electrical fires).",
      "Identify the locations of emergency eyewash stations and safety showers.",
      "Establish clear evacuation routes and assembly points.",
      "Have a designated first aid provider and a well-stocked first aid kit.",
      "In case of a major fire or incident, evacuate immediately and call emergency services.",
    ],
  },
  {
    title: "General Workshop Safety",
    description: "Fundamental practices for maintaining a safe environment beyond the immediate heat treatment area.",
    points: [
      "Ensure all machinery guards are in place and functional.",
      "Keep walkways and work areas clear of clutter and trip hazards.",
      "Practice proper lifting techniques to prevent back injuries. Use lifting aids for heavy loads.",
      "Report any equipment malfunctions or safety hazards to a supervisor immediately.",
      "Maintain good housekeeping. Clean up spills promptly.",
    ],
  },
];

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


const newSafetyFeatures = [
    {
        title: "Hazard Identification Tool",
        description: "A checklist-based tool to identify and mitigate hazards related to furnaces, quenching, and chemicals.",
        icon: ListChecks,
        href: "/hazard-identification",
    },
];

const complianceItems = [
    {
        standard: "AMS 2750",
        title: "Pyrometry",
        description: "Governs temperature sensors, instrumentation, furnace temperature uniformity surveys (TUS), and system accuracy tests (SAT) for aerospace heat treatment.",
        features: [
            "TUS/SAT date tracking and reminders.",
            "Log templates for calibration and uniformity surveys.",
            "Quick reference for thermocouple types and calibration schedules.",
        ]
    },
    {
        standard: "CQI-9",
        title: "AIAG Heat Treat System Assessment",
        description: "An automotive industry standard providing a self-assessment for heat treatment systems to ensure control and continuous improvement.",
        features: [
            "Digital checklist for CQI-9 process tables.",
            "Job audit question repository.",
            "Reminders for annual assessment due dates.",
        ]
    },
    {
        standard: "ISO 9001",
        title: "Quality Management Systems",
        description: "A foundational standard for quality management. Key principles include customer focus, process approach, and continual improvement.",
        features: [
            "Document control references for SOPs and work instructions.",
            "Corrective and preventive action (CAPA) log templates.",
            "Internal audit schedule reminders.",
        ]
    },
     {
        standard: "OSHA",
        title: "Occupational Safety and Health",
        description: "Regulations focused on ensuring a safe and healthful working environment. Covers hazard communication, PPE, and machine guarding.",
        features: [
            "PPE requirement checklists.",
            "Hazard identification guides for heat treat environments.",
            "Links to key OSHA standards (e.g., Lockout/Tagout, Hazard Communication).",
        ]
    },
]

export default function IndustrialSafetyPage() {
  return (
    <AppLayout>
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <ShieldAlert className="h-8 w-8 text-primary" />
          Industrial Safety
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Safety is paramount in any heat treatment facility. Adhering to these guidelines helps prevent accidents and ensures a safe working environment.
        </p>
      </div>

       <div className="space-y-4 pt-8">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Glasses className="h-7 w-7"/>
          Personal Protective Equipment (PPE)
        </h3>
        <p className="text-muted-foreground text-justify">
          Proper PPE is the first line of defense against workplace hazards. Always wear the appropriate gear for the task at hand.
        </p>
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
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 pt-8">
        {safetyTopics.map((system) => (
          <Card key={system.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{system.title}</CardTitle>
              <CardDescription>{system.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {system.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="space-y-4 pt-8">
        <h3 className="text-2xl font-bold tracking-tight">
          Safety Tools
        </h3>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {newSafetyFeatures.map((feature) => (
            <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <Link href={feature.href}>
                        <div className="text-sm text-center font-semibold p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-full flex items-center justify-center">
                            Go to {feature.title}
                        </div>
                    </Link>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <ShieldCheck className="h-7 w-7" />
          Regulatory Compliance Tracker
        </h3>
        <p className="text-muted-foreground text-justify">
          Keep track of key requirements for major industry standards like AMS 2750, CQI-9, ISO 9001, and OSHA.
        </p>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {complianceItems.map((item) => (
            <Card key={item.standard} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{item.standard}</span>
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{item.title}</span>
                    </CardTitle>
                    <CardDescription className="pt-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2 text-sm">App Features (Coming Soon)</h4>
                <ul className="space-y-2">
                    {item.features.map(feature => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 shrink-0 mt-1 text-primary/70"/>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>

    </div>
    </AppLayout>
  );
}
