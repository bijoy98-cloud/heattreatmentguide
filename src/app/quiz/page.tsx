
'use client';

import { useState } from 'react';
import AppHeader from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { quizQuestions } from '@/app/data/quizzes';
import { CheckCircle, XCircle, Award, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/app-layout';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const isQuizFinished = currentQuestionIndex >= quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }

  return (
    <AppLayout>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Metallurgy Quiz</CardTitle>
                {!isQuizFinished && (
                    <>
                    <CardDescription>Question {currentQuestionIndex + 1} of {quizQuestions.length}</CardDescription>
                    <Progress value={((currentQuestionIndex) / quizQuestions.length) * 100} className="mt-2" />
                    </>
                )}
            </CardHeader>
            <CardContent>
                {isQuizFinished ? (
                <div className="text-center space-y-4 py-8">
                    <Award className="mx-auto h-16 w-16 text-accent" />
                    <h2 className="text-2xl font-bold">Quiz Complete!</h2>
                    <p className="text-lg text-muted-foreground">
                    You scored {score} out of {quizQuestions.length}.
                    </p>
                    <Button onClick={handleRestart}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Take Again
                    </Button>
                </div>
                ) : (
                <div className="space-y-6">
                    <p className="text-lg font-semibold">{currentQuestion.question}</p>
                    <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = index === currentQuestion.correctAnswer;
                        const isSelected = selectedAnswer === index;
                        return (
                        <Button
                            key={index}
                            variant="outline"
                            className={cn(
                            'w-full justify-start text-left h-auto py-3 text-base',
                            isAnswered && isCorrect && 'bg-green-100 border-green-500 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900',
                            isAnswered && isSelected && !isCorrect && 'bg-red-100 border-red-500 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900',
                            'relative'
                            )}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                        >
                            {option}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="absolute right-4 h-5 w-5 text-red-600" />}
                            {isAnswered && isCorrect && <CheckCircle className="absolute right-4 h-5 w-5 text-green-600" />}
                        </Button>
                        );
                    })}
                    </div>
                    {isAnswered && (
                    <Button onClick={handleNext} className="w-full mt-6">
                        {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                    )}
                </div>
                )}
            </CardContent>
            </Card>
        </main>
    </AppLayout>
  );
}
