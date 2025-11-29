
"use client";
import { useState, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Info,
  Thermometer,
  Layers,
  Wind,
  Timer,
  Box,
  Droplets,
  AlertTriangle,
  Shield,
  Loader2,
  Bot,
  Feather,
  Youtube,
} from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { steelGrades } from "@/lib/heat-treatment-data";
import { Skeleton } from "./ui/skeleton";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Label as RechartsLabel,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { suggestCarburizingProcess } from "@/ai/flows/suggest-carburizing-process-flow";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const carburizingAlloys = steelGrades.filter((s) => s.carburizingFactor);

const principles = [
  {
    title: "Carbon Diffusion",
    description:
      "The core principle. Low-carbon steel is heated to an austenitic temperature (typically 900-950°C) in a carbon-rich environment. At this temperature, carbon atoms from the atmosphere diffuse into the steel's surface.",
  },
  {
    title: "Creating a Case",
    description:
      "The diffusion process creates a high-carbon surface layer, or 'case'. The depth of this case is controlled by time and temperature.",
  },
  {
    title: "Hardening the Case",
    description:
      "After diffusion, the part is quenched. The high-carbon case transforms into hard martensite, while the low-carbon core remains softer and tougher.",
  },
];

const carburizingTypes = [
  {
    icon: Wind,
    title: "Gas Carburizing",
    description:
      "The most common and precise method. Parts are heated in a sealed furnace with a controlled atmosphere of endothermic gas and a hydrocarbon gas (like natural gas or propane) to provide carbon.",
    advantages: [
      "Precise control over case depth and surface carbon.",
      "Suitable for high-volume production.",
      "Clean process, often integrated with quenching.",
    ],
  },
  {
    icon: Box,
    title: "Pack Carburizing",
    description:
      "The traditional method. Parts are packed in a steel box with a solid carbon-rich compound (e.g., charcoal mixed with an energizer like barium carbonate) and heated for a long period.",
    advantages: [
      "Simple, requires no special atmosphere furnace.",
      "Good for large parts or small batch sizes.",
      "Protects parts from scaling.",
    ],
  },
  {
    icon: Droplets,
    title: "Liquid (Salt Bath) Carburizing",
    description:
      "Parts are immersed in a molten salt bath containing cyanide compounds. This process is very fast but involves highly toxic materials.",
    advantages: [
      "Very fast heating and carbon diffusion rates.",
      "Uniform heating minimizes distortion.",
      "Provides both carbon and some nitrogen (carbonitriding effect).",
    ],
  },
  {
    icon: Shield,
    title: "Vacuum (Low-Pressure) Carburizing",
    description:
      "A modern, clean method where parts are heated in a vacuum and then exposed to pulses of a hydrocarbon gas (like acetylene or propane) at low pressure. The vacuum ensures a perfectly clean surface for rapid carbon absorption.",
    advantages: [
      "Excellent uniformity and control over case depth.",
      "No intergranular oxidation (IGO), leading to better fatigue properties.",
      "Highly repeatable results.",
      "Can be combined with high-pressure gas quenching for minimal distortion.",
    ],
  },
];

type GraphDataPoint = {
  time: number;
  temperature: number;
  label: string;
};

type AIResultData = {
  carburizingTemperature: string;
  soakingTime: string;
  quenchingTemperature: string;
  processNotes: string[];
  graphData: GraphDataPoint[];
};

type AIFormState = {
  message: string;
  data?: AIResultData | null;
  errors?: {
    steelType?: string[];
    desiredSurfaceHardness?: string[];
    desiredCoreHardness?: string[];
    desiredCaseDepth?: string[];
    partThickness?: string[];
  } | null;
};

function AIResult({ data }: { data: AIResultData }) {
  const chartConfig = {
    temperature: {
      label: "Temperature (°C)",
      color: "hsl(var(--primary))",
    },
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" /> AI Recommended Process
          </CardTitle>
          <CardDescription>
            Based on your requirements, here is the suggested carburizing
            cycle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Thermometer className="h-4 w-4" />
                Carburizing Temp
              </p>
              <p className="text-lg font-semibold">
                {data.carburizingTemperature}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Timer className="h-4 w-4" />
                Soaking Time
              </p>
              <p className="text-lg font-semibold">{data.soakingTime}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Thermometer className="h-4 w-4 text-blue-500" />
                Quench Temp
              </p>
              <p className="text-lg font-semibold">
                {data.quenchingTemperature}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Process Notes
            </h4>
            <ul className="space-y-2">
              {data.processNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      {data.graphData && data.graphData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Process Graph</CardTitle>
            <CardDescription>
              Visual representation of the full cycle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                data={data.graphData}
                margin={{ top: 5, right: 20, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(value) => `${value}h`}
                >
                  <RechartsLabel
                    value="Time (hours)"
                    offset={-15}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis
                  domain={([dataMin, dataMax]: [number, number]) => {
                    const absMax = Math.max(
                      Math.abs(dataMin),
                      Math.abs(dataMax)
                    );
                    return [0, Math.ceil(absMax / 100) * 100];
                  }}
                >
                  <RechartsLabel
                    value="Temp (°C)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  name="Temperature"
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--color-temperature)"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AISkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export function Carburizing() {
  const [state, setState] = useState<AIFormState>({
    message: "",
    data: null,
    errors: null,
  });
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setState({ message: "", data: null, errors: null });

    const formData = new FormData(event.currentTarget);
    
    const input = {
      steelType: formData.get('steelType') as string,
      desiredSurfaceHardness: formData.get('desiredSurfaceHardness') as string,
      desiredCoreHardness: formData.get('desiredCoreHardness') as string,
      desiredCaseDepth: parseFloat(formData.get('desiredCaseDepth') as string),
      partThickness: parseFloat(formData.get('partThickness') as string),
    };

    try {
        const result = await suggestCarburizingProcess(input);
        setState({ message: "Success", data: result, errors: null });
        toast({
            title: "Success",
            description: "Carburizing process generated!",
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "An unexpected error occurred.";
        setState({ message: errorMessage, data: null, errors: null });
        toast({
            variant: "destructive",
            title: "Error",
            description: errorMessage,
        });
    } finally {
        setIsPending(false);
    }
};

  const decarburizationVideo = PlaceHolderImages.find(img => img.id === 'decarburization-vs-carburization');


  return (
    <div className="space-y-12">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Layers className="h-8 w-8 text-primary" />
          Carburising Process
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Carburizing (or Carburising) is a case-hardening process that
          diffuses carbon into the surface of low-carbon steels to create a
          hard, wear-resistant outer layer (case) while maintaining a softer,
          tougher core.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Info className="h-6 w-6 text-primary" />
            Fundamental Principles
          </CardTitle>
          <CardDescription>
            Carburizing works by enriching the surface of steel with carbon at
            high temperatures.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h4 className="font-semibold">{principle.title}</h4>
              <p className="text-sm text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Bot className="h-8 w-8 text-primary" />
            AI Carburizing Process Generator
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Define your desired outcomes for case depth and hardness, and the AI
            will recommend the process parameters to achieve them.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Desired Outcomes</CardTitle>
              <CardDescription>
                Enter your target values to get a process recommendation.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="steelType">Carburizing Alloy</Label>
                  <Select name="steelType" required>
                    <SelectTrigger id="steelType">
                      <SelectValue placeholder="Select alloy" />
                    </SelectTrigger>
                    <SelectContent>
                      {carburizingAlloys.map((grade) => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.errors?.steelType && (
                    <p className="text-sm text-destructive">
                      {state.errors.steelType[0]}
                    </p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="desiredSurfaceHardness">
                      Target Surface Hardness (HRC)
                    </Label>
                    <Input
                      id="desiredSurfaceHardness"
                      name="desiredSurfaceHardness"
                      placeholder="e.g., 60-62"
                      required
                    />
                    {state.errors?.desiredSurfaceHardness && (
                      <p className="text-sm text-destructive">
                        {state.errors.desiredSurfaceHardness[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desiredCoreHardness">
                      Target Core Hardness (HB)
                    </Label>
                    <Input
                      id="desiredCoreHardness"
                      name="desiredCoreHardness"
                      placeholder="e.g., 300-350"
                    />
                    {state.errors?.desiredCoreHardness && (
                      <p className="text-sm text-destructive">
                        {state.errors.desiredCoreHardness[0]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="desiredCaseDepth">
                      Target Effective Case Depth (mm)
                    </Label>
                    <Input
                      id="desiredCaseDepth"
                      name="desiredCaseDepth"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.2"
                      required
                    />
                    {state.errors?.desiredCaseDepth && (
                      <p className="text-sm text-destructive">
                        {state.errors.desiredCaseDepth[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partThickness">
                      Approx. Material Thickness (mm)
                    </Label>
                    <Input
                      id="partThickness"
                      name="partThickness"
                      type="number"
                      step="1"
                      placeholder="e.g., 25"
                      required
                    />
                    {state.errors?.partThickness && (
                      <p className="text-sm text-destructive">
                        {state.errors.partThickness[0]}
                      </p>
                    )}
                  </div>
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Process...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Generate AI Process
                    </>
                  )}
                </Button>
              </CardContent>
            </form>
          </Card>
          <div className="space-y-6">
            {isPending && <AISkeleton />}
            {state.data && <AIResult data={state.data} />}
            {!isPending && !state.data && (
              <Card className="flex h-full flex-col items-center justify-center p-8 border-dashed">
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Your AI recommendation will appear here.
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Fill out the form to generate a custom carburizing process.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Educational Use Only</AlertTitle>
          <AlertDescription>
            The AI-generated parameters are for educational purposes. Actual
            results depend heavily on furnace type, carbon potential control,
            and part geometry. Always perform tests for production parts.
          </AlertDescription>
        </Alert>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Types of Carburizing</CardTitle>
          <CardDescription>
            Different methods to introduce carbon into steel.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {carburizingTypes.map((process) => (
            <Card key={process.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <process.icon className="h-6 w-6 text-primary" />
                  {process.title}
                </CardTitle>
                <CardDescription>{process.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
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
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Related Processes</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Feather className="h-5 w-5 text-primary" />
              Carbonitriding
            </h3>
            <p className="text-muted-foreground mt-2">
              A similar process to carburizing, but with the addition of
              nitrogen (from ammonia gas). The nitrogen improves hardenability,
              allowing for a less severe oil quench, and increases wear
              resistance. It is often done at slightly lower temperatures than
              gas carburizing.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="font-semibold text-foreground">
                Vacuum Carbonitriding
              </span>{" "}
              is an advanced version that offers even cleaner results and
              better process control, similar to vacuum carburizing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              Decarburization
            </h3>
            <p className="text-muted-foreground mt-2">
              The opposite of carburizing. This is the loss of carbon from the
              surface of steel when heated in an oxygen-rich atmosphere.
              Decarburization is almost always an undesirable defect, as it
              leaves a soft skin on a part that should be hard. It is prevented
              by using a controlled, protective atmosphere or vacuum during

              heat treatment.
            </p>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Youtube className="h-6 w-6 text-primary" />
            Learn More on YouTube
          </CardTitle>
          <CardDescription>
            Watch a video to learn more about carburizing and decarburization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href="https://youtu.be/lG1JDxw5u4A"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
          >
            {decarburizationVideo ? (
              <Image
                src={decarburizationVideo.imageUrl}
                alt={decarburizationVideo.description}
                fill
                className="object-cover"
                data-ai-hint={decarburizationVideo.imageHint}
              />
            ) : (
              <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                Decarburization vs Carburization
              </div>
            )}
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
