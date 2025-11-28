'use client';

import { useState } from 'react';
import AppHeader from '@/components/app-header';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { glossaryData } from '@/app/data/glossary';
import { Search } from 'lucide-react';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = glossaryData
    .filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Interactive Glossary" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search terms, definitions, etc..."
              className="pl-10 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Accordion type="single" collapsible className="w-full rounded-lg border">
            {filteredGlossary.map((item, index) => (
              <AccordionItem value={item.term} key={item.term} className={index === filteredGlossary.length - 1 ? 'border-b-0' : ''}>
                <AccordionTrigger className="text-lg hover:no-underline px-6">{item.term}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed px-6">
                  {item.definition}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredGlossary.length === 0 && (
             <div className="text-center py-10 bg-card rounded-lg border">
                <p className="text-muted-foreground">No terms found for "{searchTerm}".</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
