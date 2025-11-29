
'use client';
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz } from "@/components/quiz";
import { Button } from "./ui/button";
import { Download, Pencil } from "lucide-react";

export function QuizWrapper() {
  const quizRef = useRef<HTMLDivElement>(null);

  const handleGoToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      <Card>
          <CardHeader>
              <CardTitle>Heat Treatment Self-Assessment</CardTitle>
              <CardDescription>Download the form to test your knowledge before taking the exam.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <p className="text-sm text-muted-foreground text-justify">Use this self-assessment form to evaluate your understanding of the course material.</p>
               <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button asChild variant="default" size="sm" className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                        <a href="https://docs.google.com/document/d/1zXyWHExHjDRvetu147gHmFIzboIARiBM-JcX7QyrOAw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download Form
                        </a>
                    </Button>
                    <Button onClick={handleGoToQuiz} size="sm" className="w-full sm:w-auto shrink-0">
                        <Pencil className="mr-2 h-4 w-4" />
                        Take Exam
                    </Button>
               </div>
          </CardContent>
      </Card>
      <Quiz ref={quizRef} />
    </div>
  );
}
