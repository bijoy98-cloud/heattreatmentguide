
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Link,
  Shield,
  Sun,
  Zap,
  Info,
  Youtube,
  BookOpen,
  Download,
  Calculator,
  Gem,
  Thermometer,
  Layers,
  Component,
  FileText,
  Factory,
  Settings,
  Clock,
  Gauge,
  Wind,
  Wrench,
  Cog,
  Star,
  Flame,
  Atom,
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/app-layout";

const processPrinciples = [
    {
        title: "Ionized Gas (Plasma)",
        description: "The process is conducted under a vacuum. A nitrogen-containing gas mixture is introduced, and a high voltage is applied between the workpiece (cathode) and the furnace wall (anode), creating a glow discharge plasma.",
    },
    {
        title: "Ion Bombardment & Sputtering",
        description: "Nitrogen ions from the plasma bombard the part's surface. This does two things: it cleans the surface by sputtering off contaminants and provides localized heating.",
    },
    {
        title: "Nitrogen Diffusion",
        description: "The bombardment and heating create an active surface that readily absorbs nitrogen, which then diffuses into the material to form a hard, wear-resistant nitride layer (the 'case').",
    },
];

const processAdvantages = [
    "Lower processing temperatures (400-580°C) minimize distortion compared to other case hardening methods.",
    "Excellent control over the case structure, including the formation of a 'compound layer' and diffusion zone.",
    "Can be used on a wide variety of steels, including stainless steels without depassivation.",
    "Environmentally friendly process with no toxic byproducts like cyanide salts.",
    "Improved wear resistance, fatigue strength, and corrosion resistance.",
];

const furnaceDetails = {
    title: "Typical Plasma Nitriding Furnace",
    description: "Plasma nitriding is performed in a specialized vacuum furnace designed to handle high voltages and controlled gas atmospheres.",
    components: [
        { name: "Vacuum Chamber", details: "A robust, sealed vessel that can be pumped down to a vacuum." },
        { name: "Power Supply", details: "A high-voltage DC power supply to create and sustain the plasma." },
        { name
: "Gas Control System", details: "Mass flow controllers for precise mixing of nitrogen, hydrogen, and other process gases." },
        { name: "Temperature Control", details: "Uses thermocouples and the plasma's heating effect to maintain a uniform temperature." },
        { name: "Workpiece Fixturing", details: "Parts are electrically isolated and act as the cathode in the electrical circuit." },
    ]
};

const keyParameters = [
    {
        icon: Wind,
        title: "Gas Composition",
        description: "The mixture of nitrogen (N₂) and hydrogen (H₂) is critical. Hydrogen helps to clean the surface through sputtering and controls the nitriding potential. Methane (CH₄) can be added for plasma nitrocarburizing."
    },
    {
        icon: Thermometer,
        title: "Temperature",
        description: "Typically 400-580°C. Temperature controls the diffusion rate of nitrogen and influences the final case depth and hardness. Higher temperatures lead to deeper cases but may result in lower hardness."
    },
    {
        icon: Clock,
        title: "Time",
        description: "Process times can range from a few hours to 100+ hours. Time is the primary factor determining the case depth; the relationship is parabolic (depth ∝ √time)."
    },
    {
        icon: Gauge,
        title: "Pressure",
        description: "The vacuum level (typically 0.5-10 mbar) affects the plasma's characteristics and uniformity. It must be carefully controlled to ensure stable glow discharge."
    },
];

const suitableMaterials = {
    title: "Suitable Materials for Nitriding",
    description: "Nitriding is effective on a wide range of ferrous materials, especially those containing nitride-forming elements.",
    categories: [
        {
            name: "Nitriding Steels",
            examples: "e.g., Nitralloy 135, 41CrAlMo7. These are specifically designed for nitriding, containing strong nitride-formers like Aluminum, Chromium, and Molybdenum for very high surface hardness.",
        },
        {
            name: "Tool Steels",
            examples: "e.g., H13, D2, M2. Hot-work, cold-work, and high-speed steels benefit greatly, gaining surface hardness for wear resistance while maintaining core toughness.",
        },
        {
            name: "Stainless Steels",
            examples: "e.g., 410, 17-4 PH, 316. Plasma nitriding can harden the surface without significantly compromising corrosion resistance, a major advantage over other methods.",
        },
        {
            name: "Low Alloy Steels",
            examples: "e.g., 4140, 4340. Steels with Cr, Mo, and V show a good nitriding response, achieving significant increases in surface hardness and fatigue life.",
        },
    ]
};

const applications = {
    title: "Typical Applications",
    description: "Due to its ability to impart high surface hardness with minimal distortion, nitriding is used for critical components across many industries.",
    items: [
        { icon: Cog, name: "Gears and Pinions" },
        { icon: Wrench, name: "Crankshafts and Camshafts" },
        { icon: Star, name: "Plastic Injection Molds and Extrusion Dies" },
        { icon: Wrench, name: "Valves, Spindles, and Hydraulic Components" },
        { icon: Cog, name: "Forging Dies and Stamping Tools" },
    ]
}


export default function PlasmaNitridingPage() {
  const [material, setMaterial] = useState("");
  const [temperature, setTemperature] = useState("500");
  const [time, setTime] = useState("10");
  const [results, setResults] = useState<{ caseDepth: string } | null>(null);
  const { toast } = useToast();

  const calculateCaseDepth = () => {
    if (!material || !temperature || !time) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    const tempC = parseFloat(temperature);
    const timeH = parseFloat(time);
    
    // Simplified parabolic law: depth = K * sqrt(time)
    // K depends on temperature and material. This is a rough estimation.
    let kFactor = 0.04; // Default for low-alloy
    if (material === 'nitriding-steel') kFactor = 0.05; // Higher factor for dedicated nitriding steels
    if (material === 'tool-steel') kFactor = 0.035;
    if (material === 'stainless') kFactor = 0.03;

    const kTempAdjusted = kFactor * Math.pow(1.01, tempC - 500);

    const caseDepth = kTempAdjusted * Math.sqrt(timeH);

    setResults({ caseDepth: caseDepth.toFixed(3) });

    toast({
      title: "Success",
      description: "Case depth estimated!",
    });
  };

  const plasmaNitridingVideo = PlaceHolderImages.find(img => img.id === 'plasma-nitriding-intro');

  return (
    <AppLayout>
      <div className="space-y-12">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Component className="h-8 w-8 text-primary" />
            Nitriding Processes
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Nitriding is a thermochemical case hardening process used to increase surface hardness, wear resistance, and fatigue life. Here we explore the two main types: Plasma and Gas Nitriding.
          </p>
        </div>

        <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Calculator className="h-8 w-8 text-primary" />
            Nitriding Process Calculator
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Estimate the approximate case depth based on material, temperature, and time. This is an estimation; actual results depend on precise material chemistry and process parameters.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
              <CardHeader>
                  <CardTitle>Input Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="material-type">Material Type</Label>
                      <Select value={material} onValueChange={setMaterial}>
                          <SelectTrigger id="material-type">
                              <SelectValue placeholder="Select material type" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="low-alloy">Low Alloy Steel (e.g., 4140, 4340)</SelectItem>
                              <SelectItem value="nitriding-steel">Nitriding Steel (e.g., Nitralloy 135)</SelectItem>
                              <SelectItem value="tool-steel">Tool Steel (e.g., H13, D2)</SelectItem>
                              <SelectItem value="stainless">Stainless Steel (e.g., 410, 17-4 PH)</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="temperature">Process Temperature (°C)</Label>
                      <Input id="temperature" type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="e.g., 500" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="time">Process Time (hours)</Label>
                      <Input id="time" type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 24" />
                  </div>
                  <Button onClick={calculateCaseDepth} className="w-full" size="lg">
                      <Calculator className="mr-2 h-4 w-4" />
                      Estimate Case Depth
                  </Button>
              </CardContent>
          </Card>

          <Card className={results ? "border-primary" : ""}>
              <CardHeader>
                  <CardTitle>Estimated Results</CardTitle>
                  <CardDescription>
                      {results ? "Calculated case depth" : "Results will appear here"}
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  {results ? (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                          <Layers className="w-5 h-5 text-primary mt-1" />
                          <div className="flex-1">
                              <p className="text-sm font-semibold mb-1">Estimated Case Depth (mm)</p>
                              <p className="text-2xl font-bold">{results.caseDepth} mm</p>
                          </div>
                      </div>
                  ) : (
                      <div className="text-center py-12 text-muted-foreground">
                          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Select parameters and calculate to see results.</p>
                      </div>
                  )}
              </CardContent>
          </Card>
        </div>
      </div>


        <div className="space-y-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-primary">
                  <Zap className="h-7 w-7" />
                  Plasma (Ion) Nitriding
              </h3>
            <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Info className="h-6 w-6 text-primary"/>
                          Fundamental Principles of Plasma Nitriding
                      </CardTitle>
                      <CardDescription>
                          Plasma nitriding uses ionized gas in a vacuum to achieve surface hardening.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {processPrinciples.map(principle => (
                          <div key={principle.title}>
                              <h4 className="font-semibold">{principle.title}</h4>
                              <p className="text-sm text-muted-foreground">{principle.description}</p>
                          </div>
                      ))}
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">Advantages of Plasma Nitriding</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-3">
                          {processAdvantages.map((advantage, index) => (
                          <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-500" />
                              <span className="text-sm text-muted-foreground">
                              {advantage}
                              </span>
                          </li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>
          </div>

          <div className="space-y-8 pt-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-primary">
                  <Flame className="h-7 w-7" />
                  Gas Nitriding
              </h3>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Info className="h-6 w-6 text-primary"/>
                          Fundamental Principles of Gas Nitriding
                      </CardTitle>
                      <CardDescription>
                          Gas nitriding uses dissociated ammonia in a conventional furnace to achieve surface hardening.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 sm:grid-cols-2">
                      <div>
                          <h4 className="font-semibold">Ammonia Atmosphere</h4>
                          <p className="text-sm text-muted-foreground">Parts are heated in a sealed furnace filled with ammonia gas (NH₃).</p>
                      </div>
                      <div>
                          <h4 className="font-semibold">Thermal Dissociation</h4>
                          <p className="text-sm text-muted-foreground">At the process temperature (typically 500-550°C), the ammonia breaks down on the steel surface into nascent (atomic) nitrogen and hydrogen.</p>
                      </div>
                      <div>
                          <h4 className="font-semibold">Nitrogen Diffusion</h4>
                          <p className="text-sm text-muted-foreground">The highly reactive atomic nitrogen is absorbed by the steel and diffuses into the surface to form the hard nitride layer.</p>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">Key Parameters & Advantages</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-8">
                      <div>
                          <h4 className="font-semibold mb-3">Key Process Parameters</h4>
                          <ul className="space-y-3">
                              <li className="flex items-start gap-3"><Thermometer className="h-5 w-5 shrink-0 mt-1"/><div><span className="font-medium">Temperature:</span> Typically 500-550°C.</div></li>
                              <li className="flex items-start gap-3"><Clock className="h-5 w-5 shrink-0 mt-1"/><div><span className="font-medium">Time:</span> Long cycles, often 24-96 hours, depending on required case depth.</div></li>
                              <li className="flex items-start gap-3"><Wind className="h-5 w-5 shrink-0 mt-1"/><div><span className="font-medium">Ammonia Dissociation:</span> The percentage of NH₃ that breaks down is monitored to control nitriding potential.</div></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-3">Advantages</h4>
                          <ul className="space-y-3">
                              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>Good for large batches of small to medium-sized parts.</span></li>
                              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>Uses conventional furnace equipment (no vacuum or high voltage).</span></li>
                              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>A well-understood and widely available process.</span></li>
                          </ul>
                      </div>
                  </CardContent>
              </Card>
          </div>

          <div className="space-y-8 pt-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-primary">
                  <Atom className="h-7 w-7" />
                  Ferritic Nitrocarburizing (FNC)
              </h3>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Info className="h-6 w-6 text-primary"/>
                          Fundamental Principles of FNC
                      </CardTitle>
                      <CardDescription>
                          FNC is a sub-critical process that diffuses both nitrogen and carbon into the surface for improved wear and corrosion resistance with very low distortion.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 sm:grid-cols-2">
                      <div>
                          <h4 className="font-semibold">Sub-critical Temperature</h4>
                          <p className="text-sm text-muted-foreground">The process is performed below the lower critical temperature (around 570°C), meaning the base material remains in its ferritic state.</p>
                      </div>
                      <div>
                          <h4 className="font-semibold">Gas or Salt Bath Medium</h4>
                          <p className="text-sm text-muted-foreground">Can be performed in a controlled gas atmosphere (with ammonia and a carbon-source gas) or in a molten salt bath containing nitrogen and carbon compounds.</p>
                      </div>
                      <div>
                          <h4 className="font-semibold">Compound Layer Formation</h4>
                          <p className="text-sm text-muted-foreground">Forms a thin, dense, and highly lubricious compound layer (epsilon iron nitride) on the surface, which is extremely wear-resistant.</p>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">Key Advantages of FNC</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-3">
                          <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>Excellent scuffing, wear, and corrosion resistance.</span></li>
                          <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>Very low distortion due to sub-critical process temperature.</span></li>
                          <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>Applicable to a wide range of carbon and low-alloy steels.</span></li>
                          <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-1"/><span>Relatively short process time compared to conventional nitriding.</span></li>
                      </ul>
                  </CardContent>
              </Card>
          </div>
        
      
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-3">
                  <Layers className="h-6 w-6 text-primary" />
                  The Nitrided Layer
              </CardTitle>
              <CardDescription>The nitrided case consists of two distinct zones: the compound layer and the diffusion zone.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                  <h4 className="font-semibold">Compound Layer (White Layer)</h4>
                  <p className="text-sm text-muted-foreground">The outermost layer, consisting of iron nitrides (ε-Fe₂₋₃N and γ'-Fe₄N). It is very hard and provides excellent wear and corrosion resistance. Its thickness and phase can be controlled by process parameters.</p>
              </div>
              <div>
                  <h4 className="font-semibold">Diffusion Zone</h4>
                  <p className="text-sm text-muted-foreground">Beneath the compound layer, this zone contains dissolved nitrogen and fine nitride precipitates within the original steel matrix. It provides a gradual hardness transition to the core, which significantly improves fatigue strength.</p>
              </div>
          </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-primary" />
                  Key Process Parameters
              </CardTitle>
              <CardDescription>The final properties of the nitrided case are determined by four main parameters.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
              {keyParameters.map((param) => (
                  <div key={param.title} className="flex items-start gap-4">
                      <param.icon className="h-6 w-6 text-primary mt-1 shrink-0" />
                      <div>
                          <h4 className="font-semibold">{param.title}</h4>
                          <p className="text-sm text-muted-foreground">{param.description}</p>
                      </div>
                  </div>
              ))}
          </CardContent>
      </Card>


      <Card>
          <CardHeader>
              <CardTitle>{suitableMaterials.title}</CardTitle>
              <CardDescription>{suitableMaterials.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
              {suitableMaterials.categories.map((cat) => (
                  <div key={cat.name} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{cat.name}</h4>
                      <p className="text-sm text-muted-foreground">{cat.examples}</p>
                  </div>
              ))}
          </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>{applications.title}</CardTitle>
              <CardDescription>{applications.description}</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {applications.items.map((app) => (
                      <div key={app.name} className="flex flex-col items-center text-center gap-2 p-4 bg-muted/50 rounded-lg">
                          <app.icon className="h-8 w-8 text-primary" />
                          <p className="text-sm font-medium">{app.name}</p>
                      </div>
                  ))}
              </div>
          </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                      <Factory className="h-6 w-6 text-primary" />
                      {furnaceDetails.title}
                  </CardTitle>
                  <CardDescription>{furnaceDetails.description}</CardDescription>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3">
                      {furnaceDetails.components.map(comp => (
                          <li key={comp.name} className="flex items-start gap-3">
                              <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                  <span className="font-semibold text-sm">{comp.name}:</span>
                                  <span className="text-sm text-muted-foreground ml-1">{comp.details}</span>
                              </div>
                          </li>
                      ))}
                  </ul>
              </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      Work Instructions & Documentation
                  </CardTitle>
                  <CardDescription>Download sample templates for process control.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Button asChild className="w-full justify-start">
                      <a href="https://docs.google.com/document/d/1x4MSTxjY2XzcPPtyDPtGpP8guFYY91_I46S228eNlDg/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" /> Sample Work Instruction (WI)
                      </a>
                  </Button>
              </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-3">
                  <Youtube className="h-6 w-6 text-primary" />
                  Learn More on YouTube
              </CardTitle>
              <CardDescription>
                  Watch a video to learn more about the plasma nitriding process.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <a href="https://youtu.be/zyxB5YzYTgQ" target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                {plasmaNitridingVideo ? (
                      <Image
                          src={plasmaNitridingVideo.imageUrl}
                          alt={plasmaNitridingVideo.description}
                          fill
                          className="object-cover"
                          data-ai-hint={plasmaNitridingVideo.imageHint}
                      />
                  ) : (
                      <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                          Introduction to Plasma Nitriding
                      </div>
                  )}
              </a>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
