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
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { brazingData } from "@/lib/heat-treatment-data";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Label as RechartsLabel } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const baseMaterials = [
    { value: "steel", label: "Carbon/Alloy Steel" },
    { value: "stainless", label: "Stainless Steel" },
    { value: "copper", label: "Copper/Copper Alloy" },
    { value: "aluminum", label: "Aluminum" },
];


const brazingPrinciples = [
    {
        title: "Capillary Action",
        description: "The fundamental principle of brazing. The filler metal is drawn into the tight-fitting gap between base materials through surface tension, similar to how a paper towel wicks up water.",
    },
    {
        title: "Filler Metals",
        description: "Alloys with a melting point below that of the base materials. They must be able to 'wet' the surfaces of the base materials to form a metallurgical bond.",
    },
    {
        title: "Flux or Atmosphere",
        description: "Brazing requires a clean, oxide-free surface. This is achieved either with a chemical flux that cleans and protects the joint, or by performing the process in a controlled atmosphere (like vacuum or inert gas).",
    },
]

const brazingTypes = [
  {
    title: "Vacuum Brazing",
    description: "A high-purity joining process that uses a filler metal (braze alloy) to join two base materials in a vacuum environment. The vacuum prevents oxidation and allows for extremely clean, strong, and hermetically sealed joints.",
    advantages: [
        "Extremely clean, high-integrity joints.",
        "No flux required, eliminating post-braze cleaning and potential flux entrapment.",
        "Uniform heating and cooling minimizes distortion.",
        "Ability to process multiple joints at once in a batch.",
        "Ideal for reactive materials (like titanium) and complex geometries.",
    ],
    icon: Shield,
    bestUseCases: [
      "Aerospace components (e.g., turbine blades, heat exchangers).",
      "Medical implants and devices.",
      "Semiconductor manufacturing equipment.",
      "High-performance automotive parts.",
    ],
  },
  {
    title: "Furnace Brazing",
    description: "A process where components with pre-placed filler metal are heated in a controlled-atmosphere furnace. The atmosphere (e.g., hydrogen, dissociated ammonia, or inert gas) prevents oxidation and allows the filler metal to wet the base materials.",
    advantages: [
        "Suitable for high-volume production.",
        "Protective atmosphere reduces the need for flux.",
        "Excellent process for joining dissimilar metals.",
        "Can be highly automated.",
    ],
    icon: Sun,
    bestUseCases: [
      "Automotive assemblies (e.g., fuel rails, torque converters).",
      "HVAC components.",
      "Mass production of steel and stainless steel assemblies.",
    ],
  },
  {
    title: "Torch Brazing",
    description: "A manual or automated process where a flame from a torch is used to heat the parts and melt the filler metal, which is typically hand-fed into the joint. A flux is required to protect the joint from oxidation and clean the surfaces.",
    advantages: [
        "Highly versatile and portable.",
        "Low initial equipment cost.",
        "Ideal for repairs, one-off jobs, and simple geometries.",
        "Operator has direct control over the heating process.",
    ],
    icon: Sun,
    bestUseCases: [
      "Plumbing and HVAC repairs.",
      "Jewelry making.",
      "Small-scale production and prototyping.",
      "Joining parts in locations that are difficult to access.",
    ],
  },
    {
    title: "Induction Brazing",
    description: "Uses electromagnetic induction to generate heat rapidly and precisely in the joint area. A high-frequency alternating current is passed through a copper coil, heating the workpiece without direct contact.",
    advantages: [
        "Extremely fast and repeatable heating cycles.",
        "Highly localized heating minimizes heat-affected zone and distortion.",
        "Energy efficient and easily automated for high-volume production.",
        "Clean process, often requiring minimal or no flux when done in controlled atmosphere.",
    ],
    icon: Zap,
    bestUseCases: [
      "Joining carbide tips to cutting tools.",
      "Automotive component assembly (e.g., motor shafts, connectors).",
      "Electrical component manufacturing.",
      "High-speed, repetitive joining tasks.",
    ],
  },
];

const fillerMetals = [
    {
        name: "Silver Alloys (BAg)",
        description: "The most versatile and widely used group. They have low melting points, excellent flow characteristics, and can join most ferrous and non-ferrous metals.",
        use: "General-purpose brazing, HVAC, electrical components, plumbing.",
    },
    {
        name: "Copper Alloys (BCu)",
        description: "Includes pure copper, copper-phosphorus, and copper-zinc alloys. Copper-phosphorus alloys are self-fluxing on copper.",
        use: "Joining copper to copper (HVAC), furnace brazing of steel.",
    },
    {
        name: "Aluminum-Silicon Alloys (BAlSi)",
        description: "Used specifically for brazing aluminum alloys. They have a melting point close to that of the aluminum base metals.",
        use: "Automotive heat exchangers (radiators, condensers), aluminum assemblies.",
    },
    {
        name: "Nickel Alloys (BNi)",
        description: "Offer excellent high-temperature strength and corrosion resistance.",
        use: "Aerospace applications, jet engine components, high-performance turbines, stainless steel brazing.",
    }
]

export function Brazing() {
  const [baseMaterial1, setBaseMaterial1] = useState("");
  const [baseMaterial2, setBaseMaterial2] = useState("");
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

    const brazingVideo = PlaceHolderImages.find(img => img.id === 'brazing-video');

  const calculateParameters = () => {
    if (!baseMaterial1 || !baseMaterial2) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both base materials.",
      });
      return;
    }

    const combination = [baseMaterial1, baseMaterial2].sort().join('-');
    const resultData = brazingData.find(d => d.combination === combination);

    if (resultData) {
        // Generate graph data
        const tempMatch = resultData.temperatureRange.match(/(\d+)-(\d+)/);
        if (tempMatch) {
            const startTemp = parseInt(tempMatch[1], 10);
            const endTemp = parseInt(tempMatch[2], 10);
            const peakTemp = (startTemp + endTemp) / 2;

            const graphData = [
                { time: 0, temperature: 25, label: "Start" },
                { time: 0.5, temperature: peakTemp, label: "Reach Brazing Temp" },
                { time: 0.7, temperature: peakTemp, label: "End Braze" },
                { time: 1.2, temperature: 25, label: "Finish" },
            ];
            setResults({ ...resultData, graphData });
        } else {
            setResults(resultData);
        }

        toast({
            title: "Success",
            description: "Brazing parameters calculated!",
        });
    } else {
        setResults(null);
        toast({
            variant: "destructive",
            title: "Not Recommended",
            description: "This material combination is not recommended for brazing with standard methods or requires special procedures.",
        });
    }
  };

  const chartConfig = {
    temperature: {
        label: "Temperature (°C)",
        color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Link className="h-8 w-8 text-primary" />
          Special Process: Brazing
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Brazing is a metal-joining process in which a filler metal is heated above its melting point and distributed between two or more close-fitting parts by capillary action. The filler metal is brought slightly above its melting (liquidus) temperature while protected by a suitable atmosphere, usually a flux.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <Info className="h-6 w-6 text-primary"/>
                Fundamental Principles
            </CardTitle>
            <CardDescription>
                Brazing relies on a few key scientific principles to create strong, permanent joints.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brazingPrinciples.map(principle => (
                <div key={principle.title}>
                    <h4 className="font-semibold">{principle.title}</h4>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
            ))}
        </CardContent>
      </Card>

      <div className="space-y-8">
       <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Calculator className="h-8 w-8 text-primary" />
          Brazing Process Calculator
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Select the two base materials you want to join to get a recommendation for the appropriate filler metal and process parameters.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Input Materials</CardTitle>
                <CardDescription>Select the two materials to be joined.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="base-material-1">Base Material 1</Label>
                    <Select value={baseMaterial1} onValueChange={setBaseMaterial1}>
                        <SelectTrigger id="base-material-1">
                            <SelectValue placeholder="Select first material" />
                        </SelectTrigger>
                        <SelectContent>
                            {baseMaterials.map((mat) => (
                                <SelectItem key={mat.value} value={mat.value}>{mat.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="base-material-2">Base Material 2</Label>
                    <Select value={baseMaterial2} onValueChange={setBaseMaterial2}>
                        <SelectTrigger id="base-material-2">
                            <SelectValue placeholder="Select second material" />
                        </SelectTrigger>
                        <SelectContent>
                            {baseMaterials.map((mat) => (
                                <SelectItem key={mat.value} value={mat.value}>{mat.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <Button onClick={calculateParameters} className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Brazing Parameters
                </Button>
            </CardContent>
        </Card>
        <div className="space-y-6">
            <Card className={results ? "border-primary" : ""}>
                <CardHeader>
                    <CardTitle>Recommended Parameters</CardTitle>
                    <CardDescription>
                        {results ? "Recommended filler and temperatures" : "Results will appear here"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {results ? (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                <Gem className="w-5 h-5 text-primary mt-1" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold mb-1">Recommended Filler Metal</p>
                                    <p className="text-lg font-bold">{results.fillerMetal}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                <Thermometer className="w-5 h-5 text-destructive mt-1" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold mb-1">Brazing Temperature Range</p>
                                    <p className="text-lg">{results.temperatureRange}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                <Info className="w-5 h-5 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold mb-1">Notes / Flux Requirement</p>
                                    <p className="text-sm">{results.notes}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Select materials and calculate to see results.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {results?.graphData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Process Graph</CardTitle>
                        <CardDescription>Visual representation of the brazing cycle.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <LineChart data={results.graphData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(value) => `${value}h`} />
                                <YAxis domain={([dataMin, dataMax]: [number, number]) => { const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax)); return [0, Math.ceil(absMax / 100) * 100]; }} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line name="Temperature" type="monotone" dataKey="temperature" stroke="var(--color-temperature)" strokeWidth={2} dot={true} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>

       <Card className="mt-8 bg-accent/5 border-accent/20">
            <CardHeader>
            <CardTitle className="text-sm">Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
            <p>
                • This calculator provides general guidelines for brazing. Parameters can vary significantly based on joint design, part thickness, heating method, and specific alloy grades.
            </p>
            <p>
                • Always consult the filler metal manufacturer's specifications and perform tests for critical applications.
            </p>
            </CardContent>
        </Card>
      </div>


      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {brazingTypes.map((process) => (
          <Card key={process.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <process.icon className="h-6 w-6 text-primary"/>
                {process.title}
              </CardTitle>
              <CardDescription>{process.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div>
                    <h4 className="mb-2 font-semibold">Advantages:</h4>
                    <ul className="space-y-3">
                        {process.advantages.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-500" />
                            <span className="text-sm text-muted-foreground">
                            {point}
                            </span>
                        </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h4 className="mb-2 font-semibold">Best Use Cases:</h4>
                    <ul className="space-y-3">
                        {process.bestUseCases.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground">
                            {point}
                            </span>
                        </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                Common Filler Metals
            </CardTitle>
            <CardDescription>
                The choice of filler metal is critical and depends on the base materials, service temperature, and required joint properties.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            {fillerMetals.map(metal => (
                <div key={metal.name} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-primary">{metal.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{metal.description}</p>
                    <p className="text-xs text-muted-foreground mt-2"><span className="font-semibold text-foreground">Common Use:</span> {metal.use}</p>
                </div>
            ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            Reference Handbooks
          </CardTitle>
          <CardDescription>Downloadable resources for in-depth study.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">Brazing Technology</span>
              <Button asChild>
                <a
                  href="https://drive.google.com/drive/folders/0Bztljn4eJTTqeFlSVmRWWE1zQkk?resourcekey=0-RJYXbdtKn3pSoY_O-LPY3w&usp=sharing"
                  target="_blank"
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">
                Vacuum Heat Treating and Brazing Course
              </span>
              <Button asChild>
                <a
                  href="https://drive.google.com/drive/folders/0Bztljn4eJTTqUTI2X3JXb0YxSDg?resourcekey=0-i4igtNcIVe3xo2IJe_xwkg&usp=sharing"
                  target="_blank"
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">Heat Treatment Handbook</span>
              <Button asChild>
                <a href="https://docs.google.com/spreadsheets/d/1YBRB3tNbAXLSPYgY2c3B-imNg1cChvnwMwP5gljns7c/edit?usp=sharing" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">A to Z Heat Treatment Terminology</span>
              <Button asChild>
                <a href="https://drive.google.com/file/d/13vPz5-G9Pvs_JCY0p_gUchCAJMoXZcsB/view?usp=sharing" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">Sample Work Instructions</span>
              <Button asChild>
                <a href="https://docs.google.com/document/d/1x4MSTxjY2XzcPPtyDPtGpP8guFYY91_I46S228eNlDg/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">Brazing Special Tools</span>
              <Button asChild>
                <a href="https://docs.google.com/spreadsheets/d/1YBRB3tNbAXLSPYgY2c3B-imNg1cChvnwMwP5gljns7c/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Calculator className="mr-2 h-4 w-4" /> Calculator
                </a>
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <Youtube className="h-6 w-6 text-primary" />
                Learn More on YouTube
            </CardTitle>
            <CardDescription>
                Watch a video to learn more about the brazing process.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <a href="https://youtu.be/KSJ9YZxWnCw" target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
               {brazingVideo ? (
                    <Image
                        src={brazingVideo.imageUrl}
                        alt={brazingVideo.description}
                        fill
                        className="object-cover"
                        data-ai-hint={brazingVideo.imageHint}
                    />
                ) : (
                    <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                        Understanding Brazing: Heat Treatment Special Process Explained!
                    </div>
                )}
            </a>
        </CardContent>
      </Card>
    </div>
  );
}
