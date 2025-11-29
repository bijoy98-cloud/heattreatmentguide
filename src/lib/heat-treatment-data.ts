
import type { LucideIcon } from "lucide-react";
import {
  Flame,
  Wind,
  Thermometer,
  BookOpen,
  Wrench,
  List,
  Sparkles,
  RefreshCw,
  Youtube,
  Layers,
  CloudSnow,
  CircleDot,
  Waves,
  Gem,
  Droplets,
  Zap,
  Snowflake,
  Hourglass,
  Torus,
  Feather,
  Sun,
  Hammer,
  Recycle,
  Scan,
  ChevronsUpDown,
  Atom,
  Eye,
  Scaling,
  FlipVertical,
  Minus,
  Magnet,
  Filter,
  Minimize2,
  Maximize2,
  Box,
  Component,
  Replace,
  Blend,
  Shield,
  Link,
  HelpCircle,
  Calculator,
  BarChart,
  Book,
  Home,
  Webhook,
  GanttChartSquare,
  ShieldAlert,
  Scale,
  Briefcase,
  FolderKanban,
  Users,
  Cpu,
  Database,
  Factory,
  Glasses,
  ListChecks,
  ShieldCheck,
  BadgeCheck,
  HardHat,
  GraduationCap,
  Bot,
  CreditCard,
  Info,
  Search,
  History,
  MessageSquare,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
  hidden?: boolean;
  description?: string;
  parent?: string;
  children?: NavItem[];
};

export const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: Home, hidden: true },
  { 
    href: "/ai-features", 
    label: "AI Features", 
    icon: Cpu, 
    description: "A suite of AI-powered tools for metallurgy analysis.",
    children: [
        { href: "/suggestion", parent: "ai-features", label: "AI Material Suggestion", icon: Sparkles, description: "Get AI-based recommendations for materials and heat treatments." },
        { href: "/fault-diagnosis", parent: "ai-features", label: "AI Fault Diagnosis", icon: Wrench, description: "Diagnose heat treatment faults with the help of AI." },
        { href: "/image-analyzer", parent: "ai-features", label: "AI Image Analyzer", icon: Scan, description: "Analyze microstructures and defects from images." },
        { href: "/ask-gemini", parent: "ai-features", label: "Live AI Chat", icon: MessageSquare, description: "Chat with a virtual metallurgist for instant answers." },
    ]
  },
  { 
    href: "/industrial-safety", 
    label: "Industrial Safety", 
    icon: ShieldAlert,
    children: [
        { href: "/hazard-identification", parent: "industrial-safety", label: "Hazard ID Tool", icon: ListChecks, description: "An interactive checklist to identify and mitigate potential hazards." },
        { href: "/ppe-guide", parent: "industrial-safety", label: "PPE Guide", icon: Glasses, description: "An interactive guide to essential Personal Protective Equipment." },
    ]
  },
  {
    href: "/fundamental",
    label: "Fundamental",
    icon: Atom,
    description: "Explore the core concepts of metallurgy.",
    children: [
        { href: "/alloy-database", parent: "fundamental", label: "Alloy Database", icon: Database, description: "A searchable database of common steel alloys." },
        { href: "/glossary", parent: "fundamental", label: "Glossary of Terms", icon: List, description: "A searchable glossary of common terms." },
    ]
  },
  {
    href: "/calculators",
    label: "Calculators",
    icon: Calculator,
    description: "Access our suite of heat treatment calculators.",
    children: [
        { href: "/calculator", parent: "calculators", label: "Process Parameter", icon: Calculator, description: "Rule-based calculator for process parameters." },
        { href: "/hardness-calculator", parent: "calculators", label: "Hardness Calculator", icon: Bot, description: "AI-powered calculator for hardness-based processes." },
    ]
  },
  { 
    href: "/processes", 
    label: "Process Explanations", 
    icon: BookOpen,
    children: [
        { href: "/carburizing", parent: "processes", label: "Carburising Process", icon: Layers, description: "An in-depth guide to the steel carburizing process." },
        { href: "/plasma-nitriding", parent: "processes", label: "Nitriding Processes", icon: Component, description: "Explore plasma and gas nitriding for surface hardening." },
        { href: "/brazing", parent: "processes", label: "Brazing Process", icon: Link, description: "Learn the principles of joining metals with a filler material." },
    ]
  },
  {
    href: "/industrial-tools",
    label: "Tools & References",
    icon: Briefcase,
    description: "A suite of utilities for heat treatment professionals.",
  },
  {
    href: "/quality-assurance",
    label: "Quality Assurance",
    icon: BadgeCheck,
    description: "Learn about testing, analysis, and compliance in heat treatment.",
    hidden: false
  },
  { href: "/metallurgy-insights", label: "Metallurgy Insights", icon: BarChart, hidden: true },
  {
    href: "/management-system",
    label: "Management System",
    icon: GanttChartSquare,
    description: "Explore the management systems and documentation standards.",
    hidden: false
  },
  { href: "/community", label: "Community Network", icon: Users },
  { href: "/skill-development", label: "Skill Development", icon: GraduationCap },
  { href: "/course", label: "Course Program", icon: Book },
  { href: "/pricing", label: "Pricing", icon: CreditCard, hidden: true },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/admin", label: "Admin", icon: ShieldCheck, hidden: true },
];

export type Process = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  steps: { title: string; description: string }[];
};

export const processesInfo: Process[] = [
  {
    id: "annealing",
    name: "Annealing",
    icon: Thermometer,
    description:
      "A heat treatment that alters the microstructure of a material to change its mechanical properties. Typically, in steels, annealing is used to reduce hardness, increase ductility and help eliminate internal stresses.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the steel to a specific temperature (austenitizing temperature), which is typically above its upper critical temperature.",
      },
      {
        title: "Soaking",
        description:
          "Hold the steel at this temperature for a set amount of time to allow the internal structure (crystal structure) to fully transform into austenite.",
      },
      {
        title: "Cooling",
        description:
          "Cool the steel at a very slow and controlled rate, often by leaving it in the furnace to cool down. This slow cooling allows for the formation of a soft, ductile microstructure.",
      },
    ],
  },
  {
    id: "hardening",
    name: "Hardening",
    icon: Zap,
    description:
      "A process to increase the hardness of steel by heating it to the austenitizing temperature, and then rapidly cooling (quenching) it to form a very hard microstructure called martensite.",
    steps: [
      {
        title: "Austenitizing",
        description:
          "Heat the steel to a temperature where its crystal structure transforms to austenite.",
      },
      {
        title: "Soaking",
        description:
          "Hold the steel at the austenitizing temperature to ensure the entire part is uniformly heated and transformed.",
      },
      {
        title: "Quenching",
        description:
          "Cool the steel rapidly in a medium like water, oil, or air to trap the carbon atoms and form hard martensite.",
      },
      {
        title: "Tempering",
        description:
          "Reheat the hardened steel to a lower temperature to reduce brittleness and increase toughness.",
      },
    ],
  },
  {
    id: "ausforming",
    name: "Ausforming (Thermomechanical Treatment)",
    icon: Hammer,
    description:
      "A thermomechanical process where steel is plastically deformed while in its metastable austenitic state. This results in an extremely fine and highly dislocated martensite upon quenching, leading to ultra-high strength.",
    steps: [
      {
        title: "Austenitizing",
        description: "Heat the steel to form a fully austenitic structure.",
      },
      {
        title: "Cooling to Bay",
        description:
          "Cool the steel to a temperature within the 'bay' of the TTT diagram, where austenite is metastable (above Ms but below the pearlite nose).",
      },
      {
        title: "Mechanical Working",
        description:
          "Perform significant plastic deformation (e.g., rolling, forging) on the steel while it is held at this temperature.",
      },
      {
        title: "Quenching",
        description:
          "Quench the deformed austenite to transform it into a very fine and highly dislocated martensite.",
      },
    ],
  },
  {
    id: "austempering",
    name: "Austempering",
    icon: Hourglass,
    description:
      "A hardening process that creates a bainitic microstructure, providing improved ductility, toughness, and dimensional stability compared to conventional quench and temper methods.",
    steps: [
      {
        title: "Austenitizing",
        description:
          "Heat the steel to the appropriate austenitizing temperature to form a fully austenitic structure.",
      },
      {
        title: "Quenching to Bainite Range",
        description:
          "Rapidly cool the steel in a molten salt bath to a temperature just above the martensite start temperature (Ms), typically between 260°C and 400°C.",
      },
      {
        title: "Isothermal Hold",
        description:
          "Hold the steel at this temperature for a sufficient time to allow the austenite to transform completely into bainite.",
      },
      {
        title: "Cooling",
        description:
          "Cool the part to room temperature, usually in air. No final tempering is typically needed.",
      },
    ],
  },
  {
    id: "austenite-conditioning",
    name: "Austenite Conditioning",
    icon: Blend,
    description:
      "A term for carefully controlling the austenitizing process (temperature and time) to dissolve carbides and homogenize the austenite, which directly impacts the hardenability and final grain size of the steel.",
    steps: [
      {
        title: "Precise Heating",
        description:
          "Heat to a specific temperature above Ac3. Too low, and carbides won't dissolve; too high, and grain growth becomes excessive.",
      },
      {
        title: "Controlled Soaking",
        description:
          "Hold for just enough time to achieve chemical homogeneity in the austenite without allowing for significant grain growth. This is critical for high-alloy tool steels.",
      },
      {
        title: "Quenching",
        description:
          "Follow with a quench. The condition of the austenite directly determines the quality and properties of the resulting martensite.",
      },
    ],
  },
  {
    id: "boriding",
    name: "Boriding (Boronizing)",
    icon: Replace,
    description:
      "A thermochemical surface hardening process where boron atoms are diffused into the surface of a metal. It produces an extremely hard surface layer (iron boride) with exceptional wear and abrasion resistance.",
    steps: [
      {
        title: "Heating in Boron-Rich Medium",
        description:
          "Heat the part in a boron-rich environment (pack, paste, gas, or liquid) to a high temperature, typically 800-1050°C.",
      },
      {
        title: "Soaking",
        description:
          "Hold at temperature for several hours to allow boron to diffuse and react with the base metal, forming a very hard boride layer.",
      },
      {
        title: "Cooling",
        description:
          "The part is cooled. A subsequent quench-and-temper cycle may be required for the core material depending on the steel grade.",
      },
    ],
  },
  {
    id: "carbonitriding",
    name: "Carbonitriding",
    icon: Feather,
    description:
      "A modified case-hardening process that introduces both carbon and nitrogen into the surface of a steel. It produces a harder and more wear-resistant case than carburizing, often with better fatigue strength.",
    steps: [
      {
        title: "Heating in Gaseous Atmosphere",
        description:
          "Heat the steel in a furnace containing a gaseous atmosphere of a carbon-providing gas (like natural gas) and a nitrogen-providing gas (like ammonia).",
      },
      {
        title: "Soaking",
        description:
          "Hold at a temperature typically between 800°C and 900°C to allow both carbon and nitrogen to diffuse into the steel surface.",
      },
      {
        title: "Quenching",
        description:
          "Quench the part, usually in oil, to harden the case. The added nitrogen increases hardenability, allowing for a less severe quench than required for simple carburizing.",
      },
      {
        title: "Tempering",
        description:
          "Temper at a low temperature to reduce brittleness of the hardened case.",
      },
    ],
  },
  {
    id: "carburizing",
    name: "Carburizing",
    icon: Layers,
    description:
      "A case-hardening process in which carbon is diffused into the surface of a low-carbon steel to create a hard, wear-resistant outer layer (case) while maintaining a softer, tougher core.",
    steps: [
      {
        title: "Heating in a Carbon-Rich Atmosphere",
        description:
          "Heat the low-carbon steel in a furnace with a carbon-rich environment (e.g., gas, liquid, or solid carburizing compound) to a temperature in the austenitic range (typically 900-950°C).",
      },
      {
        title: "Soaking",
        description:
          "Hold the steel at this temperature for a sufficient time to allow carbon to diffuse into the surface to the desired depth.",
      },
      {
        title: "Quenching & Tempering",
        description:
          "Quench the steel to harden the high-carbon case, followed by a low-temperature tempering to reduce brittleness and increase toughness.",
      },
    ],
  },
  {
    id: "cold-working",
    name: "Cold Working",
    icon: Snowflake,
    description: "The plastic deformation of a metal at a temperature below its recrystallization temperature. This process increases strength and hardness (strain hardening) but reduces ductility.",
    steps: [
      {
        title: "Deformation",
        description: "Apply mechanical force to the metal at or near room temperature, causing plastic deformation through processes like rolling, drawing, or bending."
      },
      {
        title: "Strain Hardening",
        description: "The deformation creates and tangles dislocations within the crystal structure, making further deformation more difficult, thus increasing strength and hardness."
      },
      {
        title: "Anisotropy",
        description: "The grains become elongated in the direction of working, resulting in directional properties (anisotropy)."
      }
    ]
  },
  {
    id: "cryogenic-treatment",
    name: "Cryogenic Treatment",
    icon: Snowflake,
    description:
      "A supplementary process that involves cooling steel parts to cryogenic temperatures (below -150°C) after conventional heat treatment to improve wear resistance, toughness, and dimensional stability.",
    steps: [
      {
        title: "Initial Heat Treatment",
        description:
          "Perform standard quenching and a low-temperature temper on the steel part.",
      },
      {
        title: "Slow Cooling",
        description:
          "Slowly and controllably ramp down the temperature of the part to cryogenic levels (typically around -185°C using liquid nitrogen).",
      },
      {
        title: "Soaking",
        description:
          "Hold the part at the cryogenic temperature for an extended period (e.g., 24 hours). This transforms most of the retained austenite into martensite.",
      },
      {
        title: "Slow Warming & Tempering",
        description:
          "Slowly bring the part back to room temperature, followed by one or more post-treatment tempering cycles to temper the newly formed martensite and relieve stresses.",
      },
    ],
  },
  {
    id: "demagnetization",
    name: "Demagnetization",
    icon: Magnet,
    description:
      "A process to remove unwanted residual magnetism from steel parts, often necessary after processes like induction heating or magnetic particle inspection. While not a microstructural heat treatment, it's a critical thermal/magnetic process.",
    steps: [
      {
        title: "Applying an Alternating Field",
        description:
          "Subject the part to an alternating magnetic field that is stronger than the part's coercivity.",
      },
      {
        title: "Gradual Reduction",
        description:
          "Slowly decrease the strength of the AC field to zero, or slowly move the part away from the field. This randomizes the magnetic domains.",
      },
      {
        title: "Verification",
        description:
          "Use a gaussmeter to confirm that the residual magnetism has been reduced to an acceptable level.",
      },
    ],
  },
  {
    id: "selective-hardening",
    name: "Differential (Selective) Hardening",
    icon: Eye,
    description:
      "A technique, famously used for swords and knives, to harden one part of a steel object (like the cutting edge) while leaving another part (like the spine) softer and tougher.",
    steps: [
      {
        title: "Insulating",
        description:
          "Apply a heat-insulating layer, such as a special clay mixture, to the parts of the steel that are intended to remain soft. The layer is applied thinly or not at all on the edge to be hardened.",
      },
      {
        title: "Heating",
        description: "Heat the entire object to its austenitizing temperature.",
      },
      {
        title: "Quenching",
        description:
          "Quench the object in a suitable medium like water or oil. The insulated (thicker clay) sections cool more slowly, forming softer pearlite or bainite, while the exposed edge cools rapidly to form hard martensite.",
      },
    ],
  },
  {
    id: "ferritic-nitrocarburizing",
    name: "Ferritic Nitrocarburizing (FNC)",
    icon: Atom,
    description:
      "A sub-critical case hardening process that diffuses nitrogen and a small amount of carbon into the steel surface, primarily in the ferritic phase. It creates a thin, very hard, and lubricious compound layer with excellent wear and corrosion resistance.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the part in a gaseous or salt bath medium containing nitrogen and carbon potential at a temperature below the lower critical point (typically 570°C).",
      },
      {
        title: "Soaking",
        description:
          "Hold for a relatively short time (e.g., 1-3 hours) to form a compound layer (epsilon iron nitride) and a diffusion zone underneath.",
      },
      {
        title: "Cooling/Quenching",
        description:
          "Cool or quench the part. This process provides significant surface hardness and improved properties with minimal distortion.",
      },
    ],
  },
  {
    id: "flame-hardening",
    name: "Flame Hardening",
    icon: Sun,
    description:
      "A surface hardening method where a high-temperature flame is applied to the surface of a hardenable steel, followed by immediate quenching. It is versatile and can be used for large or complex parts.",
    steps: [
      {
        title: "Flame Application",
        description:
          "Use a specially designed torch head to apply a high-temperature oxy-fuel flame (like oxy-acetylene) to the surface that needs hardening.",
      },
      {
        title: "Heating",
        description:
          "Heat the surface layer rapidly to the austenitizing temperature.",
      },
      {
        title: "Quenching",
        description:
          "Immediately follow the flame with a quenching medium, typically a water-based spray, to cool and harden the surface.",
      },
      {
        title: "Tempering",
        description:
          "Temper the part as needed to achieve the desired balance of hardness and toughness in the case.",
      },
    ],
  },
  {
    id: "full-annealing",
    name: "Full Annealing",
    icon: Maximize2,
    description:
      "The standard annealing process for hypo-eutectoid steels (carbon < 0.77%) to produce a soft, ductile, and coarse pearlitic structure, making the steel easy to machine.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the steel to about 30-50°C above the upper critical temperature (Ac3) to form a fully austenitic structure.",
      },
      {
        title: "Slow Cooling",
        description:
          "Cool the steel very slowly, typically by leaving it in the furnace to cool down over a long period.",
      },
      {
        title: "Transformation",
        description:
          "The slow cooling rate allows for the formation of a coarse pearlite and ferrite microstructure, resulting in low hardness and high ductility.",
      },
    ],
  },
  {
    id: "gas-carburizing",
    name: "Gas Carburizing",
    icon: Layers,
    description: "The most common method of carburizing, where the carbon is introduced from a carbon-rich gas atmosphere within a furnace. It allows for precise control over case depth and carbon content.",
    steps: [
      {
        title: "Heating in Endothermic Gas",
        description: "Heat the steel in an endothermic gas atmosphere, which acts as a carrier. A hydrocarbon gas (like methane) is added to enrich the atmosphere with carbon."
      },
      {
        title: "Carbon Diffusion",
        description: "Hold at a high temperature (around 925°C) to allow carbon to diffuse into the steel surface. The carbon potential of the gas is carefully controlled."
      },
      {
        title: "Direct Quench or Slow Cool",
        description: "Parts can be directly quenched from the furnace to harden the case, or slow cooled for later hardening."
      }
    ]
  },
  {
    id: "grain-refining",
    name: "Grain Refining",
    icon: Scaling,
    description:
      "Any process that results in a smaller average grain size in a polycrystalline metal. Finer grains generally lead to higher strength and better toughness (according to the Hall-Petch relationship).",
    steps: [
      {
        title: "Method 1: Normalizing",
        description:
          "Heating a steel above its Ac3 temperature and then air cooling creates a new, finer set of grains compared to a slow furnace cool.",
      },
      {
        title: "Method 2: Mechanical Working",
        description:
          "Hot working (forging, rolling) a metal above its recrystallization temperature breaks down large grains and allows new, finer grains to form.",
      },
      {
        title: "Method 3: Alloying",
        description:
          "Adding specific elements (e.g., aluminum, titanium, niobium) can act as grain refiners by providing nucleation sites for new grains or by pinning grain boundaries and preventing them from growing too large.",
      },
    ],
  },
  {
    id: "homogenizing",
    name: "Homogenizing",
    icon: ChevronsUpDown,
    description:
      "A high-temperature heat treatment applied to cast ingots or large forgings to reduce chemical segregation (coring) that occurs during solidification. It creates a more uniform (homogeneous) chemical composition throughout the material.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the cast alloy to a very high temperature, typically close to (but below) the solidus temperature where melting begins.",
      },
      {
        title: "Soaking",
        description:
          "Hold at this high temperature for an extended period (many hours) to allow for atomic diffusion to even out the concentrations of alloying elements across the dendritic structure.",
      },
      {
        title: "Cooling",
        description:
          "Cool the material. The subsequent cooling rate can vary depending on the alloy and desired properties.",
      },
    ],
  },
  {
    id: "hot-working",
    name: "Hot Working",
    icon: Hammer,
    description: "The process of plastically deforming a metal at a temperature above its recrystallization temperature. This allows for large shape changes and simultaneously refines the grain structure.",
    steps: [
      {
        title: "Heating",
        description: "Heat the metal workpiece to a temperature well above its recrystallization point."
      },
      {
        title: "Deformation",
        description: "Apply mechanical force to shape the metal (e.g., through rolling, forging, or extrusion). The deformed grains immediately begin to recrystallize."
      },
      {
        title: "Cooling",
        description: "Cool the workpiece. The final grain size is determined by the deformation temperature and cooling rate."
      }
    ]
  },
  {
    id: "induction-hardening",
    name: "Induction Hardening",
    icon: Torus,
    description:
      "A surface hardening process that uses electromagnetic induction to heat a localized area of a part, which is then quenched. It creates a hard, wear-resistant surface while the core remains tough.",
    steps: [
      {
        title: "Coil Placement",
        description:
          "Place a copper coil, which carries a high-frequency alternating current, around or near the area to be hardened.",
      },
      {
        title: "Induction Heating",
        description:
          "Pass current through the coil, creating a rapidly alternating magnetic field that induces eddy currents in the steel, generating intense localized heat above its transformation temperature.",
      },
      {
        title: "Quenching",
        description:
          "Immediately quench the heated area, often with a water-based spray integrated into the coil system, to form martensite on the surface.",
      },
      {
        title: "Tempering",
        description:
          "Perform a low-temperature temper to relieve stresses and increase the toughness of the hardened case.",
      },
    ],
  },
  {
    id: "intercritical-annealing",
    name: "Intercritical Annealing",
    icon: Thermometer,
    description: "A heat treatment where steel is heated to a temperature between the lower (Ac1) and upper (Ac3) critical temperatures, creating a mixed structure of ferrite and austenite. This is a key step in producing dual-phase steels.",
    steps: [
      {
        title: "Heating",
        description: "Heat the steel to a temperature within the intercritical region (between Ac1 and Ac3)."
      },
      {
        title: "Soaking",
        description: "Hold at this temperature to form a controlled mixture of ferrite and high-carbon austenite."
      },
      {
        title: "Cooling",
        description: "Cool at a rate sufficient to transform the austenite into martensite, resulting in a final structure of soft ferrite islands in a hard martensite matrix."
      }
    ]
  },
  {
    id: "isothermal-annealing",
    name: "Isothermal Annealing",
    icon: Minus,
    description:
      "A more time-efficient annealing process that produces a uniform pearlitic structure. It involves cooling to and holding at a constant temperature until the austenite-to-pearlite transformation is complete.",
    steps: [
      {
        title: "Austenitizing",
        description:
          "Heat the steel to its full austenitizing temperature.",
      },
      {
        title: "Rapid Cooling",
        description:
          "Rapidly cool the steel down to a temperature just below the lower critical temperature (Ac1), into the upper pearlite region of the TTT diagram.",
      },
      {
        title: "Isothermal Hold",
        description:
          "Hold at this temperature for the time required to complete the transformation to a uniform ferrite-pearlite structure.",
      },
      {
        title: "Cooling",
        description:
          "Cool the part to room temperature; the rate is not critical.",
      },
    ],
  },
  {
    id: "laser-hardening",
    name: "Laser Hardening",
    icon: Scan,
    description:
      "A surface treatment process that uses a high-power laser beam to rapidly heat a very small, selective area on a steel surface. The surrounding cold mass of the material then acts as a heat sink, causing extremely rapid cooling (self-quenching).",
    steps: [
      {
        title: "Surface Preparation",
        description:
          "The surface may be coated with an absorptive layer (like manganese phosphate) to increase the energy absorbed from the laser.",
      },
      {
        title: "Laser Scanning",
        description:
          "A CNC-controlled laser beam scans across the surface, heating the material into the austenite range in milliseconds.",
      },
      {
        title: "Self-Quenching",
        description:
          "As the laser moves on, the bulk of the cold material rapidly draws heat from the surface, causing a quench faster than traditional methods, forming martensite.",
      },
    ],
  },
  {
    id: "liquid-carburizing",
    name: "Liquid Carburizing",
    icon: Droplets,
    description: "A case hardening process where parts are immersed in a molten salt bath containing cyanide compounds. It provides a source of both carbon and nitrogen, resulting in a hard, wear-resistant case.",
    steps: [
      {
        title: "Immersion",
        description: "Immerse the steel parts in a molten cyanide salt bath at a temperature of 850-950°C."
      },
      {
        title: "Soaking",
        description: "Hold the parts in the bath for a specified time to allow carbon (and some nitrogen) to diffuse into the surface."
      },
      {
        title: "Quenching",
        description: "Remove the parts from the salt bath and quench them directly in oil or water to harden the case."
      },
      {
        title: "Cleaning and Tempering",
        description: "Thoroughly clean the parts to remove residual salt, followed by a low-temperature temper."
      }
    ]
  },
  {
    id: "martempering",
    name: "Martempering (Marquenching)",
    description:
      "A modified quenching process where a part is quenched in a medium held just above the martensite start (Ms) temperature, equalized, and then air-cooled. This minimizes distortion and residual stresses.",
    icon: Droplets,
    steps: [
      {
        title: "Austenitizing",
        description: "Heat the steel to its proper austenitizing temperature.",
      },
      {
        title: "Interrupted Quench",
        description:
          "Quench the part in a hot fluid medium (e.g., molten salt or hot oil) to a temperature slightly above the martensite start (Ms) temperature.",
      },
      {
        title: "Equalization",
        description:
          "Hold at this temperature until the temperature is uniform throughout the part's cross-section, but not long enough to permit bainite to form.",
      },
      {
        title: "Air Cooling & Tempering",
        description:
          "Cool the part in air to room temperature. This slow cooling through the martensite transformation range minimizes stress. The part is then tempered like a conventionally quenched part.",
      },
    ],
  },
  {
    id: "nitriding",
    name: "Nitriding",
    icon: CloudSnow,
    description:
      "A case-hardening process that diffuses nitrogen into the surface of a steel to create a very hard, wear-resistant surface. It is performed at lower temperatures than carburizing.",
    steps: [
      {
        title: "Heating in a Nitrogen-Rich Atmosphere",
        description:
          "Heat the steel in a sealed furnace containing a nitrogen-rich medium (typically ammonia gas) to a temperature of 500-550°C.",
      },
      {
        title: "Soaking",
        description:
          "Hold at temperature for an extended period (can be 24-96 hours) to allow nitrogen to diffuse and form hard nitrides in the surface layer.",
      },
      {
        title: "Cooling",
        description:
          "Slowly cool the part. No quenching is required, which minimizes distortion compared to other hardening methods.",
      },
    ],
  },
  {
    id: "nitrocarburizing",
    name: "Nitrocarburizing",
    icon: Atom,
    description: "A category of case hardening processes that diffuse both nitrogen and carbon into the steel surface at sub-critical temperatures. Ferritic Nitrocarburizing (FNC) is a primary example.",
    steps: [
      {
        title: "Surface Treatment",
        description: "A thermochemical diffusion process where nitrogen and carbon are introduced to the surface of ferrous metals."
      },
      {
        title: "Compound Layer Formation",
        description: "Forms a hard, wear-resistant compound layer on the surface and a diffusion zone below it."
      },
      {
        title: "Improved Properties",
        description: "Significantly improves wear resistance, fatigue strength, and corrosion resistance with minimal distortion."
      }
    ]
  },
  {
    id: "normalizing",
    name: "Normalizing",
    icon: Wind,
    description:
      "A process used to refine the grain size and improve mechanical properties. It results in a harder, stronger steel than annealing but less ductile.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the steel to a temperature slightly higher than that for annealing (about 50°C above the upper critical temperature).",
      },
      {
        title: "Soaking",
        description:
          "Hold the material at the austenitizing temperature for a short period to ensure it is heated uniformly.",
      },
      {
        title: "Cooling",
        description:
          "Remove the steel from the furnace and allow it to cool in still air. The faster cooling rate (compared to annealing) results in a finer, more uniform grain structure.",
      },
    ],
  },
  {
    id: "pack-carburizing",
    name: "Pack Carburizing",
    icon: Box,
    description:
      "A traditional method of case-hardening where low-carbon steel parts are packed in a steel box with a carbon-rich material (like charcoal) and heated for an extended period.",
    steps: [
      {
        title: "Packing",
        description:
          "Place the steel parts in a sealed box, surrounded by a compound of charcoal, and an 'energizer' like barium carbonate.",
      },
      {
        title: "Heating",
        description:
          "Heat the entire box to about 900-950°C. The energizer decomposes to create carbon monoxide gas, which provides the carbon for diffusion.",
      },
      {
        title: "Soaking and Hardening",
        description:
          "Soak for a long period (e.g., 8+ hours) to achieve the desired case depth, then quench the parts to harden the case.",
      },
    ],
  },
  {
    id: "patenting",
    name: "Patenting",
    icon: FlipVertical,
    description:
      "A heat treatment for high-carbon steel wire to produce a microstructure of very fine pearlite (sorbite), which is ideal for subsequent high-strain deformation like wire drawing.",
    steps: [
      {
        title: "Austenitizing",
        description:
          "Heat the steel wire to the austenitizing temperature.",
      },
      {
        title: "Controlled Cooling",
        description:
          "Cool the wire rapidly in a bath of molten lead or a fluidized bed held at a temperature in the pearlite transformation range (around 500-550°C).",
      },
      {
        title: "Transformation",
        description:
          "Hold at this temperature to allow for isothermal transformation into fine pearlite, resulting in high strength and good ductility for subsequent drawing operations.",
      },
    ],
  },
  {
    id: "plasma-nitriding",
    name: "Plasma (Ion) Nitriding",
    icon: Component,
    description:
      "An advanced nitriding process that uses plasma (ionized gas) to introduce nitrogen to the steel surface. It allows for excellent control over the hardened layer and is conducted at low temperatures.",
    steps: [
      {
        title: "Vacuum and Voltage",
        description:
          "Place parts in a vacuum chamber, which is then backfilled with a nitrogen/hydrogen gas mixture. A high DC voltage is applied between the part (cathode) and the chamber wall (anode).",
      },
      {
        title: "Plasma Formation",
        description:
          "The voltage creates a glow discharge plasma around the part. Nitrogen ions bombard the surface, heating it and providing the nitrogen for diffusion.",
      },
      {
        title: "Diffusion",
        description:
          "Hold at a controlled temperature (typically 400-580°C) to form the desired nitride layer and diffusion zone.",
      },
    ],
  },
  {
    id: "precipitation-hardening",
    name: "Precipitation Hardening (Age Hardening)",
    icon: Gem,
    description:
      "A treatment for specific alloys (e.g., certain stainless steels, aluminum, nickel alloys) to increase yield strength. It involves creating fine, uniformly dispersed particles (precipitates) within the metal's grain structure that impede dislocation movement.",
    steps: [
      {
        title: "Solution Treatment",
        description:
          "Heat the alloy to a high temperature to dissolve all the solute atoms into a single-phase solid solution.",
      },
      {
        title: "Quenching",
        description:
          "Rapidly cool the alloy to room temperature to trap the solute atoms in a supersaturated solid solution.",
      },
      {
        title: "Aging (Precipitation)",
        description:
          "Reheat the alloy to a lower, intermediate temperature and hold it for a specific time. This allows the controlled formation of fine precipitate particles.",
      },
    ],
  },
  {
    id: "preheating",
    name: "Preheating",
    icon: Thermometer,
    description: "The process of heating a workpiece before a primary heating operation like welding or austenitizing. It is used to slow the cooling rate, reduce thermal shock, and minimize the risk of cracking.",
    steps: [
      {
        title: "Slow Heating",
        description: "Heat the workpiece uniformly to a specified temperature below the final target temperature."
      },
      {
        title: "Soaking",
        description: "Hold at the preheat temperature to ensure the entire cross-section is at a stable temperature."
      },
      {
        title: "Transfer to Main Heat",
        description: "Move the preheated part to the main heating process (e.g., austenitizing furnace or welding operation)."
      }
    ]
  },
  {
    id: "process-annealing",
    name: "Process Annealing (Sub-critical)",
    icon: Recycle,
    description:
      "A heat treatment performed on cold-worked, low-carbon steel to restore ductility for further processing. It is done at a temperature below the lower critical temperature, so no phase change occurs.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the cold-worked steel to a temperature just below the lower critical temperature (Ac1), usually between 550°C and 700°C.",
      },
      {
        title: "Soaking",
        description:
          "Hold at this temperature long enough to allow for recrystallization, where new, strain-free grains form and grow, replacing the deformed grains.",
      },
      {
        title: "Cooling",
        description:
          "Cool the steel, typically in air. The cooling rate is not critical as no phase transformation takes place.",
      },
    ],
  },
  {
    id: "protective-atmosphere-hardening",
    name: "Protective Atmosphere Hardening",
    icon: Shield,
    description:
      "A general term for hardening processes conducted in a controlled furnace atmosphere (e.g., endothermic gas, nitrogen-methanol blends) to prevent oxidation (scaling) and decarburization during heating.",
    steps: [
      {
        title: "Heating in Controlled Atmosphere",
        description:
          "Heat the parts in a furnace filled with a specific gas mixture that is neutral or slightly carburizing to the steel's surface at austenitizing temperature.",
      },
      {
        title: "Soaking",
        description:
          "Hold at the austenitizing temperature to ensure the part is uniformly heated and in a fully austenitic state.",
      },
      {
        title: "Quenching",
        description:
          "Quench the parts in an integrated oil bath or gas quench chamber, all while remaining within the protective atmosphere to maintain a clean, bright surface.",
      },
    ],
  },
  {
    id: "quenching",
    name: "Quenching",
    icon: Flame,
    description:
      "The rapid cooling of a workpiece in water, oil or air to obtain certain material properties. It prevents low-temperature processes, such as phase transformations, from occurring by only providing a narrow window of time in which the reaction is both thermodynamically favorable and kinetically accessible.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the steel to the austenitizing temperature to form austenite.",
      },
      {
        title: "Soaking",
        description:
          "Ensure the entire part has reached a uniform temperature.",
      },
      {
        title: "Cooling",
        description:
          "Rapidly cool the workpiece in a suitable medium (water, oil, brine, polymer). This rapid cooling 'traps' the carbon atoms, forming martensite, a very hard and brittle structure.",
      },
    ],
  },
  {
    id: "recrystallization-annealing",
    name: "Recrystallization Annealing",
    icon: Recycle,
    description: "A heat treatment used to eliminate the effects of cold working by forming a new set of strain-free grains. This restores ductility and softness to the material. Process annealing is a form of recrystallization annealing.",
    steps: [
      {
        title: "Heating",
        description: "Heat the cold-worked metal to a temperature above its recrystallization temperature."
      },
      {
        title: "Soaking",
        description: "Hold at temperature for a sufficient time for new, equiaxed grains to nucleate and grow."
      },
      {
        title: "Cooling",
        description: "Cool the material back to room temperature. The rate is usually not critical."
      }
    ]
  },
  {
    id: "slack-quenching",
    name: "Slack Quenching",
    icon: Filter,
    description:
      "An incomplete hardening quench where the cooling rate is not fast enough to transform all the austenite to martensite. The resulting microstructure is a mix of martensite, bainite, and/or fine pearlite, leading to lower hardness than a full quench.",
    steps: [
      {
        title: "Austenitizing",
        description:
          "Heat the steel to its austenitizing temperature.",
      },
      {
        title: "Insufficiently Rapid Cooling",
        description:
          "Quench in a medium that is too slow for the steel's section size or hardenability (e.g., using oil for a water-hardening steel). The core or entire part fails to achieve full hardness.",
      },
      {
        title: "Resulting Microstructure",
        description:
          "The final structure contains non-martensitic products, which is usually undesirable when full hardness is the goal.",
      },
    ],
  },
  {
    id: "solution-annealing",
    name: "Solution Annealing",
    icon: Zap,
    description:
      "A high-temperature process used primarily for austenitic stainless steels and other alloys to dissolve carbides and other phases into a solid solution, improving corrosion resistance and ductility.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the material to a high temperature (e.g., 1010-1120°C for 300 series stainless steel) to dissolve chromium carbides.",
      },
      {
        title: "Soaking",
        description:
          "Hold at the temperature long enough for the material to become a uniform solid solution.",
      },
      {
        title: "Rapid Cooling",
        description:
          "Quench the material rapidly (usually in water) to prevent the reformation of carbides, especially at the grain boundaries, which preserves corrosion resistance.",
      },
    ],
  },
  {
    id: "spheroidizing",
    name: "Spheroidizing",
    icon: CircleDot,
    description:
      "An annealing process for high-carbon steels that produces a microstructure where cementite is in the form of small, spheroidal particles embedded in a ferrite matrix. This results in the softest possible state for the steel, providing maximum ductility and machinability.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the steel to a temperature just below the lower critical temperature (Ac1) for a prolonged period, or alternate heating and cooling between temperatures just above and below the Ac1.",
      },
      {
        title: "Soaking",
        description:
          "Hold at the selected temperature for many hours to allow the lamellar cementite (from pearlite) to break down and form into spherical shapes.",
      },
      {
        title: "Cooling",
        description:
          "Cool the steel slowly to room temperature. The final structure is highly machinable and can be easily cold-worked.",
      },
    ],
  },
  {
    id: "stress-relieving",
    name: "Stress Relieving",
    icon: Waves,
    description:
      "A heat treatment used to reduce internal residual stresses in a metal part that have been introduced during manufacturing processes like welding, machining, or cold working. This helps to prevent distortion and cracking over time.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the part uniformly to a temperature well below the lower critical temperature (typically 550-650°C for steels).",
      },
      {
        title: "Soaking",
        description:
          "Hold at the stress-relieving temperature for a sufficient time (usually about 1 hour per inch of thickness) to allow the internal stresses to relax.",
      },
      {
        title: "Cooling",
        description:
          "Cool the part slowly and uniformly, usually in the furnace, to avoid reintroducing thermal stresses.",
      },
    ],
  },
  {
    id: "sub-critical-annealing",
    name: "Sub-critical Annealing",
    icon: Minimize2,
    description:
      "Also known as process annealing, it is performed below the temperature at which austenite begins to form (Ac1). It is used to soften and restore ductility to previously cold-worked metals, allowing for further deformation.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the steel to a temperature below the lower critical temperature, typically between 650°C and 700°C.",
      },
      {
        title: "Soaking",
        description:
          "Hold at this temperature to allow for recrystallization, where new, strain-free grains replace the deformed ones.",
      },
      {
        title: "Cooling",
        description:
          "The cooling rate is generally not critical and is often done in air.",
      },
    ],
  },
  {
    id: "tempering",
    name: "Tempering",
    icon: RefreshCw,
    description:
      "A process of heat treating, which is used to increase the toughness of iron-based alloys. Tempering is usually performed after hardening, to reduce some of the excess hardness.",
    steps: [
      {
        title: "Heating",
        description:
          "Heat the hardened (quenched) steel to a temperature below its lower critical temperature. The specific temperature determines the final properties.",
      },
      {
        title: "Soaking",
        description:
          "Hold at the tempering temperature for a specific time (e.g., 1-2 hours per inch of thickness).",
      },
      {
        title: "Cooling",
        description:
          "Cool the steel in still air. This process reduces hardness and brittleness while increasing toughness and ductility.",
      },
    ],
  },
  {
    id: "through-hardening",
    name: "Through Hardening",
    icon: Maximize2,
    description: "A standard hardening process where the entire cross-section of a component is heated to the austenitizing temperature and quenched to achieve a consistent hardness from the surface to the core.",
    steps: [
      {
        title: "Austenitizing",
        description: "Heat the steel component uniformly to the correct austenitizing temperature for its grade."
      },
      {
        title: "Soaking",
        description: "Hold at temperature long enough to ensure the core of the thickest section is fully transformed to austenite."
      },
      {
        title: "Quenching",
        description: "Quench the part in a suitable medium (oil, water, etc.) at a rate fast enough to achieve martensitic transformation throughout the entire part."
      },
      {
        "title": "Tempering",
        "description": "Temper the fully hardened part to achieve the desired balance of hardness and toughness."
      }
    ]
  },
  {
    id: "vacuum-brazing",
    name: "Vacuum Brazing",
    icon: Link,
    description:
      "A high-purity joining process that uses a filler metal (braze alloy) to join two base materials in a vacuum environment. The vacuum prevents oxidation and allows for extremely clean, strong, and hermetically sealed joints, often with heat-resistant superalloys.",
    steps: [
      {
        title: "Assembly and Cleaning",
        description:
          "Thoroughly clean the components to be joined and apply the brazing filler metal at the joint interface. Assemble the parts securely.",
      },
      {
        title: "Furnace Operation",
        description:
          "Place the assembly in a vacuum furnace. Evacuate the chamber to a high vacuum to remove oxygen and other contaminants.",
      },
      {
        title: "Heating to Brazing Temp",
        description:
          "Heat the assembly to a temperature where the filler metal melts and flows into the joint via capillary action, but below the melting point of the base materials.",
      },
      {
        title: "Cooling",
        description:
          "Cool the assembly in a controlled manner within the vacuum or inert gas backfill. This solidifies the filler metal, creating a strong, permanent bond.",
      },
    ],
  },
  {
    id: "vacuum-hardening",
    name: "Vacuum Hardening",
    icon: Shield,
    description:
      "A hardening process carried out in a vacuum furnace to prevent oxidation and decarburization, resulting in a bright, clean surface finish. It's ideal for tool steels and high-alloy steels.",
    steps: [
      {
        title: "Evacuation",
        description:
          "Place the parts in a furnace and pump out the air to create a vacuum, removing oxygen and other reactive gases.",
      },
      {
        title: "Heating",
        description:
          "Heat the parts to the required austenitizing temperature in the vacuum or a controlled inert gas backfill.",
      },
      {
        title: "Gas Quenching",
        description:
          "Rapidly cool the parts by introducing a high-pressure inert gas (like nitrogen or argon) into the furnace. The quench rate can be precisely controlled.",
      },
      {
        title: "Tempering",
        description:
          "Temper the parts, often in a separate vacuum or controlled atmosphere furnace, to achieve the final desired properties.",
      },
    ],
  },
];

export type TroubleshootingTip = {
  id: string;
  problem: string;
  solutions: string[];
};

export const troubleshootingTips: TroubleshootingTip[] = [
  {
    id: "cracking",
    problem: "Cracking during or after quenching",
    solutions: [
      "Ensure the quenching medium is appropriate for the steel type. Oil or polymer quenchants can be less severe than water.",
      "Pre-temper the part if it is a complex shape to reduce internal stresses.",
      "Do not delay tempering after quenching. Temper as soon as the part reaches room temperature.",
      "Check for sharp corners or drastic changes in section thickness in the part design, which act as stress concentrators.",
    ],
  },
  {
    id: "warping",
    problem: "Warping and distortion",
    solutions: [
      "Ensure uniform heating and cooling. Support long or complex parts properly in the furnace.",
      "Use a less severe quenching method if possible (e.g., oil instead of water).",
      "Utilize stress-relieving heat treatments before the final hardening process.",
      "Consider using press quenching or fixtures to hold the part's shape during cooling.",
    ],
  },
  {
    id: "soft-spots",
    problem: "Soft spots (incomplete hardening)",
    solutions: [
      "Ensure the steel is fully austenitized before quenching. This may require a higher temperature or longer soak time.",
      "Check for surface contamination (e.g., scale, oil) that might be insulating the surface during the quench.",
      "Agitate the quench bath or the part to ensure uniform and rapid cooling, preventing vapor pockets.",
      "Verify that the quenching medium is not degraded or contaminated.",
    ],
  },
  {
    id: "brittleness",
    problem: "Excessive brittleness after tempering",
    solutions: [
      "Increase the tempering temperature to achieve greater toughness (at the expense of some hardness).",
      "Verify the accuracy of temperature measurement devices.",
      "Avoid tempering certain steels within specific temperature ranges known to cause 'tempered martensite embrittlement'.",
    ],
  },
  {
    id: "decarburization",
    problem: "Surface Decarburization",
    solutions: [
      "Use a controlled atmosphere furnace (e.g., vacuum, nitrogen, endothermic) to protect the steel surface from oxygen.",
      "If using a non-atmosphere furnace, wrap the part in stainless steel tool wrap or coat with an anti-scale compound.",
      "Minimize the time at high temperature to reduce the extent of carbon loss from the surface.",
      "Consider adding a small amount of machining stock to be removed after heat treatment to get below the decarburized layer.",
    ],
  },
  {
    id: "scaling",
    problem: "Excessive Scaling or Oxidation",
    solutions: [
      "Use a protective atmosphere or vacuum furnace to eliminate oxygen contact.",
      "Apply a commercial anti-scale coating before heating.",
      "Ensure furnace atmosphere is correctly balanced (not too oxidizing).",
      "For open-air forge heating, maintain a slightly reducing flame to minimize scale formation.",
    ],
  },
];

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Acm, A1, A3, A4",
    definition: "Same as Aecm, Ae1, and Ae3 and Ae4."
  },
  {
    term: "Accm, Ac1, Ac3, Ac4",
    definition: "Defined under transformation temperature."
  },
  {
    term: "Acicular Ferrite",
    definition: "A highly substructured non-equiaxed ferrite that forms upon continuous cooling by a mixed diffusion and shear mode of transformation that begins at a temperature slightly higher than the temperature transformation range for upper bainite. It is distinguished from bainite in that it has a limited amount of carbon available; thus, there is only a small amount of carbide present."
  },
  {
    term: "Aecm, Ae1, Ae3, Ae4",
    definition: "Defined under transformation temperature."
  },
  {
    term: "Aerated Bath Nitriding",
    definition: "A type of liquid nitriding in which air is pumped through the molten bath creating agitation and increased chemical activity."
  },
  {
    term: "Age Hardening",
    definition: "Hardening by aging, usually after rapid cooling or cold working. See aging."
  },
  {
    term: "Age Softening",
    definition: "Spontaneous decrease of strength and hardness that takes place at room temperature in certain strain hardened alloys, especially those of aluminum."
  },
  {
    term: "Aging",
    definition: "A change in the properties of certain metals and alloys that occurs at ambient or moderately elevated temperatures after hot working or a heat treatment (quench aging in ferrous alloys, natural or artificial aging in ferrous and nonferrous alloys) or after a cold working operation (strain aging). The change in properties is often, but not always, due to a phase change (precipitation), but never involves a change in chemical composition of the metal or alloy. See also age hardening, artificial aging, interrupted aging, natural aging, overaging, precipitation hardening, precipitation heat treatment, progressive aging, quench aging, step aging."
  },
  {
    term: "Air-Hardening Steel",
    definition: "A steel containing sufficient carbon and other alloying elements to harden fully during cooling in air or other gaseous mediums from a temperature above its transformation range. The terms should be restricted to steels that are capable of being hardened by cooling in air in fairly large sections, about 2 in. (50 mm) or more in diameter. Same as self-hardening steel."
  },
  {
    term: "Allotropy",
    definition: "A near synonym for polymorphism. Allotropy is generally restricted to describing polymorphic behavior in elements, terminal phases, and alloys whose behavior closely parallels that of the predominant constituent element."
  },
  {
    term: "Alpha Ferrite",
    definition: "See ferrite."
  },
  {
    term: "Alpha Iron",
    definition: "The body-centered cubic form of pure iron, stable below 910 °C (1670 °F)."
  },
  {
    term: "Annealing",
    definition: "A generic term denoting a treatment, consisting of heating to and holding at a suitable temperature followed by cooling at a suitable rate, used primarily to soften metallic materials, but also to simultaneously produce desired changes in other properties or in microstructure. The purpose of such changes may be, but is not confined to: improvement of machinability, facilitation of cold work, improvement of mechanical or electrical properties, and/or increase in stability of dimensions. When the term is used without qualification, full annealing is implied.\n\nWhen applied only for the relief of stress, the process is properly called stress relieving or stress-relief annealing.\n\nIn ferrous alloys, annealing usually is done above the upper critical temperature, but the time-temperature cycles vary widely in both maximum temperature attained and in cooling rate employed, depending on composition, material condition, and results desired. When applicable, the following commercial process names should be used: black annealing, blue annealing, box annealing, bright annealing, cycle annealing, flame annealing, full annealing, graphitizing, intercritical annealing, isothermal annealing, malleablizing, order hardening, process annealing, quench annealing, spheroidizing, subcritical annealing.\n\nIn nonferrous alloys, annealing cycles are designed to: (a) remove part or all of the effects of cold working (recrystallization may or may not be involved); (b) cause substantially complete coalescence of precipitates from solid solution in relatively coarse form; or (c) both, depending on composition and material condition. Specific process names in commercial use are final annealing, full annealing, intermediate annealing, partial annealing, recrystallization annealing, stress relieving, anneal to temper."
  },
  {
    term: "Annealing Carbon",
    definition: "Fine, apparently amorphous carbon particles formed in white cast iron and certain steels during prolonged annealing. Also called temper carbon."
  },
  {
    term: "Annealing Twin",
    definition: "A twin form in a crystal during recrystallization."
  },
  {
    term: "Anneal to Temper",
    definition: "A final partial anneal that softens a cold worked nonferrous alloy to a specified level of hardness or tensile strength."
  },
  {
    term: "Arcm, Ar1, Ar3, Ar4, Ar', Ar''",
    definition: "Defined under transformation temperature."
  },
  {
    term: "Artificial Aging",
    definition: "Aging above room temperature. See aging. Compare with natural aging."
  },
  {
    term: "Athermal Transformation",
    definition: "A reaction that proceeds without benefit of thermal fluctuations; that is, thermal activation is not required. In contrast, a reaction that occurs at constant temperature is an isothermal transformation; thermal activation is necessary in this case and the reaction proceeds as a function of time."
  },
  {
    term: "Ausforming",
    definition: "Thermomechanical treatment of steel in the metastable austenitic condition below the recrystallization temperature followed by quenching to obtain martensite and/or bainite."
  },
  {
    term: "Austempering",
    definition: "A heat treatment for ferrous alloys in which a part is quenched from the austenitizing temperature at a rate fast enough to avoid formation of ferrite or pearlite and then held at a temperature just above Ms until transformation to bainite is complete. Although designated as bainite in both austempered steel and austempered ductile iron (ADI), austempered steel consists of two phase mixtures containing ferrite and carbide, while austempered ductile iron consists of two phase mixtures containing ferrite and austenite."
  },
  {
    term: "Austenite",
    definition: "A solid solution of one or more elements in face-centered cubic iron. Unless otherwise designated (such as nickel austenite), the solute is generally assumed to be carbon."
  },
  {
    term: "Austenitic Grain Size",
    definition: "The size attained by the grains of steel when heated to the austenitic region; may be revealed by appropriate etching of cross sections after cooling to room temperature."
  },
  {
    term: "Austenitizing",
    definition: "Forming austenite by heating a ferrous alloy into the transformation range (partial austenitizing) or above the transformation range (complete austenitizing). When used without qualification, the term implies complete austenitizing."
  },
  {
    term: "Bainite",
    definition: "A metastable aggregate consisting of dispersed carbide in ferrite resulting from the transformation of austenite at temperatures below the pearlite range but above Ms. Its appearance is in the form of relatively coarse ferrite laths between which carbides are precipitated as platelets if formed in the upper part of the bainite transformation range; acicular, resembling tempered martensite, if formed in the lower part."
  },
  {
    term: "Bainitic Hardening",
    definition: "Quench-hardening treatment resulting principally in the formation of bainite."
  },
  {
    term: "Batch Furnace",
    definition: "A furnace used to heat treat a single load at a time. Batch-type furnaces are necessary for large parts such as heavy forgings and are preferred for complex alloy grades requiring long cycles. See car furnace, horizontal batch furnace."
  },
  {
    term: "Belt Furnace",
    definition: "A continuous-type furnace which uses a mesh-type or cast-link belt to carry parts through the furnace."
  },
  {
    term: "Beta Annealing",
    definition: "Producing a beta phase by heating certain titanium alloys in the temperature range of which this phase forms followed by cooling at an appropriate rate to prevent its decomposition."
  },
  {
    term: "Black Annealing",
    definition: "Box annealing or pot annealing ferrous alloy sheet, strip, wire to impart a black color to the oxidized surface. See box annealing."
  },
  {
    term: "Black Oxide",
    definition: "A black finish on a metal produced by immersing it in hot oxidizing salts or salt solutions."
  },
  {
    term: "Blank Carburizing",
    definition: "Simulating the carburizing operation without introducing carbon. This is usually accomplished by using an inert material in place of the carburizing agent, or by applying a suitable protective coating to the ferrous alloy."
  },
  {
    term: "Blank Nitriding",
    definition: "Simulating the nitriding operation without introducing nitrogen. This is usually accomplished by using an inert material in place of the nitriding agent or by applying a suitable protective coating to the ferrous alloy."
  },
  {
    term: "Blue Annealing",
    definition: "Heating hot-rolled ferrous sheet in an open furnace to a temperature within the transformation range and then cooling in air, in order to soften the metal. The formation of a bluish oxide on the surface is incidental."
  },
  {
    term: "Blue Brittleness",
    definition: "Brittleness exhibited by some steels after being heated to some temperature within the range of about 205 to 370 °C (400 to 700 °F), particularly if the steel is worked at the elevated temperature. Killed steels are virtually free of this kind of brittleness."
  },
  {
    term: "Bluing",
    definition: "Subjecting the scale-free surface of a ferrous alloy to the action of air, steam, or other agents at a suitable temperature, thus forming a thin blue film of oxide and improving the appearance and resistance to corrosion. Note: This term is ordinarily applied to sheet, strip, or finished parts. It is used also to denote the heating of springs after fabrication to improve their properties."
  },
  {
    term: "Boriding",
    definition: "Thermochemical treatment involving the enrichment of the surface layer of an object with borides. This surface-hardening process is performed below the Ac1 temperature."
  },
  {
    term: "Boronizing",
    definition: "See boriding."
  },
  {
    term: "Box Annealing",
    definition: "Annealing a metal or alloy in a sealed container under conditions that minimize oxidation. In box annealing a ferrous alloy, the charge is usually heated slowly to a temperature below the transformation range, but sometimes above or within it, and is then cooled slowly; this process is also called close annealing or pot annealing. See black annealing."
  },
  {
    term: "Breaks",
    definition: "Creases or ridges usually in \"untempered\" or in aged material where the yield point has been exceeded. Depending on the origin of the break, it may be termed a cross break, a coil break, an edge break, or a sticker break."
  },
  {
    term: "Bright Annealing",
    definition: "Annealing in a protective medium to prevent discoloration of the bright surface."
  },
  {
    term: "Bright Nitriding",
    definition: "Nitriding in a protective medium to prevent discoloration of the bright surface. Compare with blank nitriding."
  },
  {
    term: "Brine Quenching",
    definition: "A quench in which brine (salt water-chlorides, carbonates, and cyanides) is the quenching medium. The salt addition improves the efficiency of water at the vapor phase or hot stage of the quenching process."
  },
  {
    term: "Brittle Fracture",
    definition: "Separation of a solid accompanied by little or no macroscopic plastic deformation. Typically, brittle fracture occurs by rapid crack propagation with less expenditure of energy than for ductile fracture."
  },
  {
    term: "Burning",
    definition: "(1) Permanently damaging a metal or alloy by heating to cause either incipient melting or intergranular oxidation. See overheating, grain-boundary liquation. (2) In grinding, getting the work hot enough to cause discoloration or to change the microstructure by tempering or hardening."
  },
  {
    term: "Calorizing",
    definition: "Imparting resistance to oxidation to an iron or steel surface by heating in aluminum powder at 800 to 1000 °C (1470 to 1830 °F)."
  },
  {
    term: "Carbonitriding",
    definition: "A case hardening process in which a suitable ferrous material is heated above the lower transformation temperature in a gaseous atmosphere of such composition as to cause simultaneous absorption of carbon and nitrogen by the surface and, by diffusion, create a concentration gradient. The process is completed by cooling at a rate that produces the desired properties in the workpiece."
  },
  {
    term: "Carbonization",
    definition: "Conversion of an organic substance into elemental carbon. (Should not be confused with carburization.)"
  },
  {
    term: "Carbon Potential",
    definition: "A measure of the ability of an environment containing active carbon to alter or maintain, under prescribed conditions, the carbon level of the steel. Note: In any particular environment, the carbon level attained will depend on such factors as temperature, time, and steel composition."
  },
  {
    term: "Carbon Restoration",
    definition: "Replacing the carbon lost in the surface layer from previous processing by carburizing this layer to substantially the original carbon level. Sometimes called recarburizing."
  },
  {
    term: "Carburizing",
    definition: "Absorption and diffusion of carbon into solid ferrous alloys by heating, to a temperature usually above Ac3, in contact with a suitable carbonaceous material. A form of case hardening that produces a carbon gradient extending inward from the surface, enabling the surface layer to be hardened either by quenching directly from the carburizing temperature or by cooling to room temperature, then reaustenitizing and quenching."
  },
  {
    term: "Carburizing Flame",
    definition: "A gas flame that will introduce carbon into some heated metals, as during a gas welding operation. A carburizing flame is a reducing flame, but a reducing flame is not necessarily a carburizing flame."
  },
  {
    term: "Car Furnace",
    definition: "A batch-type furnace using a car on rails to enter and leave the furnace area. Car furnaces are used for lower stress relieving ranges."
  },
  {
    term: "Case",
    definition: "That portion of a ferrous alloy, extending inward from the surface, whose composition has been altered so that it can be case hardened. Typically considered to be the portion of the alloy (a) whose composition has been measurably altered from the original composition, (b) that appears dark on an etched cross section, or (c) that has a hardness, after hardening, equal to or greater than a specified value. Contrast with core."
  },
  {
    term: "Case Hardening",
    definition: "A generic term covering several processes applicable to steel that change the chemical composition of the surface layer by absorption of carbon, nitrogen, or a mixture of the two and, by diffusion, create a concentration gradient. The processes commonly used are carburizing and quench hardening; cyaniding; nitriding; and carbonitriding. The use of the applicable specific process name is preferred."
  },
  {
    term: "Caustic Quenching",
    definition: "Quenching with aqueous solutions of 5 to 10% sodium hydroxide (NaOH)."
  },
  {
    term: "CCT Diagram",
    definition: "See continuous cooling transformation diagram."
  },
  {
    term: "Cementation",
    definition: "The introduction of one or more elements into the outer portion of a metal object by means of diffusion at high temperature."
  },
  {
    term: "Cementite",
    definition: "A compound of iron and carbon, known chemically as iron carbide and having the approximate chemical formula Fe3C. It is characterized by an orthorhombic crystal structure. When it occurs as a phase in steel, the chemical composition will be altered by the presence of manganese and other carbide-forming elements."
  },
  {
    term: "Checks",
    definition: "Numerous, very fine cracks in a coating or at the surface of a metal part. Checks may appear during processing or during service and are most often associated with thermal treatment or thermal cycling. Also called check marks, checking, heat checks."
  },
  {
    term: "Close Annealing",
    definition: "Same as box annealing."
  },
  {
    term: "Coalescence",
    definition: "Growth of grains at the expense of the remainder by absorption or the growth of a phase or particle at the expense of the remainder by absorption or reprecipitation."
  },
  {
    term: "Coarsening",
    definition: "An increase in the grain size, usually, but not necessarily, by grain growth."
  },
  {
    term: "Coherent Precipitate",
    definition: "A crystalline precipitate that forms from solid solution with an orientation that maintains continuity between the crystal lattice of the precipitate and the lattice of the matrix, usually accompanied by some strain in both lattices. Because the lattices fit at the interface between precipitate and matrix, there is no discernible phase boundary."
  },
  {
    term: "Cold Die Quenching",
    definition: "A quench utilizing cold, flat, or shaped dies to extract heat from a part. Cold die quenching is slow, expensive, and is limited to smaller parts with large surface areas."
  },
  {
    term: "Cold Dry Die Quenching",
    definition: "Same as cold die quenching."
  },
  {
    term: "Cold Treatment",
    definition: "Treatment carried out after quenching to transform retained austenite into martensite, involving cooling and holding at a temperature below ambient."
  },
  {
    term: "Columnar Structure",
    definition: "A coarse structure of parallel elongated grains formed by unidirectional growth, most often observed in castings, but sometimes in structures resulting from diffusional growth accompanied by a solid-state transformation."
  },
  {
    term: "Combined Carbon",
    definition: "The part of the total carbon in steel or cast iron that is present as other than free carbon."
  },
  {
    term: "Conditioning Heat Treatment",
    definition: "A preliminary heat treatment used to prepare a material for desired reaction to a subsequent heat treatment. For the term to be meaningful, the exact heat treatment must be specified."
  },
  {
    term: "Congruent Transformation",
    definition: "An isothermal or isobaric phase change in which both of the phases concerned have the same composition throughout the process."
  },
  {
    term: "Constitution Diagram",
    definition: "See phase diagram."
  },
  {
    term: "Continuous Cooling Transformation (CCT) Diagram",
    definition: "Set of curves drawn using logarithmic time and linear temperature as coordinates, which define for each cooling curve the beginning and end of the transformation of the initial phase."
  },
  {
    term: "Continuous Precipitation",
    definition: "Precipitation from a supersaturated solid solution in which the precipitate particles grow by long-range diffusion without recrystallization of the matrix. Continuous precipitates grow from nuclei distributed more or less uniformly throughout the matrix. They usually are randomly oriented, but may form a Widmanstätten structure. Also called general precipitation. Compare with discontinuous precipitation, localized precipitation."
  },
  {
    term: "Continuous-Type Furnace",
    definition: "A furnace used for heat treating materials that progress continuously through the furnace, entering one door and being discharged from another. See belt furnace, direct-fired tunnel-type furnace, rotary retort furnace, shaker-hearth furnace."
  },
  {
    term: "Controlled Cooling",
    definition: "Cooling from an elevated temperature in a predetermined manner, to avoid hardening, cracking, or internal damage, or to produce desired microstructure or mechanical properties."
  },
  {
    term: "Cooling Curve",
    definition: "A curve showing the relation between time and temperature during the cooling of a material."
  },
  {
    term: "Cooling Stresses",
    definition: "Residual stresses resulting from nonuniform distribution of temperature during cooling."
  },
  {
    term: "Core",
    definition: "In a ferrous alloy prepared for case hardening, that portion of the alloy that is not part of the case. Typically considered to be the portion that (a) appears light on an etched cross section, (b) has an essentially unaltered chemical composition, or (c) has a hardness, after hardening, less than a specified value."
  },
  {
    term: "Critical Cooling Rate",
    definition: "The rate of continuous cooling required to prevent undesirable transformation. For steel, it is the minimum rate at which austenite must be continuously cooled to suppress transformations above the Ms temperature."
  },
  {
    term: "Critical Diameter",
    definition: "(D) Diameter of the bar that can be fully hardened with 50% martensite at its center."
  },
  {
    term: "Critical Point",
    definition: "(1) The temperature or pressure at which a change in crystal structure, phase or physical properties occurs. Same as transformation temperature. (2) In an equilibrium diagram, that specific value of composition, temperature and pressure, or combinations thereof, at which the phases of a heterogeneous system are in equilibrium."
  },
  {
    term: "Critical Strain",
    definition: "The strain just sufficient to cause recrystallization; because the strain is small, usually only a few percent, recrystallization takes place from only a few nuclei, which produces a recrystallized structure consisting of very large grains."
  },
  {
    term: "Critical Temperature",
    definition: "(1) Synonymous with critical point if the pressure is constant. (2) The temperature above which the vapor phase cannot be condensed to liquid by an increase in pressure."
  },
  {
    term: "Critical Temperature Ranges",
    definition: "Synonymous with transformation ranges, which is the preferred term."
  },
  {
    term: "Cryogenic Treatment",
    definition: "See cold treatment."
  },
  {
    term: "Curie Temperature",
    definition: "The temperature of magnetic transformation below which a metal or alloy is ferromagnetic and above which it is paramagnetic."
  },
  {
    term: "Cyaniding",
    definition: "A case-hardening process in which a ferrous material is heated above the lower transformation range in a molten salt containing cyanide to cause simultaneous absorption of carbon and nitrogen at the surface and, by diffusion, create a concentration gradient. Quench hardening completes the process."
  },
  {
    term: "Cycle Annealing",
    definition: "An annealing process employing a predetermined and closely controlled time-temperature cycle to produce specific properties or microstructures."
  },
  {
    term: "Dead Soft",
    definition: "A temper of nonferrous alloys and some ferrous alloys corresponding to the condition of minimum hardness and tensile strength produced by full annealing."
  },
  {
    term: "Decalescence",
    definition: "A phenomenon, associated with the transformation of alpha iron to gamma iron on the heating (superheating) of iron or steel, revealed by the darkening of the metal surface owing to the sudden decrease in temperature caused by the fast absorption of the latent heat of transformation. Contrast with recalescence."
  },
  {
    term: "Decarburization",
    definition: "Loss of carbon from the surface layer of a carbon-containing alloy due to reaction with one or more chemical substances in a medium that contacts the surface."
  },
  {
    term: "Degrees of Freedom",
    definition: "The number of independent variables (such as temperature, pressure, or concentration within the phases present) that may be altered at will without causing a phase change in an alloy system at equilibrium; or the number of such variables that must be fixed arbitrarily to define the system completely."
  },
  {
    term: "Delta Ferrite",
    definition: "See ferrite."
  },
  {
    term: "Dew Point",
    definition: "The temperature and pressure at which a gas begins to condense to a liquid."
  },
  {
    term: "Dew Point Analyzer",
    definition: "An atmosphere monitoring device that measures the partial pressure of water vapor in an atmosphere."
  },
  {
    term: "Differential Heating",
    definition: "Heating that intentionally produces a temperature gradient within an object such that, after cooling, a desired stress distribution or variation in properties is present within the object."
  },
  {
    term: "Diffusion",
    definition: "(1) Spreading of a constituent in a gas, liquid, or solid, tending to make the composition of all parts uniform. (2) The spontaneous movement of atoms or molecules to new sites within a material."
  },
  {
    term: "Diffusion Coefficient",
    definition: "A factor of proportionality representing the amount of substance diffusing across a unit area through a unit concentration gradient in unit time."
  },
  {
    term: "Dilatometer",
    definition: "An instrument for measuring the linear expansion or contraction in a metal resulting from changes in such factors as temperature and allotropy."
  },
  {
    term: "Direct-Fired Tunnel-Type Furnace",
    definition: "A continuous-type furnace where the work is conveyed through a tunnel-type heating zone, and the parts are hung on hooks or fixtures to minimize distortion."
  },
  {
    term: "Direct Quenching",
    definition: "(1) Quenching carburized parts directly from the carburizing operation. (2) Also used for quenching pearlitic malleable parts directly from the malleablizing operation."
  },
  {
    term: "Discontinuous Precipitation",
    definition: "Precipitation from a supersaturated solid solution in which the precipitate particles grow by short-range diffusion, accompanied by recrystallization of the matrix in the region of precipitation. Discontinuous precipitates grow into the matrix from nuclei near grain boundaries, forming cells of alternate lamellae of precipitate and depleted (and recrystallized) matrix. Often referred to as cellular or nodular precipitation. Compare with continuous precipitation, localized precipitation."
  },
  {
    term: "Dissociation",
    definition: "As applied to heterogeneous equilibria, the transformation of one phase into two or more new phases of different composition. Compare with order-disorder transformation."
  },
  {
    term: "Double Aging",
    definition: "Employment of two different aging treatments to control the type of precipitate formed from a supersaturated matrix in order to obtain the desired properties. The first aging treatment, sometimes referred to as intermediate or stabilizing, is usually carried out at higher temperature than the second."
  },
  {
    term: "Double Tempering",
    definition: "A treatment in which a quench-hardened ferrous metal is subjected to two complete tempering cycles, usually at substantially the same temperature, for the purpose of ensuring completion of the tempering reaction and promoting stability of the resulting microstructure."
  },
  {
    term: "Drawing",
    definition: "A misnomer for tempering."
  },
  {
    term: "Dry Cyaniding",
    definition: "(obsolete) Same as carbonitriding."
  },
  {
    term: "Ductile Cast Iron",
    definition: "A cast iron that has been treated while molten with an element such as magnesium or cerium to induce the formation of free graphite as nodules or spherulites, which imparts a measurable degree of ductility to the cast metal. Also known as nodular cast iron, spherulitic graphite cast iron and SG iron."
  },
  {
    term: "Ductile Fracture",
    definition: "Fracture characterized by tearing of metal accompanied by appreciable gross plastic deformation and expenditure of considerable energy. Contrast with brittle fracture."
  },
  {
    term: "Ductility",
    definition: "The ability of a material to deform plastically without fracturing, measured by elongation or reduction of area in a tensile test, by height of cupping in an Erichsen test, or by other means."
  },
  {
    term: "885 °F (475 °C) Embrittlement",
    definition: "Embrittlement of stainless steels upon extended exposure to temperatures between 400 and 510 ° F). This type of embrittlement is caused by fine, chromium-rich precipitates that segregate at grain boundaries; time at temperature directly influences the amount of segregation. Grain-boundary segregation of the chromium-rich precipitates increases strength and hardness, decreases ductility and toughness, and changes corrosion resistance. This type of embrittlement can be reversed by heating above the precipitation range."
  },
  {
    term: "Elastic Limit",
    definition: "The maximum stress that a material is capable of sustaining without any permanent strain (deformation) remaining upon complete release of the stress."
  },
  {
    term: "Electron-Beam Heat Treating",
    definition: "A selective surface hardening process that rapidly heats a surface by direct bombardment with an accelerated stream of electrons."
  },
  {
    term: "Embrittlement",
    definition: "The severe loss of ductility or toughness or both, of a material, usually a metal or alloy. Many forms of embrittlement can lead to brittle fracture. Many forms can occur during thermal treatment or elevated-temperature service (thermally induced embrittlement). Some of these forms of embrittlement, which affect steels, include blue brittleness, 885 °F (475 °C) embrittlement, quench-age embrittlement, sigma-phase embrittlement, strain-age embrittlement, temper embrittlement, tempered martensite embrittlement, and thermal embrittlement. In addition, steels and other metals and alloys can be embrittled by environmental conditions (environmentally assisted embrittlement). The forms of environmental embrittlement include acid embrittlement, caustic embrittlement, corrosion embrittlement, creep-rupture embrittlement, hydrogen embrittlement, liquid metal embrittlement, neutron embrittlement, solder embrittlement, solid metal embrittlement, and stress-corrosion cracking. These environmentally-related terms are defined elsewhere in this Handbook series."
  },
  {
    term: "Enantiotropy",
    definition: "The relation of crystal forms of the same substance in which one form is stable above a certain temperature and the other form stable below that temperature. Ferrite and austenite are enantiotropic in ferrous alloys, for example. May also be spelled monotrophism."
  },
  {
    term: "End-Quench Hardenability Test",
    definition: "A laboratory procedure for determining the hardenability of a steel or other ferrous alloy; widely referred to as the Jominy test. Hardenability is determined by heating a standard specimen above the upper critical temperature, placing the hot specimen in a fixture so that a stream of cold water impinges on one end, and, after cooling to room temperature is completed, measuring the hardness near the surface of the specimen at regularly spaced intervals along its length. The data are normally plotted as hardness versus distance from the quenched end."
  },
  {
    term: "Equilibrium Diagram",
    definition: "A graphical representation of the temperature, pressure and composition limits of phase fields in an alloy system as they exist under conditions of complete equilibrium. In metal systems, pressure is usually considered constant."
  },
  {
    term: "Eutectic",
    definition: "(1) An isothermal reversible reaction in which a liquid solution is converted into two or more intimately mixed solids on cooling, the number of solids formed being the same as the number of components in the system. (2) An alloy having the composition indicated by the eutectic point on an equilibrium diagram. (3) An alloy structure of intermixed solid constituents formed by a eutectic reaction."
  },
  {
    term: "Eutectic Carbide",
    definition: "Carbide formed during freezing as one of the mutually insoluble phases participating in the eutectic reaction of ferrous alloys."
  },
  {
    term: "Eutectic Melting",
    definition: "Melting of localized microscopic areas whose composition corresponds to that of the eutectic in the system."
  },
  {
    term: "Eutectoid",
    definition: "(I) An isothermal reversible reaction in which a solid solution is converted into two or more intimately mixed solids on cooling, a number of solids formed being the same as the number of components in the system. (2) An alloy having the composition indicated by the eutectoid point on an equilibrium diagram. (3) An alloy structure of intermixed solid constituents formed by a eutectoid reaction."
  },
  {
    term: "Extra Hard",
    definition: "A temper of nonferrous alloys and some ferrous alloys characterized by tensile strength and hardness about one-third of the way from full hard to extra spring temper."
  },
  {
    term: "Decalescence",
    definition: "A phenomenon, associated with the transformation of alpha iron to gamma iron on the heating (superheating) of iron or steel, revealed by the darkening of the metal surface owing to the sudden decrease in temperature caused by the fast absorption of the latent heat of transformation. Contrast with recalescence."
  },
  {
    term: "Decarburization",
    definition: "Loss of carbon from the surface layer of a carbon-containing alloy due to reaction with one or more chemical substances in a medium that contacts the surface."
  },
];
export const steelGrades = [
    { value: "1018", label: "AISI 1018 (Low Carbon)", carbon: 0.18, alloyFactor: 1.0, hardenability: "low", carburizingFactor: 1.1 },
    { value: "1020", label: "AISI 1020 (Low Carbon)", carbon: 0.2, alloyFactor: 1.0, hardenability: "low", carburizingFactor: 1.1 },
    { value: "1045", label: "AISI 1045 (Medium Carbon)", carbon: 0.45, alloyFactor: 1.0, hardenability: "water" },
    { value: "1095", label: "AISI 1095 (High Carbon)", carbon: 0.95, alloyFactor: 1.0, hardenability: "water" },
    { value: "15B21", label: "AISI 15B21 (Boron)", carbon: 0.21, alloyFactor: 1.05, hardenability: "oil", carburizingFactor: 1.0 },
    { value: "15B41", label: "AISI 15B41 (Boron)", carbon: 0.41, alloyFactor: 1.1, hardenability: "oil", carburizingFactor: 1.0 },
    { value: "3140", label: "AISI 3140 (Ni-Cr)", carbon: 0.40, alloyFactor: 1.15, hardenability: "oil" },
    { value: "4118", label: "AISI 4118 (Cr-Mo)", carbon: 0.18, alloyFactor: 1.1, hardenability: "oil", carburizingFactor: 1.05 },
    { value: "4130", label: "AISI 4130 (Cr-Mo)", carbon: 0.3, alloyFactor: 1.1, hardenability: "oil" },
    { value: "4140", label: "AISI 4140 (Cr-Mo)", carbon: 0.4, alloyFactor: 1.1, hardenability: "oil" },
    { value: "4150", label: "AISI 4150 (Cr-Mo)", carbon: 0.5, alloyFactor: 1.1, hardenability: "oil" },
    { value: "4320", label: "AISI 4320 (Ni-Cr-Mo)", carbon: 0.2, alloyFactor: 1.2, hardenability: "oil", carburizingFactor: 1.05 },
    { value: "4340", label: "AISI 4340 (Ni-Cr-Mo)", carbon: 0.4, alloyFactor: 1.2, hardenability: "oil" },
    { value: "4620", label: "AISI 4620 (Ni-Mo)", carbon: 0.2, alloyFactor: 1.15, hardenability: "oil", carburizingFactor: 1.0 },
    { value: "4820", label: "AISI 4820 (Ni-Mo)", carbon: 0.2, alloyFactor: 1.25, hardenability: "oil", carburizingFactor: 1.15 },
    { value: "5120", label: "AISI 5120 (Cr)", carbon: 0.2, alloyFactor: 1.05, hardenability: "oil", carburizingFactor: 1.0 },
    { value: "5160", label: "AISI 5160 (Spring Steel)", carbon: 0.6, alloyFactor: 1.1, hardenability: "oil" },
    { value: "52100", label: "AISI 52100 (Bearing Steel)", carbon: 1.0, alloyFactor: 1.1, hardenability: "oil" },
    { value: "6150", label: "AISI 6150 (Cr-V)", carbon: 0.5, alloyFactor: 1.1, hardenability: "oil" },
    { value: "8620", label: "AISI 8620 (Ni-Cr-Mo)", carbon: 0.2, alloyFactor: 1.1, hardenability: "oil", carburizingFactor: 1.0 },
    { value: "8720", label: "AISI 8720 (Ni-Cr-Mo)", carbon: 0.20, alloyFactor: 1.1, hardenability: "oil", carburizingFactor: 1.0 },
    { value: "9310", label: "AISI 9310 (Ni-Cr-Mo)", carbon: 0.1, alloyFactor: 1.2, hardenability: "oil", carburizingFactor: 1.1 },
    { value: "O1", label: "O1 Tool Steel", carbon: 0.9, alloyFactor: 1.2, hardenability: "oil" },
    { value: "W1", label: "W1 Tool Steel", carbon: 1.0, alloyFactor: 1.0, hardenability: "water" },
    { value: "W2", label: "W2 Tool Steel", carbon: 1.0, alloyFactor: 1.0, hardenability: "water" },
    { value: "A2", label: "A2 Tool Steel", carbon: 1.0, alloyFactor: 1.3, hardenability: "air" },
    { value: "D2", label: "D2 Tool Steel", carbon: 1.5, alloyFactor: 1.4, hardenability: "air" },
    { value: "S7", label: "S7 Tool Steel (Shock Resist.)", carbon: 0.5, alloyFactor: 1.3, hardenability: "air" },
    { value: "H13", label: "H13 Tool Steel (Hot Work)", carbon: 0.4, alloyFactor: 1.4, hardenability: "air" },
    { value: "M2", label: "M2 Tool Steel (High Speed)", carbon: 0.85, alloyFactor: 1.5, hardenability: "air" },
    { value: "M4", label: "M4 Tool Steel (High Speed)", carbon: 1.4, alloyFactor: 1.5, hardenability: "air" },
    { value: "CPM-3V", label: "CPM-3V (Crucible)", carbon: 0.8, alloyFactor: 1.5, hardenability: "air" },
    { value: "CPM S30V", label: "CPM S30V", carbon: 1.45, alloyFactor: 1.5, hardenability: "air" },
    { value: "M4 High Speed", label: "M4 High Speed", carbon: 1.42, alloyFactor: 1.5, hardenability: "air" }
];
export const recommendedResources = [
  {
    id: "1",
    title: "Heat Treater's Guide: Practices and Procedures for Irons and Steels",
    type: "Book",
    description: "A comprehensive guide covering the heat treatment of various irons and steels. An essential desktop reference.",
    icon: BookOpen,
  },
  {
    id: "2",
    title: "ASM Handbook, Volume 4: Heat Treating",
    type: "Handbook/Standard",
    description: "The authoritative industry standard from ASM International, providing in-depth knowledge on all aspects of heat treating. Heat Treating was published in 1991 as Volume 4 of the ASM Handbook.",
    icon: Book,
  },
  {
    id: "3",
    title: "Heat Treatment Guide - By Bijoy Saha (YouTube Channel)",
    type: "Video Series",
    description: "A professional video series that visually explains complex heat treatment topics, from fundamentals to advanced processes.",
    icon: Youtube,
  },
];

export const quizQuestions = [
  {
    question: "What is the primary purpose of annealing?",
    options: [
      "To increase hardness",
      "To increase toughness",
      "To reduce hardness and increase ductility",
      "To improve wear resistance",
    ],
    answer: "To reduce hardness and increase ductility",
  },
  {
    question:
      "Which quenching medium provides the fastest cooling rate?",
    options: ["Oil", "Water", "Air", "Brine (salt water)"],
    answer: "Brine (salt water)",
  },
  {
    question:
      "What microstructure is the primary goal of quenching a hardenable steel?",
    options: ["Pearlite", "Ferrite", "Bainite", "Martensite"],
    answer: "Martensite",
  },
  {
    question:
      "Tempering is performed on a hardened steel to...",
    options: [
      "Increase its hardness further",
      "Increase its toughness and reduce brittleness",
      "Clean the surface of the steel",
      "Increase the grain size",
    ],
    answer: "Increase its toughness and reduce brittleness",
  },
  {
    question: "Which process is used to create a hard surface on a low-carbon steel part?",
    options: ["Normalizing", "Annealing", "Carburizing", "Spheroidizing"],
    answer: "Carburizing",
  },
  {
    question: "Normalizing involves cooling the steel in which medium?",
    options: ["In the furnace", "Still air", "Oil", "Water"],
    answer: "Still air",
  },
  {
    question: "What does a TTT diagram represent?",
    options: [
      "Time-Temperature-Toughness",
      "Time-Temperature-Transformation",
      "Temperature-Tension-Torsion",
      "Time-Tension-Transformation",
    ],
    answer: "Time-Temperature-Transformation",
  },
  {
    question: "Which of these is NOT a surface hardening process?",
    options: ["Nitriding", "Flame Hardening", "Induction Hardening", "Full Annealing"],
    answer: "Full Annealing",
  },
  {
    question: "Cryogenic treatment is primarily used to transform retained ______ into martensite.",
    options: ["Pearlite", "Ferrite", "Austenite", "Cementite"],
    answer: "Austenite",
  },
  {
    question: "The Jominy end-quench test is used to measure a steel's...",
    options: ["Toughness", "D ductility", "Hardenability", "Tensile Strength"],
    answer: "Hardenability",
  },
  {
    question: "What is the primary alloying element in stainless steel that provides corrosion resistance?",
    options: ["Nickel", "Molybdenum", "Chromium", "Manganese"],
    answer: "Chromium",
  },
  {
    question: "Which heat treatment process results in a microstructure of fine pearlite, ideal for wire drawing?",
    options: ["Spheroidizing", "Patenting", "Normalizing", "Process Annealing"],
    answer: "Patenting",
  },
  {
    question: "The purpose of a System Accuracy Test (SAT) in pyrometry is to:",
    options: [
      "Check the temperature uniformity of the furnace",
      "Calibrate the furnace controller",
      "Verify the accuracy of the entire temperature measurement system",
      "Test the strength of the thermocouples",
    ],
    answer: "Verify the accuracy of the entire temperature measurement system",
  },
  {
    question: "In the context of the CQI-9 standard, what does a 'Job Audit' verify?",
    options: [
      "The company's financial records",
      "That a specific job was run according to all specified parameters",
      "The operator's attendance record",
      "The building's safety compliance",
    ],
    answer: "That a specific job was run according to all specified parameters",
  },
  {
    question: "Which process uses a molten salt bath to create a bainitic microstructure?",
    options: ["Martempering", "Austempering", "Carburizing", "Solution Annealing"],
    answer: "Austempering",
  },
  {
    question: "A sub-critical annealing process, like Process Annealing, is performed at a temperature:",
    options: [
      "Above the Ac3 line",
      "Between the Ac1 and Ac3 lines",
      "Below the Ac1 line",
      "At the melting point",
    ],
    answer: "Below the Ac1 line",
  },
  {
    question: "Which of the following is a primary reason to use a vacuum furnace for heat treating?",
    options: [
      "To heat parts faster",
      "To prevent oxidation and decarburization",
      "To increase the hardenability of plain carbon steel",
      "To lower the energy cost of the process",
    ],
    answer: "To prevent oxidation and decarburization",
  },
  {
    question:
      "The iron-carbon phase diagram shows the relationship between temperature, carbon content, and:",
    options: [
      "Hardness",
      "Toughness",
      "Microstructure (Phases)",
      "Time",
    ],
answer: "Microstructure (Phases)",
  },
  {
    question: "What is the main advantage of martempering (marquenching)?",
    options: [
      "It produces the highest possible hardness.",
      "It minimizes distortion and residual stress in the part.",
      "It is the fastest possible quenching method.",
      "It does not require a tempering step afterward.",
    ],
    answer: "It minimizes distortion and residual stress in the part.",
  },
  {
    question: "The term 'hardenability' refers to:",
    options: [
      "The maximum hardness a steel can achieve.",
      "The ability of a steel to resist softening at high temperatures.",
      "The depth to which a steel can be hardened by quenching.",
      "The resistance of a steel to abrasion.",
    ],
    answer: "The depth to which a steel can be hardened by quenching.",
  },
];
export const hazardCategories = [
  {
    id: "furnace",
    title: "Furnace Operations",
    items: [
      { id: "f1", label: "Are furnace emergency stops and interlocks functional?" },
      { id: "f2", label: "Is the area around the furnace clear of flammable materials?" },
      { id: "f3", label: "Is furnace ventilation/exhaust working correctly?" },
      { id: "f4", label: "Are hot surfaces clearly marked or shielded?" },
      { id: "f5", label: "Is the furnace controller calibrated and reading accurately?" },
    ],
  },
  {
    id: "quenching",
    title: "Quenching Operations",
    items: [
      { id: "q1", label: "Is the quench tank level and temperature correct?" },
      { id: "q2", label: "Is there adequate fire suppression for the quench tank (e.g., CO2, lid)?" },
      { id: "q3", label: "Is a face shield and appropriate PPE being used for quenching?" },
      { id: "q4", label: "Is the quench oil free from significant water contamination?" },
      { id: "q5", label: "Is there proper ventilation to handle fumes and smoke?" },
    ],
  },
  {
    id: "chemical",
    title: "Chemical & Gas Handling",
    items: [
      { id: "c1", label: "Are Safety Data Sheets (SDS) available for all chemicals?" },
      { id: "c2", label: "Are flammable/process gas cylinders secured and stored properly?" },
      { id: "c3", label: "Are chemical storage areas properly labeled and ventilated?" },
      { id: "c4", label: "Are eyewash stations and safety showers unobstructed and functional?" },
      { id: "c5", label: "Is appropriate chemical-resistant PPE available and in use?" },
    ],
  },
];

export const brazingData = [
    { 
        combination: "copper-copper", 
        fillerMetal: "BCuP (Copper-Phosphorus)", 
        temperatureRange: "710-890°C (1310-1635°F)", 
        notes: "Self-fluxing. No flux required for copper-to-copper joints."
    },
    { 
        combination: "copper-steel", 
        fillerMetal: "BAg (Silver Alloy)", 
        temperatureRange: "690-845°C (1275-1550°F)", 
        notes: "Flux is required (e.g., AWS FB3-A)."
    },
    { 
        combination: "steel-steel", 
        fillerMetal: "BAg (Silver Alloy) or BCu (Copper)", 
        temperatureRange: "690-845°C for BAg, 1090-1150°C for BCu", 
        notes: "Flux required for BAg. Copper brazing typically done in a protective atmosphere furnace."
    },
    { 
        combination: "stainless-stainless", 
        fillerMetal: "BAg (Silver Alloy) or BNi (Nickel Alloy)", 
        temperatureRange: "690-845°C for BAg, 980-1150°C for BNi", 
        notes: "Flux required for BAg. Nickel brazing is ideal for high-temp applications and done in vacuum/hydrogen."
    },
    { 
        combination: "stainless-steel", 
        fillerMetal: "BAg (Silver Alloy) or BNi (Nickel Alloy)", 
        temperatureRange: "690-845°C for BAg, 980-1150°C for BNi", 
        notes: "Similar to stainless-stainless. Choose filler based on service temperature."
    },
    { 
        combination: "aluminum-aluminum", 
        fillerMetal: "BAlSi (Aluminum-Silicon)", 
        temperatureRange: "570-610°C (1060-1130°F)", 
        notes: "Special flux (AWS FB1-A) required. Temperature control is critical as it's close to the base metal melting point."
    }
];

export const courseLevels = [
  {
    id: 'beginner',
    title: 'Beginner Level',
    description: 'Foundational concepts for those new to metallurgy and heat treatment.',
    duration: 'Days 1-5',
    days: [
      {
        day: 1,
        title: 'Introduction to Metallurgy & Safety',
        description:
          'Understand the basic concepts of metallurgy and the critical importance of safety in a heat treatment environment. This module sets the stage for all future learning.',
        tags: ['Fundamentals', 'Safety', 'Metallurgy'],
        topics: [
          'What is Heat Treatment?',
          'Basic categories of ferrous metals (Iron, Steel, Stainless Steel)',
          'Essential Personal Protective Equipment (PPE)',
          'Understanding furnace and quench tank hazards',
        ],
      },
      {
        day: 2,
        title: 'The Iron-Carbon Phase Diagram',
        description:
          'Learn to read and interpret the most important roadmap in ferrous metallurgy. This diagram is key to understanding how steel behaves when heated and cooled.',
        tags: ['Phase Diagram', 'Metallurgy', 'Core Concept'],
        topics: [
          'Key phases: Ferrite, Austenite, Cementite, Pearlite',
          'Critical temperatures: A1, A3, Acm',
          'Eutectoid, Hypoeutectoid, and Hypereutectoid steels',
          'How carbon content changes the diagram',
        ],
      },
      {
        day: 3,
        title: 'Annealing and Normalizing',
        description:
          'Explore two fundamental softening processes used to improve machinability, refine grain structure, and relieve internal stresses.',
        tags: ['Annealing', 'Normalizing', 'Process'],
        topics: [
          'Full Annealing vs. Process Annealing',
          'The purpose and outcome of Normalizing',
          'Typical temperature ranges and cooling rates',
          'Resulting microstructures and properties',
        ],
      },
      {
        day: 4,
        title: 'Hardening: Quenching and Tempering',
        description:
          'Discover the core process for making steel hard. This module covers the transformation to martensite and the critical follow-up step of tempering.',
        tags: ['Hardening', 'Quenching', 'Tempering'],
        topics: [
          'The concept of Austenitizing',
          'Quenching principles and different quench media (water, oil, air)',
          'The formation of Martensite',
          'Why tempering is essential to reduce brittleness',
        ],
      },
      {
        day: 5,
        title: 'Basic Hardness & Tensile Testing',
        description:
          'Learn how the results of heat treatment are measured. This module introduces the most common methods for testing the mechanical properties of steel.',
        tags: ['Testing', 'QA', 'Hardness'],
        topics: [
          'Introduction to the Rockwell Hardness test (HRC, HRB)',
          'Overview of the Brinell Hardness test (HBW)',
          'Basic principles of tensile testing (Yield, Ultimate Tensile Strength)',
          'Connecting test results to the success of a heat treatment',
        ],
      },
    ],
  },
  {
    id: 'intermediate',
    title: 'Intermediate Level',
    description:
      'Dive deeper into transformation diagrams, hardenability, and common industrial processes.',
    duration: 'Days 6-10',
    days: [
      {
        day: 6,
        title: 'TTT and CCT Diagrams',
        description:
          'Move beyond the equilibrium phase diagram to understand how time and cooling rate affect steel transformations, predicting the final microstructure.',
        tags: ['TTT', 'CCT', 'Transformation'],
        topics: [
          'Isothermal Transformation (TTT) vs. Continuous Cooling Transformation (CCT)',
          'Identifying the \'pearlite nose\' and \'bainite bay\'',
          'Understanding the Martensite Start (Ms) and Finish (Mf) temperatures',
          'Using diagrams to predict the outcome of different cooling rates',
        ],
      },
      {
        day: 7,
        title: 'Hardenability and the Jominy Test',
        description:
          'Explore why some steels can harden deeper than others. This module explains the concept of hardenability and how it is measured.',
        tags: ['Hardenability', 'Jominy Test', 'Alloying'],
        topics: [
          'The difference between hardness and hardenability',
          'The role of alloying elements (Cr, Mo, Ni) in increasing hardenability',
          'Procedure and interpretation of the Jominy End-Quench test',
          'Relating Jominy data to real-world part sections',
        ],
      },
      {
        day: 8,
        title: 'Surface Hardening: Carburizing',
        description:
          'Learn the most common surface hardening technique, which creates a hard, wear-resistant surface on a tough, low-carbon steel core.',
        tags: ['Carburizing', 'Case Hardening', 'Process'],
        topics: [
          'Principles of carbon diffusion',
          'Gas, Pack, and Liquid Carburizing methods',
          'Controlling case depth and surface carbon concentration',
          'Post-carburizing heat treatment cycles',
        ],
      },
      {
        day: 9,
        title: 'Surface Hardening: Nitriding & Carbonitriding',
        description:
          'Discover other important case hardening processes that use nitrogen to create extremely hard surfaces with minimal distortion.',
        tags: ['Nitriding', 'Case Hardening', 'Carbonitriding'],
        topics: [
          'Gas vs. Plasma (Ion) Nitriding',
          'Advantages of nitriding (low temp, low distortion)',
          'What is Carbonitriding and when is it used?',
          'Suitable materials for nitriding processes',
        ],
      },
      {
        day: 10,
        title: 'Heat Treatment Defects & Causes',
        description:
          'An essential module on what can go wrong. Learn to identify, understand, and prevent common heat treatment problems.',
        tags: ['Defects', 'Troubleshooting', 'QA'],
        topics: [
          'Quench Cracking: Causes and prevention',
          'Distortion and Warpage: How to minimize it',
          'Soft Spots and Incomplete Hardening',
          'Surface issues: Decarburization and Scaling',
        ],
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Level',
    description:
      'Focus on specialized processes, industry standards, and quality control systems for the professional heat treater.',
    duration: 'Days 11-15',
    days: [
      {
        day: 11,
        title: 'Advanced Steels: Tool & Stainless',
        description:
          'Go beyond plain carbon steels to understand the unique heat treatment requirements of high-alloy tool steels and various families of stainless steel.',
        tags: ['Tool Steel', 'Stainless Steel', 'Alloying'],
        topics: [
          'Classifying tool steels (A, D, H, M, S series)',
          'Heat treating austenitic, ferritic, and martensitic stainless steels',
          'The role of complex carbides and retained austenite',
          'Secondary hardening in high-speed steels',
        ],
      },
      {
        day: 12,
        title: 'Furnace Atmospheres & Vacuum Treating',
        description:
          'Learn how to protect parts from the environment at high temperatures. This module covers the use of protective atmospheres and vacuum furnaces.',
        tags: ['Furnaces', 'Atmosphere Control', 'Vacuum'],
        topics: [
          'Endothermic and Exothermic gas atmospheres',
          'Nitrogen-Methanol systems',
          'Principles of vacuum heat treatment and high-pressure gas quenching',
          'Carbon potential control',
        ],
      },
      {
        day: 13,
        title: 'Pyrometry & AMS 2750',
        description:
          'An introduction to the science of temperature measurement and the critical aerospace standard governing it, AMS 2750.',
        tags: ['Pyrometry', 'AMS 2750', 'Compliance'],
        topics: [
          'Thermocouple types, placement, and calibration',
          'System Accuracy Tests (SAT)',
          'Temperature Uniformity Surveys (TUS)',
          'Instrumentation types and requirements',
        ],
      },
      {
        day: 14,
        title: 'Quality Systems: Intro to CQI-9',
        description:
          'Understand the framework for process control in the automotive heat treat industry. This provides a high-level overview of the CQI-9 Heat Treat System Assessment.',
        tags: ['CQI-9', 'Quality', 'Audit'],
        topics: [
          'The purpose and scope of the CQI-9 assessment',
          'Key elements: Job Audits, Process Tables',
          'The importance of process monitoring and documentation',
          'Moving from detection to prevention of issues',
        ],
      },
      {
        day: 15,
        title: 'Process Troubleshooting & Optimization',
        description:
          'Apply all the knowledge gained to real-world scenarios. This module focuses on a systematic approach to diagnosing problems and improving heat treat cycles.',
        tags: ['Troubleshooting', 'Optimization', 'Advanced QA'],
        topics: [
          'Using metallography for failure analysis',
          'Interpreting hardness patterns to diagnose quench issues',
          'Optimizing cycles for reduced distortion and cost',
          'Case study: Analyzing a cracked gear',
        ],
      },
    ],
  },
];

    
