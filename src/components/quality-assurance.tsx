
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, CheckCircle, Microscope, Beaker, HardHat, FileCheck, ShieldCheck, Youtube, Layers, Calculator, Award, Fish, FileX, AlertOctagon, FileWarning, Target, ClipboardList } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


const mechanicalTests = [
  {
    title: "Hardness Testing",
    description: "Measures the material's resistance to localized plastic deformation. It's the most common test to verify the success of a heat treatment process.",
    methods: ["Rockwell (HRC, HRB)", "Brinell (HBW)", "Vickers (HV)", "Microhardness (Knoop/Vickers)"],
  },
  {
    title: "Tensile Testing",
    description: "Pulls a sample to failure to determine its ultimate tensile strength, yield strength, elongation, and reduction of area. It provides fundamental engineering data.",
    methods: [],
  },
  {
    title: "Impact Testing (Toughness)",
    description: "Measures a material's ability to absorb energy and plastically deform before fracturing. Charpy and Izod tests are common methods.",
    methods: ["Charpy V-Notch", "Izod"],
  },
];

const metallographicAnalysis = [
    {
        title: "Microstructure Analysis",
        description: "Visual examination of the polished and etched surface of a material under a microscope to identify phases (e.g., martensite, bainite, ferrite) and detect defects.",
    },
    {
        title: "Grain Size Measurement",
        description: "Determining the average grain size of the material, which significantly impacts mechanical properties like strength and toughness. (e.g., per ASTM E112).",
    },
];

const labInstruments = [
    "Hardness Testers (Rockwell, Brinell, Vickers)",
    "Metallurgical Microscopes with imaging software",
    "Cut-off wheels, mounting presses, and polishing machines for sample prep",
    "Spectrometers for chemical analysis (verifying alloy composition)",
    "Tensile and Impact testing machines",
]

const qaActivities = [
    "Receiving Inspection: Verifying incoming raw material against certificates and specifications.",
    "In-Process Checks: Monitoring furnace parameters, atmosphere, and temperatures during the cycle.",
    "Final Inspection: Performing required tests (e.g., hardness, case depth) on finished parts to ensure they meet customer requirements.",
    "Calibration: Regularly calibrating all testing and measuring equipment (thermocouples, hardness testers, controllers).",
    "Certification: Generating test reports and certificates of compliance to accompany the finished product.",
]

const complianceItems = [
    {
        standard: "AMS 2750",
        title: "Pyrometry",
        description: "The aerospace industry's standard for pyrometry. It governs temperature sensors, instrumentation, furnace temperature uniformity surveys (TUS), and system accuracy tests (SAT).",
    },
    {
        standard: "CQI-9",
        title: "Heat Treat System Assessment",
        description: "An automotive industry self-assessment standard from AIAG. It provides a framework for managing and improving heat treatment processes to ensure consistent quality and control.",
    },
    {
        standard: "ISO 9001",
        title: "Quality Management Systems",
        description: "A foundational international standard for a quality management system (QMS). It focuses on customer satisfaction, process control, and continual improvement.",
    },
     {
        standard: "ASTM Standards",
        title: "Test Method Standards",
        description: "A wide range of standards from ASTM International that define the precise procedures for conducting tests, such as hardness (E18, E10), grain size (E112), and tensile testing (E8).",
    },
]

function CaseDepthCalculator() {
    const [readings, setReadings] = useState<{ depth: string, hardness: string }[]>([{ depth: '0.1', hardness: '' }]);
    const [cutoff, setCutoff] = useState('50');
    const [result, setResult] = useState<string | null>(null);

    const handleAddReading = () => {
        const lastDepth = parseFloat(readings[readings.length - 1]?.depth || '0');
        const newDepth = (lastDepth + 0.1).toFixed(1);
        setReadings([...readings, { depth: newDepth, hardness: '' }]);
    };

    const handleReadingChange = (index: number, field: 'depth' | 'hardness', value: string) => {
        const newReadings = [...readings];
        newReadings[index][field] = value;
        setReadings(newReadings);
    };

    const calculateCaseDepth = () => {
        const cutoffHardness = parseFloat(cutoff);
        if (isNaN(cutoffHardness)) {
            setResult("Invalid cutoff hardness.");
            return;
        }

        const validReadings = readings
            .map(r => ({ depth: parseFloat(r.depth), hardness: parseFloat(r.hardness) }))
            .filter(r => !isNaN(r.depth) && !isNaN(r.hardness))
            .sort((a, b) => a.depth - b.depth);
        
        if (validReadings.length < 2) {
             setResult("At least two valid readings are required.");
             return;
        }

        // Check if the first point is already below cutoff
        if (validReadings[0].hardness < cutoffHardness) {
            setResult("Effective Case Depth: 0.000 mm (surface hardness is below cutoff).");
            return;
        }

        for (let i = 1; i < validReadings.length; i++) {
            const prev = validReadings[i-1];
            const curr = validReadings[i];
            
            // Check if hardness at current point is below the cutoff
            if (curr.hardness < cutoffHardness) {
                // Check if hardness at previous point is above or equal to the cutoff
                if (prev.hardness >= cutoffHardness) {
                    // We found the interval where the cutoff is crossed.
                    const hardnessRange = prev.hardness - curr.hardness;
                    const depthRange = curr.depth - prev.depth;
                    const hardnessDiff = prev.hardness - cutoffHardness;
    
                    if (hardnessRange > 0) {
                        const effectiveDepth = prev.depth + (hardnessDiff / hardnessRange) * depthRange;
                        setResult(`Effective Case Depth: ${effectiveDepth.toFixed(3)} mm`);
                    } else {
                        // If hardness does not drop, we can't interpolate.
                        setResult(`Effective Case Depth: ${prev.depth.toFixed(3)} mm (no hardness drop).`);
                    }
                    return; // Exit after finding the interval
                }
            }
        }

        // If the loop completes and the last reading is still above the cutoff
        setResult(`Effective Case Depth is deeper than ${validReadings[validReadings.length - 1].depth.toFixed(3)} mm.`);
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Calculator className="h-6 w-6"/>Effective Case Depth Calculator</CardTitle>
                <CardDescription>Enter microhardness traverse data to calculate the effective case depth based on a cutoff hardness.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="cutoff">Cutoff Hardness (HRC or equivalent HV)</Label>
                        <Input id="cutoff" value={cutoff} onChange={(e) => setCutoff(e.target.value)} type="number" placeholder="e.g., 50"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Microhardness Readings</Label>
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                        <p className="text-sm font-medium text-muted-foreground">Depth (mm)</p>
                        <p className="text-sm font-medium text-muted-foreground">Hardness (HV/HRC)</p>
                        <span></span>
                    </div>
                    {readings.map((reading, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                            <Input type="number" step="0.1" value={reading.depth} onChange={(e) => handleReadingChange(index, 'depth', e.target.value)} placeholder="e.g., 0.1" />
                            <Input type="number" value={reading.hardness} onChange={(e) => handleReadingChange(index, 'hardness', e.target.value)} placeholder="e.g., 650" />
                            {index === readings.length - 1 && <Button onClick={handleAddReading} variant="outline" size="sm">+</Button>}
                        </div>
                    ))}
                </div>
                
                <Button onClick={calculateCaseDepth}>Calculate</Button>

                {result && (
                    <div className="pt-4">
                        <h4 className="font-semibold">Result:</h4>
                        <p className="text-lg font-bold text-primary">{result}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export function QualityAssurance() {
    const metallurgyBasicsVideo = PlaceHolderImages.find(img => img.id === 'metallurgy-basics');
    const hardnessTestingVideo = PlaceHolderImages.find(img => img.id === 'hardness-testing-video');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <BadgeCheck className="h-8 w-8 text-primary" />
          Quality Assurance in Heat Treatment
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Ensuring that parts meet specification is a critical function, combining rigorous testing, meticulous process control, and accurate documentation.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><ClipboardList className="h-6 w-6"/>Basic Quality Control System</CardTitle>
            <CardDescription className="text-justify">The foundation of any reputable heat treat operation is a robust quality control system built on several key pillars.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
                <h4 className="font-semibold text-foreground mb-2">1. Documentation</h4>
                <p className="text-sm text-muted-foreground text-justify">Standard Operating Procedures (SOPs) and Work Instructions provide clear, step-by-step guidance for every process, ensuring consistency and repeatability.</p>
            </div>
             <div>
                <h4 className="font-semibold text-foreground mb-2">2. Traceability</h4>
                <p className="text-sm text-muted-foreground text-justify">A 'job traveler' or 'router' document accompanies parts through the entire process, recording every step, operator, furnace, and test result for full traceability.</p>
            </div>
             <div>
                <h4 className="font-semibold text-foreground mb-2">3. Verification</h4>
                <p className="text-sm text-muted-foreground text-justify">Includes in-process checks (e.g., temperature monitoring) and final inspection (e.g., hardness testing, case depth analysis) to verify that all customer requirements have been met.</p>
            </div>
             <div>
                <h4 className="font-semibold text-foreground mb-2">4. Calibration</h4>
                <p className="text-sm text-muted-foreground text-justify">All measurement and testing equipment, from furnace thermocouples to hardness testers, must be regularly calibrated against traceable standards to ensure accuracy.</p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><HardHat className="h-6 w-6"/>Mechanical Testing</CardTitle>
            <CardDescription className="text-justify">Verifying the mechanical properties of heat-treated components.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mechanicalTests.map((test) => (
                <Card key={test.title} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">{test.title}</CardTitle>
                        <CardDescription className="pt-2 text-justify">{test.description}</CardDescription>
                    </CardHeader>
                    {test.methods.length > 0 && (
                         <CardContent className="flex-grow">
                            <h4 className="mb-2 font-semibold text-sm">Common Methods:</h4>
                            <ul className="space-y-2">
                                {test.methods.map(method => (
                                     <li key={method} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                        {method}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    )}
                </Card>
            ))}
        </CardContent>
      </Card>
      
      <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Microscope className="h-6 w-6"/>Sample Preparation for Metallography</CardTitle>
                <CardDescription className="text-justify">To analyze a material's microstructure, a sample must be carefully prepared to reveal its features under a microscope.</CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-6">                  
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                            <span className="text-primary font-bold text-sm">1</span>
                        </span>
                        <h3 className="font-semibold">Sectioning</h3>
                        <p className="text-sm text-muted-foreground text-justify">Cut a small, representative piece from the component using an abrasive cut-off saw with coolant to prevent overheating and altering the microstructure.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                            <span className="text-primary font-bold text-sm">2</span>
                        </span>
                        <h3 className="font-semibold">Mounting</h3>
                        <p className="text-sm text-muted-foreground text-justify">The sample is embedded in a polymer resin (e.g., epoxy) to make it easier to handle and hold flat during polishing. For **cold mounting**, a two-part liquid resin is mixed and poured into a mold containing the sample, then allowed to cure at room temperature.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                            <span className="text-primary font-bold text-sm">3</span>
                        </span>
                        <h3 className="font-semibold">Grinding & Polishing</h3>
                        <p className="text-sm text-muted-foreground text-justify">The mounted sample is ground with progressively finer silicon carbide papers (e.g., 240, 400, 600, 1200 grit) to achieve a flat surface. It is then polished on cloths with diamond slurries (e.g., 9, 3, 1 micron) to produce a mirror-like, scratch-free finish.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                             <span className="text-primary font-bold text-sm">4</span>
                        </span>
                        <h3 className="font-semibold">Etching</h3>
                        <p className="text-sm text-muted-foreground text-justify">The polished surface is chemically etched to reveal the microstructure. For steels, a common etchant is **Nital** (2-5% nitric acid in ethanol). The sample is swabbed or immersed for a few seconds, which corrodes different phases and grain boundaries at different rates, creating visual contrast under a microscope.</p>
                        <p className="text-xs text-amber-600 mt-2"><b>Safety Note:</b> Always handle etchants in a fume hood with appropriate PPE (gloves, goggles, lab coat).</p>
                    </li>
                </ol>
            </CardContent>
        </Card>


      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Microscope className="h-6 w-6"/>Metallographic Analysis</CardTitle>
                <CardDescription className="text-justify">Examining the microstructure to confirm the heat treatment was successful.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {metallographicAnalysis.map(analysis => (
                    <div key={analysis.title}>
                        <h4 className="font-semibold">{analysis.title}</h4>
                        <p className="text-sm text-muted-foreground text-justify">{analysis.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Beaker className="h-6 w-6"/>Key Lab Instruments</CardTitle>
                <CardDescription className="text-justify">Essential equipment for a heat treatment quality lab.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-3">
                    {labInstruments.map((instrument, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">
                        {instrument}
                        </span>
                    </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
      
       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Layers className="h-6 w-6"/>Case Depth Measurement</CardTitle>
                <CardDescription className="text-justify">For case-hardened parts, this measures the thickness of the hardened layer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">1. Visual Method</h4>
                        <p className="text-justify">A cross-section of the part is polished and etched with an appropriate acid (like Nital). The hardened case will appear as a distinct, darker layer, which can be measured with a calibrated microscope or optical comparator.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground mb-2">2. Microhardness Traverse Method</h4>
                        <p className="text-justify">This is the most accurate method. A microhardness tester (Vickers or Knoop) is used to make a series of indentations from the surface towards the core. The "effective case depth" is defined as the depth at which the hardness drops to a specified value (e.g., 50 HRC or its Vickers equivalent).</p>
                    </div>
                </div>
                <CaseDepthCalculator />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><FileWarning className="h-6 w-6"/>Non-Conformance and Corrective Action</CardTitle>
                <CardDescription className="text-justify">A systematic process for handling products that do not meet specifications and preventing the issue from recurring.</CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-6">                  
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                            <span className="text-primary font-bold text-sm">1</span>
                        </span>
                        <h3 className="font-semibold">Identification & Segregation</h3>
                        <p className="text-sm text-muted-foreground text-justify">When a non-conforming part is identified (e.g., wrong hardness, cracked, wrong case depth), it must be immediately segregated from the good parts and clearly labeled to prevent it from being shipped accidentally.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                            <span className="text-primary font-bold text-sm">2</span>
                        </span>
                        <h3 className="font-semibold">Disposition</h3>
                        <p className="text-sm text-muted-foreground text-justify">The non-conforming product is reviewed by a Material Review Board (MRB), which typically includes quality, engineering, and production representatives. The disposition can be: Rework (re-heat treat), Use-As-Is (if the deviation is minor and acceptable to the customer), or Scrap.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                            <span className="text-primary font-bold text-sm">3</span>
                        </span>
                        <h3 className="font-semibold">Root Cause Analysis</h3>
                        <p className="text-sm text-muted-foreground text-justify">This is the most critical step. The team investigates to find the true cause of the problem using tools like the "5 Whys" or a Fishbone (Ishikawa) Diagram. The goal is to find the systemic issue, not just blame an operator.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary/90">
                             <span className="text-primary font-bold text-sm">4</span>
                        </span>
                        <h3 className="font-semibold">Corrective & Preventive Action (CAPA)</h3>
                        <p className="text-sm text-muted-foreground text-justify">Based on the root cause, a corrective action is implemented to fix the immediate problem (e.g., recalibrate a furnace). A preventive action is also put in place to ensure it never happens again (e.g., change the calibration schedule from yearly to quarterly).</p>
                    </li>
                </ol>
            </CardContent>
        </Card>

      <div className="space-y-8 pt-8">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <FileX className="h-7 w-7" />
          Failure Analysis & Root Cause Investigation
        </h3>
        <p className="text-muted-foreground text-justify">
          Systematic approaches to understanding why a failure occurred and preventing it from happening again.
        </p>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Fish className="h-6 w-6 text-primary"/>Fishbone Diagram (Ishikawa)</CardTitle>
                <CardDescription className="text-justify">A cause-and-effect diagram used to identify all potential root causes for a specific problem.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-muted-foreground text-justify">The problem or "effect" is placed at the head of the "fish". The major categories of causes are the main bones, with specific causes branching off them. The "6 Ms" are a common starting point for categories in manufacturing:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Manpower', 'Method', 'Machine', 'Material', 'Measurement', 'Mother Nature (Environment)'].map(m => (
                        <div key={m} className="p-3 bg-muted/50 rounded-lg text-center">
                            <p className="font-semibold">{m}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><FileCheck className="h-6 w-6 text-primary"/>How to Generate a Failure Analysis Report</CardTitle>
                <CardDescription className="text-justify">A structured report is essential for communicating the findings of an investigation.</CardDescription>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-semibold text-foreground">Executive Summary:</span> A brief, high-level overview of the failure and the key findings.</li>
                    <li><span className="font-semibold text-foreground">Background & Part Information:</span> Describe the part, its material, specifications, and service history.</li>
                    <li><span className="font-semibold text-foreground">Investigation Procedure:</span> Detail the tests performed (e.g., visual inspection, hardness testing, metallography, chemical analysis).</li>
                    <li><span className="font-semibold text-foreground">Findings & Observations:</span> Present the data and results from the tests in a clear, factual manner. Include images.</li>
                    <li><span className="font-semibold text-foreground">Root Cause Analysis:</span> Analyze the findings to determine the most probable root cause of the failure. Use tools like the Fishbone Diagram or "5 Whys".</li>
                    <li><span className="font-semibold text-foreground">Conclusion & Recommendations:</span> Summarize the root cause and provide specific, actionable corrective and preventive actions (CAPA).</li>
                </ol>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><AlertOctagon className="h-6 w-6 text-primary"/>How to Perform FMEA (Failure Mode and Effects Analysis)</CardTitle>
                <CardDescription className="text-justify">A proactive, systematic tool to identify and mitigate potential failures in a process *before* they happen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                    <li><span className="font-semibold text-foreground">Identify Failure Modes:</span> Brainstorm all the ways a process step could go wrong (e.g., "Furnace over-temperature").</li>
                    <li><span className="font-semibold text-foreground">Identify Potential Effects:</span> For each failure mode, what is the consequence? (e.g., "Parts are too brittle").</li>
                    <li><span className="font-semibold text-foreground">Rate Severity (S):</span> On a scale of 1-10, how serious is the effect? (1 = minor, 10 = catastrophic).</li>
                    <li><span className="font-semibold text-foreground">Identify Potential Causes:</span> What could cause this failure mode? (e.g., "Faulty thermocouple").</li>
                    <li><span className="font-semibold text-foreground">Rate Occurrence (O):</span> On a scale of 1-10, how likely is this cause to happen? (1 = very unlikely, 10 = almost certain).</li>
                    <li><span className="font-semibold text-foreground">Identify Current Controls:</span> What processes are in place to prevent or detect the failure? (e.g., "Quarterly SAT checks").</li>
                    <li><span className="font-semibold text-foreground">Rate Detection (D):</span> On a scale of 1-10, how likely are you to detect the failure before the product leaves? (1 = certain to detect, 10 = impossible to detect).</li>
                    <li><span className="font-semibold text-foreground">Calculate Risk Priority Number (RPN):</span> RPN = Severity × Occurrence × Detection.</li>
                    <li><span className="font-semibold text-foreground">Take Action:</span> Address the highest RPN items by implementing new controls to reduce Severity, Occurrence, or improve Detection.</li>
                </ol>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Award className="h-6 w-6"/>Lab Calibration Procedures</CardTitle>
          <CardDescription className="text-justify">Calibration is the process of comparing a measuring instrument against a known, traceable standard to ensure its accuracy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h4 className="font-semibold text-foreground mb-2">General Calibration Steps</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground text-justify">
                    <li>Identify the instrument and the traceable standard to be used.</li>
                    <li>Perform measurements on the standard according to a defined procedure (e.g., ASTM E18 for Rockwell).</li>
                    <li>Record the "as found" readings from the instrument.</li>
                    <li>Compare the readings to the standard's certified value and determine the error.</li>
                    <li>If the error is outside the allowable tolerance, make adjustments to the instrument if possible.</li>
                    <li>Record the "as left" readings after adjustment.</li>
                    <li>Apply a calibration sticker showing the date performed, the due date for the next calibration, and the technician's initials.</li>
                </ol>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Example: Calibrating a Rockwell Hardness Tester</h4>
                    <p className="text-sm text-muted-foreground text-justify">Using certified hardness test blocks, perform a series of indentations across the block's surface. The average reading must be within the tolerance specified on the block's certificate (e.g., ±0.5 HRC). This should be done for blocks in the low, mid, and high ranges of the scale being used.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Example: Calibrating a Thermocouple</h4>
                    <p className="text-sm text-muted-foreground text-justify">Place the test thermocouple and a calibrated reference thermocouple in a calibration furnace or block. Heat to a setpoint, allow to stabilize, and record the readings from both. The difference between the two readings is the error, which must be within the tolerance specified by standards like AMS 2750.</p>
                </div>
            </div>
        </CardContent>
      </Card>


       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><FileCheck className="h-6 w-6"/>Core QA Activities</CardTitle>
                <CardDescription className="text-justify">The daily practices that ensure consistent quality and traceability.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-3">
                    {qaActivities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">
                        {activity}
                        </span>
                    </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

      <div className="space-y-4 pt-8">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <ShieldCheck className="h-7 w-7" />
          Key Industry Standards & Compliance
        </h3>
        <p className="text-muted-foreground text-justify">
          Adherence to industry standards is non-negotiable for quality assurance in heat treatment, especially for automotive and aerospace applications.
        </p>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {complianceItems.map((item) => (
            <Card key={item.standard}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{item.standard}</span>
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{item.title}</span>
                    </CardTitle>
                    <CardDescription className="pt-2 text-justify">{item.description}</CardDescription>
                </CardHeader>
            </Card>
            ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Youtube className="h-6 w-6 text-primary" />
                    Learn Hardness Testing
                </CardTitle>
                <CardDescription>
                    Watch a detailed video on how to perform hardness testing on steel.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <a href="https://www.youtube.com/watch?v=1t4t2s3G-yE" target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                    {hardnessTestingVideo ? (
                        <Image
                            src={hardnessTestingVideo.imageUrl}
                            alt={hardnessTestingVideo.description}
                            fill
                            className="object-cover"
                            data-ai-hint={hardnessTestingVideo.imageHint}
                        />
                    ) : (
                        <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                            Go to YouTube Video: How to do hardness testing of steel
                        </div>
                    )}
                </a>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Youtube className="h-6 w-6 text-primary" />
              Metallurgy Basics
            </CardTitle>
            <CardDescription>
              Master the fundamentals of metallurgy with this beginner's guide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="https://youtu.be/Qtwoaj-0cS8"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
            >
              
                {metallurgyBasicsVideo ? (
                    <Image
                        src={metallurgyBasicsVideo.imageUrl}
                        alt={metallurgyBasicsVideo.description}
                        fill
                        className="object-cover"
                        data-ai-hint={metallurgyBasicsVideo.imageHint}
                    />
                ) : (
                    <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                        Go to: Mastering the Basics of Metallurgy
                    </div>
                )}
              
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
