"use client";
import { troubleshootingTips, recommendedResources } from "@/lib/heat-treatment-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Webhook, Factory, Wrench, Thermometer, Briefcase, Download } from "lucide-react";
import { useState, useCallback, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const thermocoupleTypes = [
  {
    type: "K",
    composition: "Chromel-Alumel",
    range: "-200 to 1250°C",
    pros: "Most common, wide range, inexpensive, good in oxidizing atmospheres.",
    cons: "Not suitable for reducing atmospheres; can drift in calibration at high temps.",
    application: "General purpose temperature measurement in labs, industry, and furnaces."
  },
  {
    type: "J",
    composition: "Iron-Constantan",
    range: "-40 to 750°C",
    pros: "Higher sensitivity than Type K, good for vacuum or inert atmospheres.",
    cons: "Iron leg is prone to rusting in moist environments; limited temperature range.",
    application: "Plastics and polymer processing, older equipment, vacuum applications."
  },
  {
    type: "N",
    composition: "Nicrosil-Nisil",
    range: "-270 to 1250°C",
    pros: "More stable and resistant to high-temp oxidation than Type K, less drift.",
    cons: "Slightly more expensive than Type K.",
    application: "High-temperature furnace measurements, an excellent replacement for Type K."
  },
  {
    type: "S",
    composition: "Platinum-10% Rhodium",
    range: "0 to 1450°C",
    pros: "Very high stability and accuracy, used as a calibration standard.",
    cons: "Expensive, low sensitivity, easily contaminated.",
    application: "High-temperature calibration, scientific research, semiconductor industry."
  },
  {
    type: "R",
    composition: "Platinum-13% Rhodium",
    range: "0 to 1450°C",
    pros: "Similar to Type S but with slightly higher output and improved stability.",
    cons: "Expensive, low sensitivity.",
    application: "Very high-temperature industrial applications, glass manufacturing."
  },
  {
    type: "B",
    composition: "Platinum-30% Rhodium / Platinum-6% Rhodium",
    range: "870 to 1700°C",
    pros: "Suitable for extremely high temperatures, high tensile strength.",
    cons: "Very expensive, very low output, not usable below ~600°C.",
    application: "Industrial furnaces, high-temperature testing, molten metal measurements."
  }
];

const furnaceTypes = [
  {
    title: "Batch Furnace",
    description: "Furnaces where stationary loads are treated one batch at a time. Highly flexible for various processes and part sizes.",
    bestUseCases: [
      "Job shops with a variety of parts and processes.",
      "Low to medium production volumes.",
      "Processes requiring long soak times.",
      "Large or awkwardly shaped components.",
    ],
  },
  {
    title: "Continuous Furnace",
    description: "Furnaces that move parts through heating and cooling zones on a conveyor system. Ideal for high-volume, repeatable production.",
    bestUseCases: [
      "High-volume production of identical parts (e.g., automotive fasteners).",
      "Processes like carburizing, annealing, or tempering of many small parts.",
      "Integration into an automated production line.",
    ],
  },
  {
    title: "Vacuum Furnace",
    description: "Furnaces that operate under a vacuum to provide a tightly controlled, inert atmosphere, preventing oxidation and decarburization.",
    bestUseCases: [
      "Brazing and hardening of high-alloy tool steels.",
      "Processing of reactive metals (e.g., titanium) and superalloys.",
      "Applications requiring a bright, clean surface finish with no post-treatment cleaning.",
      "Medical and aerospace components.",
    ],
  },
  {
    title: "Salt Bath Furnace",
    description: "Furnaces that use molten salt as the heating and quenching medium, providing rapid and uniform heat transfer.",
    bestUseCases: [
      "Isothermal transformations like austempering and martempering.",
      "Case hardening processes like liquid carburizing or nitriding.",
      "Distortion-sensitive parts due to uniform heating and support.",
      "Fast heating cycles.",
    ],
  },
  {
    title: "Induction Heating System",
    description: "Uses electromagnetic induction to generate heat directly within the part. It's a method of heating, not a furnace in the traditional sense, known for its speed and precision.",
    bestUseCases: [
      "Surface hardening of specific areas on a part (e.g., gear teeth, bearing races).",
      "High-speed, selective heating for brazing or soldering.",
      "Applications where only a portion of the part needs to be treated.",
      "Highly automated and repeatable processes.",
    ],
  },
  {
    title: "Pit Furnace",
    description: "A type of batch furnace where the chamber is a vertical pit in the ground. Parts are loaded from the top, making it suitable for very long and heavy parts.",
    bestUseCases: [
      "Treating long shafts, tubes, and structural components.",
      "Carburizing, annealing, and hardening of large workpieces.",
      "Operations where crane loading is necessary due to part weight.",
    ],
  },
];

type TempScale = "celsius" | "fahrenheit" | "kelvin";

interface TempValues {
  celsius: string;
  fahrenheit: string;
  kelvin: string;
}

const toFahrenheit = (c: number) => (c * 9/5 + 32).toFixed(2);
const toKelvinFromCelsius = (c: number) => (c + 273.15).toFixed(2);
const toCelsiusFromFahrenheit = (f: number) => ((f - 32) * 5/9).toFixed(2);
const toKelvinFromFahrenheit = (f: number) => (((f - 32) * 5/9) + 273.15).toFixed(2);
const toCelsiusFromKelvin = (k: number) => (k - 273.15).toFixed(2);
const toFahrenheitFromKelvin = (k: number) => ((k - 273.15) * 9/5 + 32).toFixed(2);

const steelColors = [
    { color: "Faint Red", tempC: "500-550", tempF: "930-1020", hex: "#660000" },
    { color: "Dark Red", tempC: "550-650", tempF: "1020-1200", hex: "#8B0000" },
    { color: "Cherry Red", tempC: "730-770", tempF: "1350-1420", hex: "#D2042D" },
    { color: "Bright Cherry", tempC: "770-800", tempF: "1420-1470", hex: "#FF0000" },
    { color: "Orange", tempC: "850-900", tempF: "1560-1650", hex: "#FFA500" },
    { color: "Bright Orange", tempC: "950-1000", tempF: "1740-1830", hex: "#FF8C00" },
    { color: "Yellow", tempC: "1050-1150", tempF: "1920-2100", hex: "#FFD700" },
    { color: "Bright Yellow", tempC: "1200-1300", tempF: "2190-2370", hex: "#FFFF00" },
    { color: "White", tempC: "1400+", tempF: "2550+", hex: "#FFFFFF" },
];

export function IndustrialTools() {
    const [values, setValues] = useState<TempValues>({
        celsius: "",
        fahrenheit: "",
        kelvin: "",
    });

    const handleInputChange = useCallback(
        (scale: TempScale, value: string) => {
          const numValue = parseFloat(value);
          if (value === "") {
            setValues({ celsius: "", fahrenheit: "", kelvin: "" });
            return;
          }
          if (isNaN(numValue)) {
            setValues((prev) => ({ ...prev, [scale]: value }));
            return;
          }
    
          let newCelsius = "", newFahrenheit = "", newKelvin = "";
    
          switch (scale) {
            case "celsius":
              newCelsius = value;
              newFahrenheit = toFahrenheit(numValue);
              newKelvin = toKelvinFromCelsius(numValue);
              break;
            case "fahrenheit":
              newFahrenheit = value;
              newCelsius = toCelsiusFromFahrenheit(numValue);
              newKelvin = toKelvinFromFahrenheit(numValue);
              break;
            case "kelvin":
              newKelvin = value;
              newCelsius = toCelsiusFromKelvin(numValue);
              newFahrenheit = toFahrenheitFromKelvin(numValue);
              break;
          }
          
          setValues({
            celsius: newCelsius,
            fahrenheit: newFahrenheit,
            kelvin: newKelvin,
          });
        },
        []
    );

    const createHandler = (scale: TempScale) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        handleInputChange(scale, e.target.value);
    };

    return (
        <div className="space-y-12">
            <div className="space-y-8">
                <div>
                  <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                    <Briefcase className="h-8 w-8 text-primary" />
                    Industrial Tools
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
                    A suite of utilities designed to assist heat treatment professionals in their daily operations, from troubleshooting to data management.
                  </p>
                </div>
            </div>

            <div className="space-y-8 pt-8" id="instrumentation-guide">
                <div>
                <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                    <Webhook className="h-8 w-8 text-primary"/>
                    Sensor &amp; Instrumentation Guide
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
                    A comprehensive guide to common thermocouple types, their characteristics, and typical applications in heat treatment and beyond.
                </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Control Thermocouples</CardTitle>
                        <CardDescription className="text-justify">The sensor that regulates the furnace temperature.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p>• <span className="font-semibold text-foreground">Purpose:</span> Provides the temperature feedback to the furnace's PID controller to maintain the setpoint.</p>
                        <p>• <span className="font-semibold text-foreground">Placement:</span> Fixed position inside the furnace, typically near the heating elements, representing the general furnace atmosphere temperature.</p>
                        <p>• <span className="font-semibold text-foreground">Characteristics:</span> Usually a robust, sheathed thermocouple (e.g., Type N or K) designed for long life and stability.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Load Thermocouples</CardTitle>
                        <CardDescription className="text-justify">The sensor that measures the actual part temperature.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p>• <span className="font-semibold text-foreground">Purpose:</span> To ensure the parts themselves reach and hold the required temperature for the specified time. This is critical for process validation.</p>
                        <p>• <span className="font-semibold text-foreground">Placement:</span> Attached directly to the workpiece or a representative part within the load, often in the thickest or hardest-to-heat section.</p>
                        <p>• <span className="font-semibold text-foreground">Characteristics:</span> Can be expendable mineral-insulated (MI) cable thermocouples. Accuracy is more critical than longevity.</p>
                    </CardContent>
                </Card>
                </div>

                <Card>
                <CardHeader>
                    <CardTitle>Thermocouple Types Comparison</CardTitle>
                    <CardDescription className="text-justify">
                    Choosing the right thermocouple is critical for accurate temperature measurement. Each type has a unique combination of materials, temperature range, and environmental suitability.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Type</TableHead>
                            <TableHead className="font-bold">Composition</TableHead>
                            <TableHead className="font-bold">Temp. Range (°C)</TableHead>
                            <TableHead className="font-bold">Common Applications</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {thermocoupleTypes.map((tc) => (
                            <TableRow key={tc.type}>
                            <TableCell className="font-semibold text-lg text-primary">{tc.type}</TableCell>
                            <TableCell>{tc.composition}</TableCell>
                            <TableCell className="font-mono">{tc.range}</TableCell>
                            <TableCell>{tc.application}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Calibration Intervals &amp; Best Practices (per AMS 2750)</CardTitle>
                    <CardDescription className="text-justify">Ensuring accuracy is a core requirement for compliant heat treatment.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {[
                            { title: "Control &amp; Recording TCs:", description: "Calibrated quarterly (every 3 months)." },
                            { title: "Load Sensors (Non-expendable):", description: "Calibrated monthly or after a set number of uses." },
                            { title: "Expendable Load Sensors:", description: "One-time use; must be from a calibrated batch of wire." },
                            { title: "System Accuracy Test (SAT):", description: "A comparison of the entire measurement system (sensor, lead wire, instrument) against a calibrated test instrument. Typically performed quarterly." },
                            { title: "Traceability:", description: "All calibrations must be traceable to a national standard body (e.g., NIST in the USA)." },
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                            <div>
                                <span className="font-semibold text-sm">{item.title}</span>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            </li>
                        ))}
                        </ul>
                </CardContent>
                </Card>
                
                <div className="space-y-8 pt-8" id="furnace-library">
                <div>
                    <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                    <Factory className="h-8 w-8 text-primary" />
                    Furnace Type Library
                    </h2>
                    <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
                    An overview of common industrial furnace designs, their operating principles, and their best-suited applications in heat treatment.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {furnaceTypes.map((furnace) => (
                    <Card key={furnace.title} className="flex flex-col">
                        <CardHeader>
                        <CardTitle>{furnace.title}</CardTitle>
                        <CardDescription className="text-justify">{furnace.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <h4 className="mb-2 font-semibold">Best Use Cases:</h4>
                        <ul className="space-y-3">
                            {furnace.bestUseCases.map((point, index) => (
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
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                    <Thermometer className="h-8 w-8 text-primary" />
                    Temperature Converter
                    </h2>
                    <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
                    Enter a value in any field to see its conversion in other
                    common temperature scales.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                    <CardTitle>Temperature Calculator</CardTitle>
                    <CardDescription className="text-justify">
                        Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K).
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                        <Label htmlFor="celsius">Celsius (°C)</Label>
                        <Input
                            id="celsius"
                            type="number"
                            placeholder="e.g., 100"
                            value={values.celsius}
                            onChange={createHandler("celsius")}
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
                        <Input
                            id="fahrenheit"
                            type="number"
                            placeholder="e.g., 212"
                            value={values.fahrenheit}
                            onChange={createHandler("fahrenheit")}
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="kelvin">Kelvin (K)</Label>
                        <Input
                            id="kelvin"
                            type="number"
                            placeholder="e.g., 373.15"
                            value={values.kelvin}
                            onChange={createHandler("kelvin")}
                        />
                        </div>
                    </div>
                    </CardContent>
                </Card>

                <Card className="mt-6 bg-accent/5 border-accent/20 w-full max-w-md">
                    <CardHeader>
                    <CardTitle className="text-sm">Conversion Formulas</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-muted-foreground">
                        <p>• <span className="font-semibold">Celsius to Fahrenheit:</span> (°C × 9/5) + 32 = °F</p>
                        <p>• <span className="font-semibold">Fahrenheit to Celsius:</span> (°F - 32) × 5/9 = °C</p>
                        <p>• <span className="font-semibold">Celsius to Kelvin:</span> °C + 273.15 = K</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                    <CardTitle>Steel Temperature Color Chart</CardTitle>
                    <CardDescription className="text-justify">
                        Approximate colors of steel when heated. Useful for visual temperature estimation during forging and heat treatment.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Color</TableHead>
                            <TableHead>Approx. Celsius (°C)</TableHead>
                            <TableHead>Approx. Fahrenheit (°F)</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {steelColors.map((item) => (
                            <TableRow key={item.color}>
                            <TableCell className="flex items-center gap-2 font-medium">
                                <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: item.hex }} />
                                {item.color}
                            </TableCell>
                            <TableCell>{item.tempC}°C</TableCell>
                            <TableCell>{item.tempF}°F</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                <div>
                    <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                        <Wrench className="h-8 w-8 text-primary" />
                        Troubleshooting
                    </h2>
                    <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
                        Solutions for common issues in steel heat treatment. Identifying the
                        root cause is key to preventing future failures.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {troubleshootingTips.map((tip) => (
                        <Card key={tip.id}>
                        <CardHeader>
                            <CardTitle>{tip.problem}</CardTitle>
                            <CardDescription className="text-justify">
                            Potential causes and recommended actions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                            {tip.solutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                <span className="text-sm text-muted-foreground">{solution}</span>
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
