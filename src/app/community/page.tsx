
'use client';

import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, ExternalLink, MessageSquare, Linkedin } from "lucide-react";

const communities = [
  {
    title: "ASM Heat Treating Society (HTS)",
    description: "As the world's premier society, HTS provides a central hub for professionals in industry, government, and academia to collaborate and access resources.",
    points: [
      "Online Community: Members can access the HTS Online Member Community forum on ASM Connect to discuss technical challenges (e.g., \"Nonuniform Hardness Profile at Quenching\"), share information, and network.",
      "Events: HTS organizes major conferences and events, such as the Heat Treat conference, where professionals gather to learn about new technologies and network.",
      "Resources: They offer extensive technical information, educational courses (e.g., \"Basics of Heat Treating\", \"Heat Treating Quality & Inspection\"), and online databases like the Heat Treater's Guide Online.",
    ],
    link: "https://www.asminternational.org/hts/",
  },
  {
    title: "Global Heat Treatment Network",
    description: "A global network organization of over 80 \"hands-on\" heat treatment experts, including engineers, metallurgists, and consultants, who collaborate to support the industry in areas like problem-solving, equipment selection, and process optimization.",
    points: [],
    link: "https://heattreatment.network/",
  },
  {
    title: "IHEA (Industrial Heating Equipment Association)",
    description: "IHEA offers online educational resources, training courses, webinars, and publications for the industrial process heating industry.",
    points: [],
    link: "https://www.ihea.org/",
  },
  {
    title: "AWT (Arbeitsgemeinschaft Wärmebehandlung und Werkstofftechnik e.V.)",
    description: "A German-based working group for heat treatment and materials technology, featuring a strong network of company and individual members.",
    points: [],
    link: "https://www.awt-online.org/",
  },
  {
    title: "IFHTSE",
    description: "The International Federation for Heat Treatment and Surface Engineering is a global body comprising heat treatment and surface engineering associations worldwide.",
    points: [
      "Organizes international conferences and congresses.",
      "Promotes scientific and technological cooperation.",
      "Facilitates the exchange of knowledge on a global scale.",
    ],
    link: "https://www.ifhtse.org/",
  },
  {
    title: "Center for Heat Treating Excellence (CHTE)",
    description: "A research center at Worcester Polytechnic Institute (WPI) where industry members and researchers collaborate on pre-competitive research to advance the heat treating industry.",
    points: [
        "Conducts cutting-edge research in heat treatment and surface engineering.",
        "Provides educational opportunities for students and professionals.",
        "Solves real-world industrial problems through collaborative projects."
    ],
    link: "https://www.wpi.edu/research/chte",
  },
  {
    title: "Metal Treating Institute (MTI)",
    description: "As the world's largest trade association for the commercial heat treating industry, MTI offers advocacy, education, and networking opportunities.",
    points: [
      "Networking through national meetings and local chapter events.",
      "Online training via the Heat Treat an MTI Online Academy.",
      "Industry standards and best practices publications.",
    ],
    link: "https://www.heattreat.net/",
  },
  {
    title: "RISE (Research Institutes of Sweden)",
    description: "Sweden's state-owned research institute, RISE works in collaboration with universities, industry, and the public sector to drive sustainable growth by strengthening competitiveness and renewal.",
    points: [],
    link: "https://www.ri.se/",
  },
    {
    title: "Swerim",
    description: "A leading Swedish research institute specializing in metals research, covering everything from process and product development to material properties. They work closely with industry to apply cutting-edge research.",
    points: [],
    link: "https://www.swerim.se/",
  },
  {
    title: "North American Die Casting Association (NADCA)",
    description: "NADCA provides resources, education, and support for the die casting industry, which often involves heat treatment of dies and components.",
    points: [],
    link: "https://www.diecasting.org/",
  },
];

const onlineForums = [
    {
        name: "LinkedIn: Heat Treatment Professionals",
        description: "A large professional group for networking and discussing industry news, jobs, and technical questions.",
        link: "https://www.linkedin.com/groups/1911365/",
        icon: Linkedin,
    },
     {
        name: "Reddit: r/Metallurgy",
        description: "An active community for students and professionals to ask questions, share images of microstructures, and discuss materials science topics.",
        link: "https://www.reddit.com/r/Metallurgy/",
        icon: MessageSquare,
    }
]

export default function CommunityPage() {
  return (
    <AppLayout>
        <div className="space-y-8">
            <div>
                <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                    <Users className="h-8 w-8 text-primary" />
                    Community Network
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
                    The primary heat treatment community is the ASM Heat Treating Society (HTS), the world's largest professional network in the field. These communities are valuable for staying current, solving problems, and connecting with peers.
                </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {communities.map((community) => (
                <Card key={community.title} className="flex flex-col">
                    <CardHeader>
                    <CardTitle>{community.title}</CardTitle>
                    <CardDescription className="text-justify">{community.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {community.points.length > 0 && (
                        <ul className="space-y-3">
                            {community.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                {point}
                                </span>
                            </li>
                            ))}
                        </ul>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <a href={community.link} target="_blank" rel="noopener noreferrer">
                                Visit Website <ExternalLink className="ml-2 h-4 w-4"/>
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Online Forums & Social Media Groups</CardTitle>
                    <CardDescription className="text-justify">Connect with peers and experts in more informal settings to ask questions and share knowledge.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    {onlineForums.map((forum) => (
                        <div key={forum.name} className="flex flex-col rounded-lg border p-4">
                            <div className="flex-grow">
                                <h3 className="font-semibold flex items-center gap-2 mb-2"><forum.icon className="h-5 w-5 text-primary" />{forum.name}</h3>
                                <p className="text-sm text-muted-foreground text-justify">{forum.description}</p>
                            </div>
                            
                            <Button asChild className="w-full mt-4">
                                <a href={forum.link} target="_blank" rel="noopener noreferrer">
                                    Go to Community <ExternalLink className="ml-2 h-4 w-4"/>
                                </a>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
