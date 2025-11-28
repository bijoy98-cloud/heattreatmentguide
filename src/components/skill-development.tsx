
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ExternalLink, BookOpen, GraduationCap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const videoCategories = [
  {
    category: "Fundamentals",
    videos: [
      {
        title: "OSHA: Occupational Safety and Health Administration.",
        description: "An overview of OSHA standards for workplace safety.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/_kTrQvFO0AA",
        imageId: "phase-diagram"
      },
      {
        title: "Understanding Heat Treatment: Processes, Applications, and Benefits...",
        description: "Basic concepts and importance of heat treatment in metallurgy",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/D9mJczJ4RgI",
        imageId: "heat-treatment-intro"
      },
      {
        title: "How Heat Treatment Affects the Properties of Metal and Alloys",
        description: "Explore the impact of heat treatment on metal properties.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/WCT3oJUEPc0",
        imageId: "heat-treatment-properties"
      },
      {
        title: "Master HEAT TREATMENT Techniques for Maximum Results!",
        description: "An overview of various techniques to achieve optimal results.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/mk8TjL4PiDE",
        imageId: "heat-treatment-techniques"
      },
      {
        title: "Mastering Heat Treatment of Steel: 10 Essential Tips!",
        description: "A rundown of 10 essential tips for mastering the heat treatment of steel.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/odDQi6682TY",
        imageId: "mastering-heat-treatment"
      },
      {
        title: "Mastering the Basics of Metallurgy: A Beginner's Guide",
        description: "An in-depth guide covering the fundamental concepts of metallurgy for beginners.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/Qtwoaj-0cS8",
        imageId: "metallurgy-basics"
      }
    ]
  },
  {
    category: "Heat Treatment Processes",
    videos: [
      {
        title: "Unlocking the Secrets of Annealing: Heat Treatment Explained!",
        description: "Full annealing, stress relief, and spheroidizing annealing",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/aFGLOWHf1Ns",
        imageId: "annealing-secrets"
      },
      {
        title: "Unlocking the Secrets of Heat Treatment in Ageing!",
        description: "A detailed look into the ageing process in heat treatment.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/TAy2xFLhaKM",
        imageId: "heat-treatment-ageing"
      },
      {
        title: "5 key points explaining why heat treatment tempering is so important!",
        description: "Why tempering is essential and how to perform it correctly",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/Db7mvMcvJKo",
        imageId: "tempering-importance"
      }
    ]
  },
  {
    category: "Surface Hardening",
    videos: [
      {
        title: "Decarburization vs Carburization — What’s the Difference?",
        description: "Learn the key differences between adding and removing carbon from a steel's surface.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/lG1JDxw5u4A",
        imageId: "decarburization-vs-carburization"
      },
      {
        title: "Induction Foundry and Heat Treatment Explained!",
        description: "Electromagnetic induction for localized hardening",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/eg4b2Vnd-bM",
        imageId: "induction-foundry"
      },
      {
        title: "Introduction to Plasma Nitriding: A Modern Surface Treatment for Metals",
        description: "A modern surface treatment for metals.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/zyxB5YzYTgQ",
        imageId: "plasma-nitriding-intro"
      }
    ]
  },
  {
    category: "Advanced Topics",
    videos: [
      {
        title: "Forging vs. Heat Treatment The Ultimate Strength Showdown!",
        description: "Comparing forging and heat treatment for ultimate strength.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/m3e2UC47o9w",
        imageId: "forging-vs-heat-treatment"
      },
      {
        title: "The Secret Process Behind Die Casting Dies (Factory Tour!)",
        description: "A look into the die casting process.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/9ba0NXU5uEo",
        imageId: "die-casting-dies"
      },
      {
        title: "Introduction to Powder Metallurgy: Process, Applications, and Benefits.",
        description: "An overview of powder metallurgy.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/vAVL1wCGjZc",
        imageId: "powder-metallurgy"
      },
      {
        title: "Laser Welding Explained: Technology, Process, and Applications..",
        description: "An explanation of laser welding technology, its process, and various applications.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/qXVpyPPkLUw",
        imageId: "laser-welding"
      },
      {
        title: "Heat Treatment Tips & Tricks: Expert Techniques for Superior Results.",
        description: "Expert techniques for achieving superior results in heat treatment.",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/QFmu4rRUlhg",
        imageId: "heat-treatment-tips"
      },
      {
        title: "Unlocking the Secrets of Sub-Zero Heat Treatment!",
        description: "Deep freezing for improved wear resistance and stability",
        channel: "Heat Treatment of Steel - Bijoy Saha",
        url: "https://youtu.be/sc9Od8fWefU",
        imageId: "cryogenic-treatment"
      }
    ]
  }
];

export function SkillDevelopment() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <GraduationCap className="w-10 h-10 text-primary" />
          Skill Development
        </h1>
        <p className="text-muted-foreground text-justify">
          Curated video tutorials and resources for mastering heat treatment
        </p>
      </div>

      <Card className="mb-8 bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary-foreground">
            <Video className="w-6 h-6" />
            Featured Channel: Heat Treatment Guide
          </CardTitle>
          <CardDescription className="text-primary-foreground/90 text-justify">
            By Bijoy Saha - Professional video series covering all aspects of heat treatment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="secondary"
            className="gap-2"
            asChild
          >
            <Link href="https://www.youtube.com/channel/UCaoJ6eqgXqawJ9hfEn43Bag" target="_blank">
              Visit YouTube Channel
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {videoCategories.map((category) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.videos.map((video, index) => {
                const image = video.imageId ? PlaceHolderImages.find(img => img.id === video.imageId) : undefined;
                return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
                      {image ? (
                        <Image 
                          src={image.imageUrl} 
                          alt={image.description} 
                          fill
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      ) : (
                        <Video className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="text-justify">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => window.open(video.url, "_blank")}
                    >
                      Watch on YouTube
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              )})}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
