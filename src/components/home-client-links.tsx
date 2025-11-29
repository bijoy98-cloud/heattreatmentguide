
'use client';

import { Button } from "@/components/ui/button";
import { Database, Calculator, BookOpen } from "lucide-react";
import Link from "next/link";

export function HomeClientLinks() {
  const quickLinks = [
    {
      href: "/alloy-database",
      label: "Alloy Database",
      icon: Database,
    },
    {
      href: "/calculator",
      label: "Calculator",
      icon: Calculator,
    },
    {
      href: "/processes",
      label: "Processes",
      icon: BookOpen,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {quickLinks.map((link) => (
        <Button key={link.href} asChild variant="outline" size="lg" className="justify-start text-primary border-primary hover:bg-primary/10 hover:text-primary">
          <Link href={link.href}>
            <link.icon className="mr-2 h-5 w-5" />
            {link.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
