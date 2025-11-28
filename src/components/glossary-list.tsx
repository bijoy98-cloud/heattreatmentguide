
"use client";
import { useState, useMemo } from "react";
import { glossaryTerms } from "@/lib/heat-treatment-data";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { LayoutGrid, List, BookText } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "tiles" | "list" | "content";

export function GlossaryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("tiles");

  const filteredTerms = useMemo(() => {
    if (!searchTerm) {
      return glossaryTerms;
    }
    return glossaryTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const renderContent = () => {
    if (filteredTerms.length === 0) {
      return (
        <p className="md:col-span-2 lg:col-span-3 text-muted-foreground">
          No terms found for "{searchTerm}".
        </p>
      );
    }

    switch (viewMode) {
      case "list":
        return (
          <Card>
            <Accordion type="single" collapsible className="w-full">
              {filteredTerms.map((term) => (
                <AccordionItem
                  value={term.term}
                  key={term.term}
                  className="px-6"
                >
                  <AccordionTrigger>{term.term}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-justify">{term.definition}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        );
      case "content":
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {filteredTerms.map((term) => (
                  <div key={term.term}>
                    <h3 className="font-semibold text-lg">{term.term}</h3>
                    <p className="text-muted-foreground mt-1 text-justify">
                      {term.definition}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case "tiles":
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTerms.map((term) => (
              <Card key={term.term}>
                <CardHeader>
                  <CardTitle>{term.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-justify">{term.definition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Glossary of Terms</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          A searchable list of common heat treatment and metallurgy terms. Use
          the search bar to quickly find definitions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="max-w-sm">
          <Input
            placeholder="Search for a term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "tiles" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("tiles")}
            aria-label="Tiles View"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            aria-label="List View"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "content" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("content")}
            aria-label="Content View"
          >
            <BookText className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
}
