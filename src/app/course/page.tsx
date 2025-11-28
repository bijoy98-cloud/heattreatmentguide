
import { AppLayout } from "@/components/app-layout";
import { CourseProgram } from "@/components/course-program";
import { QuizWrapper } from "@/components/quiz-wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Treatment Course - Basic to Advanced Programs",
  description: "Explore our structured 45-day heat treatment course, covering everything from fundamental principles for beginners to advanced metallurgy, pyrometry, and compliance for experts.",
};

export default function CoursePage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <CourseProgram />
        </div>
        <div className="lg:col-span-2">
            <QuizWrapper />
        </div>
      </div>
    </AppLayout>
  );
}
