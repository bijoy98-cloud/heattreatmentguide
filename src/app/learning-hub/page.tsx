import AppHeader from '@/components/app-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { learningHubItems } from '@/app/data/learning-hub';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Youtube, Book, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LearningHubPage() {
  const allImages = placeholderImagesData.placeholderImages;

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Learning Hub" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Curated Resources</h2>
                <p className="text-muted-foreground">Tutorials, videos, and guides from trusted sources.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {learningHubItems.map((item) => {
                    const image = allImages.find(img => img.id === item.imageId);
                    return (
                        <Card key={item.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            {image && (
                                <div className="relative aspect-video">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={image.imageHint}
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    {item.type === 'video' ? <Youtube className="h-4 w-4"/> : <Book className="h-4 w-4" />}
                                    {item.source}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        View Resource <ArrowRight className="ml-2 h-4 w-4"/>
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
      </main>
    </div>
  );
}
