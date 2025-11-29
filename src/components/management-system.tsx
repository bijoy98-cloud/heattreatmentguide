
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  GanttChartSquare,
  Library,
  FileText,
  ClipboardCheck,
  FolderKanban,
  Youtube,
  ArrowRight,
  Package,
  Truck,
  Thermometer,
  Factory,
  Beaker,
  TestTube,
  Building,
  UserCog,
  HardHat,
  Users,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const managementSystems = [
  {
    title: "Heat Treatment Production System",
    description: "A systematic approach to managing the entire production flow of heat treatment operations, ensuring efficiency, consistency, and traceability from start to finish.",
    points: [
      "Job/Order Tracking: Following parts from receipt to dispatch.",
      "Process Parameter Control: Ensuring furnaces and equipment are programmed with correct recipes for each job.",
      "Scheduling & Capacity Planning: Optimizing furnace usage and managing lead times.",
      "Data Logging: Automatically recording temperature, time, and atmosphere data for every cycle.",
      "Maintenance Management: Scheduling preventative maintenance to minimize downtime and ensure equipment accuracy.",
    ],
  },
  {
    title: "Quality Management System (QMS)",
    description: "A formal system that documents processes, procedures, and responsibilities for achieving quality policies and objectives. In heat treatment, this is critical for meeting industry standards like CQI-9 or ISO 9001.",
    points: [
      "Documentation & Control: Managing standard operating procedures (SOPs), work instructions, and specifications.",
      "Calibration & Verification: Ensuring all measurement and testing equipment (thermocouples, hardness testers) are accurate.",
      "Non-conformance & Corrective Action: A systematic process for handling parts that don't meet specifications and preventing recurrence.",
      "Traceability: Maintaining records to trace a part's entire history, including material certificates and heat treatment cycle data.",
      "Internal Audits & Management Review: Regularly reviewing the system's effectiveness and driving continuous improvement.",
    ],
  },
];

const processFlowSteps = [
    { name: "Receiving", icon: Package },
    { name: "Inspection", icon: ClipboardCheck },
    { name: "Pre-Cleaning", icon: Beaker },
    { name: "Loading / Racking", icon: GanttChartSquare },
    { name: "Heat Treatment", icon: Factory },
    { name: "Quenching", icon: Thermometer },
    { name: "Tempering", icon: Thermometer },
    { name: "Final Testing", icon: TestTube },
    { name: "Shipping", icon: Truck },
];


const standards = [
  {
    title: "AMS 2750 (Pyrometry)",
    description: "The aerospace industry standard for pyrometry. It governs temperature sensors, instrumentation, furnace temperature uniformity surveys (TUS), and system accuracy tests (SAT).",
  },
  {
    title: "CQI-9 (AIAG Heat Treat System Assessment)",
    description: "An automotive industry self-assessment for managing and improving heat treatment processes, ensuring consistent quality and control.",
  },
  {
    title: "ISO 9001 (Quality Management)",
    description: "A foundational international standard for a quality management system (QMS), focusing on customer satisfaction, process control, and continual improvement.",
  },
  {
    title: "AS9100",
    description: "The quality management systems standard for the aviation, space, and defense industries. It builds upon ISO 9001 with additional requirements specific to the aerospace industry.",
  },
  {
    title: "ASTM Standards",
    description: "ASTM International provides numerous standards for specific test methods, such as ASTM E18 for Rockwell hardness testing or ASTM E112 for determining grain size.",
  },
  {
    title: "Nadcap",
    description: "The National Aerospace and Defense Contractors Accreditation Program. An industry-managed approach to conformity assessment that brings together technical experts from prime contractors, suppliers, and government to establish requirements for special processes like heat treating.",
  },
];

const templates = [
    {
        title: "Furnace Log Template",
        description: "Essential for traceability. A furnace log should capture all critical parameters for each heat treat cycle.",
        fields: [
            "Date & Time",
            "Furnace ID",
            "Operator Name/ID",
            "Job or Work Order Number",
            "Material & Part Number",
            "Temperature Setpoint & Actual",
            "Cycle Duration (Soak Time)",
            "Atmosphere Conditions (if applicable)",
            "Quench Medium & Temperature",
        ]
    },
    {
        title: "Temperature Uniformity Survey (TUS) Record",
        description: "Documents the temperature variation within a furnace's working volume to ensure it meets the required uniformity for its class.",
        fields: [
            "Survey Date",
            "Furnace ID & Class",
            "Test Temperature(s)",
            "TC Locations (Diagram)",
            "Corrective Factors for each TC",
            "Stabilization Time & Readings",
            "Max/Min Temperatures Recorded",
            "Calculated Uniformity (+/-)",
            "Pass/Fail Result",
        ]
    }
]

const roles = [
    {
        icon: Building,
        title: "Plant Manager / General Manager",
        description: "Oversees all plant operations, including production, quality, safety, and financial performance."
    },
    {
        icon: Briefcase,
        title: "Customer Service / Business Development",
        description: "Manages client relationships, provides quotes, handles inquiries, and seeks new business opportunities."
    },
    {
        icon: UserCog,
        title: "Administrator / Management",
        description: "Handles administrative tasks, customer communication, scheduling, and supports the management team."
    },
    {
        icon: ClipboardCheck,
        title: "Quality Manager",
        description: "Ensures all products meet customer and industry standards, manages the QMS, and oversees testing and inspection."
    },
    {
        icon: Users,
        title: "Production Supervisor",
        description: "Manages the day-to-day activities on the shop floor, schedules operators, and ensures production targets are met safely."
    },
    {
        icon: HardHat,
        title: "Heat Treat Operator",
        description: "Operates furnaces, prepares and loads parts, monitors cycles, and performs initial quality checks."
    },
    {
        icon: Beaker,
        title: "Metallurgist / Lab Technician",
        description: "Conducts material testing, microstructure analysis, and provides technical support for process development and troubleshooting."
    }
];

const occupationalResponsibilities = [
    { 
      title: "Technical Director/Manager", 
      responsibility: "This senior role is the technical authority for the entire facility. They oversee all metallurgical processes, lead research and development for new treatments, ensure compliance with complex standards like AMS 2750 and Nadcap, and provide the final word on failure analysis and complex troubleshooting. A deep background in materials science or metallurgy is essential." 
    },
    { 
      title: "Process Engineer/Metallurgist", 
      responsibility: "The hands-on expert for process integrity. This role involves designing and optimizing heat treatment cycles (recipes) for new parts, troubleshooting production issues like distortion or cracking, analyzing microstructures to verify results, and providing technical guidance to operators and supervisors to ensure processes are run correctly." 
    },
    { 
      title: "Quality Engineer", 
      responsibility: "The guardian of the Quality Management System (QMS). This individual implements and maintains the QMS to meet standards like ISO 9001 or AS9100, manages internal and external audits, leads root cause analysis for non-conformances, and ensures all documentation and certifications are accurate and complete." 
    },
    { 
      title: "Maintenance Technician/Manager", 
      responsibility: "Keeps the facility running. This role is responsible for the preventative maintenance, urgent repair, and ongoing calibration of all furnaces, quench systems, and support equipment. Their work is critical for ensuring equipment accuracy and minimizing costly downtime." 
    },
    { 
      title: "Sales Engineer", 
      responsibility: "The bridge between the customer and the shop floor. This person combines deep technical knowledge with sales skills to understand customer needs, provide accurate quotes for complex jobs, and offer technical solutions that align with the facility's capabilities. They translate customer blueprints into actionable work orders." 
    },
    { 
      title: "Safety Coordinator/Manager", 
      responsibility: "The champion for a safe workplace. This role ensures the facility complies with all safety regulations (e.g., OSHA), develops and conducts safety training for all personnel, manages the Personal Protective Equipment (PPE) program, and leads incident investigations to prevent future accidents." 
    }
];

export function ManagementSystem() {
  const managementVideo = PlaceHolderImages.find(img => img.id === 'management-system-video');
  const qmsPlaylistVideo = PlaceHolderImages.find(img => img.id === 'qms-playlist');
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <GanttChartSquare className="h-8 w-8 text-primary" />
          Management & Documentation
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Effective management systems and documentation are the backbone of a reliable and efficient heat treatment operation, ensuring both quality and compliance.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Users className="h-6 w-6"/>Company Organizational Structure</CardTitle>
            <CardDescription className="text-justify">A look at a typical hierarchy in a heat treatment facility.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4 text-justify">A successful heat treatment operation relies on a well-defined structure where each role has clear responsibilities. While smaller shops may combine roles, larger facilities often have a dedicated team for each function.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {roles.map((role) => (
                <div key={role.title} className="p-4 bg-muted/50 rounded-lg text-center">
                    <role.icon className="h-8 w-8 text-primary mx-auto mb-2"/>
                    <p className="font-semibold text-sm">{role.title}</p>
                </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Roles & Responsibilities</CardTitle>
          <CardDescription className="text-justify">
            Understanding the duties of each team member is crucial for a smooth and effective operation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {roles.map((role) => (
            <div key={role.title} className="flex items-start gap-4 p-3 border-b last:border-b-0">
                <role.icon className="h-6 w-6 text-primary mt-1 shrink-0"/>
                <div>
                    <h4 className="font-semibold">{role.title}</h4>
                    <p className="text-sm text-muted-foreground text-justify">{role.description}</p>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle>Occupational Title and Responsibility</CardTitle>
            <CardDescription className="text-justify">
              A breakdown of specialized roles and their core responsibilities within the heat treatment industry.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {occupationalResponsibilities.map((role) => (
              <div key={role.title} className="p-3 border-b last:border-b-0">
                  <h4 className="font-semibold">{role.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1 text-justify">{role.responsibility}</p>
              </div>
            ))}
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FolderKanban className="h-6 w-6 text-primary" />
            Typical Heat Treatment Process Flow
          </CardTitle>
          <CardDescription className="text-justify">
            A visual guide to the journey a part takes through a heat treatment facility, from receiving to shipping.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap items-center gap-4">
                {processFlowSteps.map((step, index) => (
                    <div key={step.name} className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                                <step.icon className="h-8 w-8 text-primary"/>
                           </div>
                           <p className="text-sm font-semibold">{step.name}</p>
                        </div>
                        {index < processFlowSteps.length - 1 && (
                            <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block"/>
                        )}
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {managementSystems.map((system) => (
          <Card key={system.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{system.title}</CardTitle>
              <CardDescription className="text-justify">{system.description}</CardDescription>
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

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Library className="h-6 w-6 text-primary" />
            Standards Library
          </CardTitle>
          <CardDescription className="text-justify">
            Summaries of key industry standards that govern heat treatment quality and processes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {standards.map((standard) => (
                <Card key={standard.title}>
                    <CardHeader>
                        <CardTitle className="text-xl">{standard.title}</CardTitle>
                        <CardDescription className="pt-2 text-justify">{standard.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            Document Template Guide
          </CardTitle>
          <CardDescription className="text-justify">
            Key fields to include in your critical heat treatment documents. While not downloadable templates, this guide ensures you capture the necessary data for compliance.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {templates.map((template) => (
            <Card key={template.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <CardDescription className="text-justify">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="mb-2 font-semibold text-sm">Essential Fields:</h4>
                <ul className="space-y-2">
                  {template.fields.map((field) => (
                    <li key={field} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {field}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Youtube className="h-6 w-6 text-primary" />
              Heat Treatment Management System
            </CardTitle>
            <CardDescription className="text-justify">
              Optimize Your Process with Expert Insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <a href="https://youtu.be/dzvW_sUtClI" target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                  {managementVideo ? (
                    <Image
                        src={managementVideo.imageUrl}
                        alt={managementVideo.description}
                        fill
                        className="object-cover"
                        data-ai-hint={managementVideo.imageHint}
                    />
                ) : (
                  <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                      Go to YouTube Video
                  </div>
                )}
              </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Youtube className="h-6 w-6 text-primary" />
              QMS Training Playlist
            </CardTitle>
            <CardDescription className="text-justify">
              Watch our video series on Quality Management Systems to learn more about ISO 9001 and other standards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href="https://www.youtube.com/playlist?list=PL2FvUd3wBb6A9_Y7dN_7P1SEm1-yHD269" target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                {qmsPlaylistVideo ? (
                    <Image
                        src={qmsPlaylistVideo.imageUrl}
                        alt={qmsPlaylistVideo.description}
                        fill
                        className="object-cover"
                        data-ai-hint={qmsPlaylistVideo.imageHint}
                    />
                ) : (
                  <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                      Go to YouTube Playlist
                  </div>
                )}
            </a>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

    
    