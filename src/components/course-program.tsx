'use client';
import {
  Book,
  CheckCircle,
  ChevronDown,
  Star,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { courseLevels } from '@/lib/heat-treatment-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';

const levelConfig = {
  beginner: {
    icon: Star,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  intermediate: {
    icon: BrainCircuit,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  advanced: {
    icon: GraduationCap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
};

function DayCard({ day, levelId }: { day: any; levelId: keyof typeof levelConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const config = levelConfig[levelId];

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen && 'shadow-lg'
      )}
    >
      <CardHeader
        className={cn(
          'flex-row items-center gap-4 p-4 cursor-pointer',
          config.bgColor
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold',
            config.bgColor,
            config.color
          )}
        >
          {day.day}
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{day.title}</CardTitle>
          <div className="mt-1 flex flex-wrap gap-1">
            {day.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </CardHeader>
      {isOpen && (
        <CardContent className="p-4 space-y-4">
          <p className="text-muted-foreground text-sm text-justify">
            {day.description}
          </p>
          <div>
            <h4 className="font-semibold mb-2 text-sm">Key Topics:</h4>
            <ul className="space-y-2">
              {day.topics.map((topic: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle
                    className={cn('mt-1 h-4 w-4 shrink-0', config.color)}
                  />
                  <span className="text-muted-foreground">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function CourseProgram() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Book className="h-8 w-8 text-primary" />
          Heat Treatment Course Program
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Your structured guide to mastering heat treatment, from basic
          principles to advanced industrial applications.
        </p>
      </div>

      <div className="space-y-16">
        {courseLevels.map(level => {
          const config = levelConfig[level.id as keyof typeof levelConfig];
          return (
            <section key={level.id}>
              <div className="mb-8 space-y-2">
                <h2
                  className="flex items-center gap-3 text-2xl font-bold tracking-tight"
                >
                  <config.icon className={cn('h-7 w-7', config.color)} />
                  {level.title}
                </h2>
                <p className="text-muted-foreground text-justify">
                  {level.description} ({level.duration})
                </p>
              </div>
              <div className="space-y-3">
                {level.days.map(day => (
                  <DayCard
                    key={day.day}
                    day={day}
                    levelId={level.id as keyof typeof levelConfig}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
