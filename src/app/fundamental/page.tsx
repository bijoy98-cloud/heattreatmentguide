
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Atom, Zap, CircleDot, Shield, Thermometer, Hammer, Snowflake, Wind } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AppLayout } from "@/components/app-layout";

const topics = [
  {
    id: "laser-welding",
    title: "Laser Welding",
    icon: Zap,
    imageId: "laser-welding",
    description: "A high-energy beam welding process used to join metallic materials. A laser beam provides a concentrated heat source, allowing for narrow, deep welds and high welding rates. The process is often used in high-volume automated applications.",
    points: [
        "High precision with a small heat-affected zone (HAZ), minimizing distortion.",
        "Ability to weld dissimilar materials.",
        "Suitable for high-speed, automated production.",
        "Can weld thin materials with minimal warping."
    ]
  },
  {
    id: "powder-metallurgy",
    title: "Powder Metallurgy",
    icon: CircleDot,
    imageId: "powder-metallurgy",
    description: "A metal-forming process performed by heating compacted metal powders to just below their melting points. This process allows for the creation of complex parts to near-net shape, reducing the need for machining.",
    points: [
        "Excellent for mass production of complex, small parts.",
        "Reduces material waste compared to subtractive manufacturing.",
        "Allows for the creation of unique alloys and composites.",
        "Porosity can be controlled for applications like self-lubricating bearings."
    ]
  },
  {
    id: "starlite-coating",
    title: "Starlite Coating",
    icon: Shield,
    imageId: "starlite-coating",
    description: "Starlite was a claimed intumescent material invented by amateur chemist Maurice Ward. It was purported to withstand and insulate from extreme heat, but its composition was never revealed and it has never been commercially produced.",
    points: [
        "Claimed to withstand temperatures of up to 10,000°C.",
        "The material was said to char, creating a highly insulating ceramic foam.",
        "Its composition remains a mystery, though it is thought to be a complex polymer/copolymer with additives.",
        "Despite interest from major aerospace and technology firms, no commercial agreement was ever reached."
    ]
  },
  {
    id: "tin-coating",
    title: "Titanium Nitride (TiN) Coating",
    icon: Shield,
    imageId: "tin-coating",
    description: "A hard, ceramic material applied as a thin coating to alloy components to improve their surface properties. Applied via Physical Vapor Deposition (PVD), it imparts high hardness and wear resistance.",
    points: [
        "Distinctive gold color.",
        "Very high hardness (over 2000 HV), providing excellent wear and abrasion resistance.",
        "Chemically inert and reduces friction, preventing material from sticking to the tool (galling).",
        "Commonly used on cutting tools like drill bits and end mills, as well as on medical implants and decorative items."
    ]
  },
  {
    id: "shrink-fitting",
    title: "Shrink Fitting (Interference Fit)",
    icon: Thermometer,
    imageId: "shrink-fitting",
    description: "A technique in which thermal expansion/contraction is used to create a strong joint between two parts. One part is heated or cooled, changing its size, so it can be assembled with another part. When it returns to ambient temperature, the interference holds the parts together.",
    points: [
        "Creates a very strong, semi-permanent joint.",
        "Commonly used to mount gears or bearings onto shafts.",
        "Heating the outer part (e.g., a gear) causes it to expand, allowing it to be slipped over the inner part (e.g., a shaft).",
        "Alternatively, cooling the inner part (e.g., with liquid nitrogen) causes it to shrink so it can be inserted into the outer part."
    ]
  },
   {
    id: "hot-working",
    title: "Hot Working",
    icon: Hammer,
    imageId: "hot-working",
    description: "The process of plastically deforming a metal at a temperature above its recrystallization temperature. This allows for large shape changes and simultaneously refines the grain structure, improving toughness.",
    points: [
        "Allows for significant changes in shape with lower force requirements.",
        "Refines the grain structure of the metal, eliminating porosity from casting.",
        "Improves ductility and toughness.",
        "Common methods include hot rolling and forging."
    ]
  },
  {
    id: "cold-working",
    title: "Cold Working",
    icon: Snowflake,
    imageId: "cold-working",
    description: "The plastic deformation of a metal at a temperature below its recrystallization temperature. This process increases strength and hardness through strain hardening, but reduces ductility.",
    points: [
        "Increases tensile strength and hardness.",
        "Provides a superior surface finish and tighter dimensional control.",
        "Reduces ductility, making the material more brittle.",
        "Common methods include cold rolling, drawing, and extrusion."
    ]
  },
  {
    id: "hydrogen-annealing",
    title: "Hydrogen Annealing",
    icon: Wind,
    imageId: "hydrogen-annealing",
    description: "A specialized high-temperature process performed in a pure, dry hydrogen atmosphere. It's used in aerospace and electronics to clean, brighten, and stress-relieve critical metal components without oxidation.",
    points: [
        "Hydrogen acts as a powerful reducing agent, removing surface oxides for an exceptionally clean, 'bright' finish.",
        "Prevents oxidation on sensitive alloys like stainless steels and nickel-based superalloys.",
        "Used for stress-relieving components after forming or machining.",
        "The process must be carefully controlled to avoid hydrogen embrittlement in certain materials."
    ]
  }
];

export default function FundamentalPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Atom className="h-8 w-8 text-primary" />
            Fundamental Processes &amp; Applications
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
            Explore fundamental industrial processes and applications, from joining and forming to specialized surface treatments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {topics.map((topic) => {
            const image = topic.imageId ? PlaceHolderImages.find(img => img.id === topic.imageId) : undefined;
            return (
            <Card key={topic.id} className="flex flex-col">
              <CardHeader>
                <div className="flex flex-col md:flex-row items-start gap-4">
                    {image && (
                      <div className="w-full md:w-1/3 aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden relative shrink-0">
                          <Image
                              src={image.imageUrl}
                              alt={image.description}
                              width={600}
                              height={400}
                              className="object-cover w-full h-full"
                              data-ai-hint={image.imageHint}
                          />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                          <topic.icon className="h-6 w-6 text-primary" />
                          {topic.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-justify">{topic.description}</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                  <h4 className="font-semibold mb-3 text-sm">Key Points:</h4>
                  <ul className="space-y-3">
                      {topic.points.map((point, index) => (
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
          )})}
        </div>
      </div>
    </AppLayout>
  );
}
