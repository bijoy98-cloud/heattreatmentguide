
"use client";

import { useState, forwardRef } from "react";
import { quizQuestions } from "@/lib/heat-treatment-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, RefreshCw, HelpCircle, Youtube, Pencil } from "lucide-react";
import { Progress } from "./ui/progress";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export const Quiz = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (isAnswered) {
      // Move to the next question
      setIsAnswered(false);
      setSelectedOption(null);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    } else if (selectedOption) {
      // Check the answer
      const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].answer;
      setIsAnswered(true);
      if (isCorrect) {
        setScore(score + 1);
        toast({
          title: "Correct!",
          description: "Great job!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Incorrect",
          description: `The correct answer is: ${quizQuestions[currentQuestionIndex].answer}`,
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowResults(false);
  };

  if (showResults) {
    const finalScore = (score / quizQuestions.length) * 100;
    return (
      <div ref={ref} className="flex flex-col items-center justify-center space-y-8">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription>You've tested your knowledge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl">Your Score:</p>
            <p className="text-5xl font-bold text-primary">{finalScore.toFixed(0)}%</p>
            <p className="text-muted-foreground">
              You answered {score} out of {quizQuestions.length} questions correctly.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleRestart}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Take Quiz Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const qnaPlaylistImage = PlaceHolderImages.find(img => img.id === 'qna-playlist');

  return (
    <div ref={ref} className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
           <CardTitle className="flex items-center gap-3">
              <Pencil className="h-6 w-6 text-primary" />
              Tests & Quizzes
            </CardTitle>
            <CardDescription>
              See how well you know the fundamentals of heat treatment.
            </CardDescription>
          <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="my-4" />
          <CardTitle className="text-base font-normal">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </CardTitle>
          <CardDescription className="text-lg pt-2 text-foreground">{currentQuestion.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedOption ?? ""}
            onValueChange={setSelectedOption}
            disabled={isAnswered}
          >
            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = option === selectedOption;
                
                let stateIndicator = null;
                if(isAnswered && isSelected) {
                  stateIndicator = isCorrect 
                    ? <CheckCircle className="h-5 w-5 text-green-500" />
                    : <XCircle className="h-5 w-5 text-destructive" />;
                } else if (isAnswered && isCorrect) {
                  stateIndicator = <CheckCircle className="h-5 w-5 text-green-500" />;
                }

                return (
                  <Label
                    key={option}
                    className={`flex items-center justify-between rounded-md border p-4 transition-colors hover:bg-accent/50 ${
                      isAnswered && isCorrect ? "border-green-500 bg-green-500/10" : ""
                    } ${
                      isAnswered && isSelected && !isCorrect ? "border-destructive bg-destructive/10" : ""
                    } ${
                      !isAnswered && isSelected ? "border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={option} />
                      <span className="text-base">{option}</span>
                    </div>
                    {stateIndicator}
                  </Label>
                );
              })}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleNext} disabled={!selectedOption}>
            {isAnswered ? (currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Show Results") : "Check Answer"}
          </Button>
        </CardFooter>
      </Card>
      <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                <Youtube className="h-6 w-6 text-primary" />
                Heat Treatment Q&amp;A Playlist
                </CardTitle>
                <CardDescription>
                Find answers to common questions about heat treatment in this dedicated Q&amp;A video playlist.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <a href="https://www.youtube.com/playlist?list=PL2FvUd3wBb6CDCrC7CXbOLzo0iA4RMqqz" target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                    {qnaPlaylistImage ? (
                        <Image
                            src={qnaPlaylistImage.imageUrl}
                            alt={qnaPlaylistImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={qnaPlaylistImage.imageHint}
                        />
                    ) : (
                        <div className="text-sm text-center text-primary font-semibold p-4 border border-dashed rounded-lg hover:bg-muted h-full flex items-center justify-center">
                            Go to Q&amp;A Playlist
                        </div>
                    )}
                </a>
            </CardContent>
        </Card>
      </div>
    </div>
  );
});

Quiz.displayName = "Quiz";
