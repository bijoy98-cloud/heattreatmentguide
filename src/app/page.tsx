import AppHeader from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookText, Calculator, FlaskConical, ClipboardCheck, BookOpen, Film } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { CardFooter } from '@/components/ui/card';

const featureCards = [
  {
    title: 'Interactive Glossary',
    description: 'Search our database of heat treatment terms and concepts.',
    href: '/glossary',
    icon: BookText,
  },
  {
    title: 'Process Calculator',
    description: 'Calculate parameters for various steel grades and processes.',
    href: '/calculator',
    icon: Calculator,
  },
  {
    title: 'AI Parameter Tool',
    description: 'Get AI-powered recommendations for optimal heat treatment.',
    href: '/parameter-tool',
    icon: FlaskConical,
  },
  {
    title: 'Quiz Zone',
    description: 'Test your knowledge with our metallurgy quizzes.',
    href: '/quiz',
    icon: ClipboardCheck,
  },
  {
    title: 'Learning Hub',
    description: 'Access curated tutorials and reference materials.',
    href: '/learning-hub',
    icon: BookOpen,
  },
  {
    title: 'Video Summaries',
    description: 'Generate concise summaries of educational videos.',
    href: '/video-summaries',
    icon: Film,
  },
];

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === "hero-image");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <section className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8 shadow-lg">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4 drop-shadow-lg">
              Master Metallurgy
            </h2>
            <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
              Your all-in-one guide to heat treatment. Explore interactive tools, AI-powered insights, and a comprehensive learning hub.
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="p-3 rounded-md bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="mt-1">{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                  <Link href={feature.href}>
                    Go to {feature.title.split(' ')[0]} <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
