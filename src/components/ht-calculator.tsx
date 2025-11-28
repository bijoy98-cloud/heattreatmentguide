
'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Thermometer, Clock, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { steelGrades, processesInfo } from "@/lib/heat-treatment-data";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Label as RechartsLabel } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

function ParameterCalculator() {
  const searchParams = useSearchParams();
  const [steelGrade, setSteelGrade] = useState("");
  const [process, setProcess] = useState("");
  const [partThickness, setPartThickness] = useState("1");
  const [desiredHardness, setDesiredHardness] = useState("");
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const gradeFromQuery = searchParams.get('steelGrade');
    if (gradeFromQuery && steelGrades.some(s => s.value === gradeFromQuery)) {
        setSteelGrade(gradeFromQuery);
    }
  }, [searchParams]);

  const parseTemp = (tempRange: string) => {
    const parts = tempRange.replace(/°C/g, '').split('-').map(s => parseFloat(s));
    if (parts.length > 1) {
        return (parts[0] + parts[1]) / 2;
    }
    return parts[0] || 0;
  }

  const parseDuration = (duration: string) => {
      const parts = duration.replace(/hours?/g, '').trim().split('-').map(s => parseFloat(s));
      if (parts.length > 1) {
          return (parts[0] + parts[1]) / 2;
      }
      return parts[0] || 0;
  }

  const calculateParameters = () => {
    if (!steelGrade || !process) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both steel grade and process.",
      });
      return;
    }

    const thickness = parseFloat(partThickness);
    if (isNaN(thickness) || thickness <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid part thickness.",
      });
      return;
    }

    const steel = steelGrades.find((s) => s.value === steelGrade);
    if (!steel) return;
    
    const complexityFactor = 1 + steel.alloyFactor;

    let temperature = "";
    let soakTime = "";
    let coolingMethod = "";
    let expectedHardness = "";
    const graphData: { time: number; temperature: number; label: string }[] = [];
    let cumulativeTime = 0;

    graphData.push({ time: 0, temperature: 25, label: "Start" });

    // Preheating Step
    cumulativeTime += 1;
    graphData.push({ time: cumulativeTime, temperature: 650, label: "Start Preheat" });
    cumulativeTime += 1;
    graphData.push({ time: cumulativeTime, temperature: 650, label: "End Preheat" });

    switch (process) {
      case "annealing":
        temperature = `${Math.round((840 - steel.carbon * 50) / 5) * 5}-${
          Math.round((910 - steel.carbon * 50) / 5) * 5
        }°C`;
        soakTime = `${(1 * thickness * complexityFactor).toFixed(1)}-${(2 * thickness * complexityFactor).toFixed(1)} hours`;
        coolingMethod = "Furnace cooling (slow)";
        expectedHardness = `${Math.round(150 + steel.carbon * 50)}-${Math.round(
          200 + steel.carbon * 50
        )} HB`;
        
        const annealTemp = parseTemp(temperature);
        const annealSoak = parseDuration(soakTime);
        cumulativeTime += 1.5; // Ramp to temp
        graphData.push({ time: cumulativeTime, temperature: annealTemp, label: "Start Anneal" });
        cumulativeTime += annealSoak;
        graphData.push({ time: cumulativeTime, temperature: annealTemp, label: "End Anneal" });
        cumulativeTime += 8; // Slow cool
        graphData.push({ time: cumulativeTime, temperature: 100, label: "Finish" });
        break;

      case "normalizing":
        temperature = `${Math.round((880 + steel.carbon * 20) / 5) * 5}-${Math.round((950 + steel.carbon * 20) / 5) * 5}°C`;
        soakTime = `${(0.5 * thickness * complexityFactor).toFixed(1)}-${(1 * thickness * complexityFactor).toFixed(1)} hours`;
        coolingMethod = "Air cooling";
        expectedHardness = `${Math.round(180 + steel.carbon * 100)}-${Math.round(
          250 + steel.carbon * 100
        )} HB`;

        const normTemp = parseTemp(temperature);
        const normSoak = parseDuration(soakTime);
        cumulativeTime += 1.5; // Ramp to temp
        graphData.push({ time: cumulativeTime, temperature: normTemp, label: "Start Normalize" });
        cumulativeTime += normSoak;
        graphData.push({ time: cumulativeTime, temperature: normTemp, label: "End Normalize" });
        cumulativeTime += 1; // Air cool
        graphData.push({ time: cumulativeTime, temperature: 100, label: "Finish" });
        break;

      case "hardening":
        temperature = `${Math.round((820 + steel.carbon * 80) / 5) * 5}-${
          Math.round((880 + steel.carbon * 80) / 5) * 5
        }°C`;
        soakTime = `${(0.25 * thickness).toFixed(1)}-${(0.5 * thickness).toFixed(1)} hours after reaching temp`;
        coolingMethod =
          steel.hardenability === "air" ? "Air cooling" : steel.carbon > 0.5 ? "Oil quenching" : "Water or oil quenching";
        expectedHardness = `${Math.round(55 + steel.carbon * 5)}-${Math.round(
          60 + steel.carbon * 5
        )} HRC`;

        const hardTemp = parseTemp(temperature);
        const hardSoak = parseDuration(soakTime);
        cumulativeTime += 1.5; // Ramp to temp
        graphData.push({ time: cumulativeTime, temperature: hardTemp, label: "Start Austenitizing" });
        cumulativeTime += hardSoak;
        graphData.push({ time: cumulativeTime, temperature: hardTemp, label: "End Soak" });
        cumulativeTime += 0.1; // Quench
        graphData.push({ time: cumulativeTime, temperature: 60, label: "Quench" });
        break;

      case "tempering":
        if (desiredHardness) {
            const targetHRC = parseInt(desiredHardness);
            if (!isNaN(targetHRC) && targetHRC >= 20 && targetHRC <= 65) {
                const maxHardness = 60 + steel.carbon * 5;
                const temp = 150 + (maxHardness - targetHRC) * 15;
                temperature = `Approx. ${Math.round(temp / 10) * 10}°C`;
            } else {
                 temperature = "175-650°C (Invalid hardness input)";
            }
        } else {
            temperature = "175-650°C (depending on desired hardness)";
        }
        soakTime = `${Math.max(1.0, (1 * thickness)).toFixed(1)}-${Math.max(2.0, (2 * thickness)).toFixed(1)} hours`;
        coolingMethod = "Air cooling";
        expectedHardness = desiredHardness ? `Target: ${desiredHardness} HRC` : "Varies: 20-62 HRC";

        const temperTemp = parseTemp(temperature.replace('Approx. ', ''));
        const temperSoak = parseDuration(soakTime);
        cumulativeTime = 0; // Tempering is a separate process
        graphData.splice(1, graphData.length-1);
        cumulativeTime += 1; // Ramp
        graphData.push({ time: cumulativeTime, temperature: temperTemp, label: "Start Temper" });
        cumulativeTime += temperSoak;
        graphData.push({ time: cumulativeTime, temperature: temperTemp, label: "End Temper" });
        cumulativeTime += 1; // Cool
        graphData.push({ time: cumulativeTime, temperature: 25, label: "Finish" });
        break;

      case "carburizing":
        temperature = "900-950°C";
        soakTime = `Varies (e.g., ${Math.round(4 + steel.carbon * 2)}-${Math.round(
          8 + steel.carbon * 2
        )} hours for ~1mm case)`;
        coolingMethod = "Slow cool, then reheat and quench";
        expectedHardness = "58-62 HRC (surface layer)";
        
        const carbTemp = parseTemp(temperature);
        const carbSoak = 8; // Example soak for graph
        cumulativeTime += 1.5; // Ramp to temp
        graphData.push({ time: cumulativeTime, temperature: carbTemp, label: "Start Carburizing" });
        cumulativeTime += carbSoak;
        graphData.push({ time: cumulativeTime, temperature: carbTemp, label: "End Carburizing" });
        cumulativeTime += 0.1; // Quench
        graphData.push({ time: cumulativeTime, temperature: 60, label: "Quench" });
        break;
    }

    setResults({
      temperature,
      soakTime,
      coolingMethod,
      expectedHardness,
      graphData
    });

    toast({
      title: "Success",
      description: "Parameters calculated successfully!",
    });
  };

  const chartConfig = {
    temperature: {
        label: "Temperature (°C)",
        color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalcIcon className="w-5 h-5" />
            Input Parameters
          </CardTitle>
          <CardDescription>
            Select your steel grade and desired process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="steel-grade">Steel Grade</Label>
            <Select value={steelGrade} onValueChange={setSteelGrade}>
              <SelectTrigger id="steel-grade">
                <SelectValue placeholder="Select steel grade" />
              </SelectTrigger>
              <SelectContent>
                {steelGrades.map((grade) => (
                  <SelectItem key={grade.value} value={grade.value}>
                    {grade.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="part-thickness">Part Thickness (inches)</Label>
            <Input
              id="part-thickness"
              type="number"
              value={partThickness}
              onChange={(e) => setPartThickness(e.target.value)}
              placeholder="e.g., 1.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="process">Heat Treatment Process</Label>
            <Select value={process} onValueChange={setProcess}>
              <SelectTrigger id="process">
                <SelectValue placeholder="Select process" />
              </SelectTrigger>
              <SelectContent>
                {processesInfo.map((proc) => (
                  <SelectItem key={proc.id} value={proc.id}>
                    {proc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {process === 'tempering' && (
            <div className="space-y-2">
              <Label htmlFor="desired-hardness">Desired Hardness (HRC)</Label>
              <Input
                id="desired-hardness"
                type="number"
                value={desiredHardness}
                onChange={(e) => setDesiredHardness(e.target.value)}
                placeholder="e.g., 58"
              />
            </div>
          )}

          <Button
            onClick={calculateParameters}
            className="w-full"
            size="lg"
          >
            Calculate Parameters
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className={results ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>Calculated Results</CardTitle>
            <CardDescription>
              {results
                ? "Recommended heat treatment parameters"
                : "Results will appear here after calculation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Thermometer className="w-5 h-5 text-destructive mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">
                      Temperature Range
                    </p>
                    <p className="text-lg">{results.temperature}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Soaking Time</p>
                    <p className="text-lg">{results.soakTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Gauge className="w-5 h-5 text-accent mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Cooling Method</p>
                    <p className="text-lg">{results.coolingMethod}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <Gauge className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">
                      Expected Hardness
                    </p>
                    <p className="text-lg font-bold">
                      {results.expectedHardness}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalcIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select parameters and calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>

        {results?.graphData && (
          <Card>
            <CardHeader>
              <CardTitle>Process Graph</CardTitle>
              <CardDescription>A visual representation of the cycle.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={results.graphData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="time" 
                        type="number" 
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(value) => `${value}h`}
                    >
                        <RechartsLabel value="Time (hours)" offset={-15} position="insideBottom" />
                    </XAxis>
                    <YAxis 
                        domain={([dataMin, dataMax]: [number, number]) => { const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax)); return [0, Math.ceil(absMax / 100) * 100]; }}
                    >
                         <RechartsLabel value="Temp (°C)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line name="Temperature" type="monotone" dataKey="temperature" stroke="var(--color-temperature)" strokeWidth={2} dot={true} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


export function HTCalculator() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-justify">
          Rule-Based Process Parameter Calculator
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Use the calculator below to determine recommended parameters based on a selected process. This calculator uses predefined rules and formulas.
        </p>
      </div>

      <ParameterCalculator />
      
      <Card className="mt-8 bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-sm">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-muted-foreground text-justify">
          <p>
            • The rule-based calculator provides general guidelines.
          </p>
          <p>
            • Actual parameters may vary based on
            part size, geometry, furnace type, and specific requirements. Always consult material specifications and industry standards for
            critical applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

    