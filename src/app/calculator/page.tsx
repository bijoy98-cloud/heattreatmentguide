'use client';

import { useState } from 'react';
import AppHeader from '@/components/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steelGrades = {
  'aisi-1045': {
    name: 'AISI 1045',
    process: 'Quench and Temper',
    austenitizing: '820-850°C',
    soak: '1 hour per inch of thickness',
    quench: 'Water',
    tempering: '400-650°C',
  },
  'aisi-4140': {
    name: 'AISI 4140',
    process: 'Quench and Temper',
    austenitizing: '830-860°C',
    soak: '1 hour per inch of thickness',
    quench: 'Oil',
    tempering: '450-700°C',
  },
  'aisi-d2': {
    name: 'AISI D2',
    process: 'Air Hardening',
    austenitizing: '1010-1040°C',
    soak: '30-45 minutes',
    quench: 'Air cool',
    tempering: '200-540°C (double temper)',
  },
};

type SteelGradeKey = keyof typeof steelGrades;

export default function CalculatorPage() {
  const [selectedGrade, setSelectedGrade] = useState<SteelGradeKey | null>(null);

  const result = selectedGrade ? steelGrades[selectedGrade] : null;

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Process Calculator" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Parameters</CardTitle>
              <CardDescription>Choose a steel grade to see its recommended heat treatment process.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="steel-grade">Steel Grade</Label>
                  <Select onValueChange={(value) => setSelectedGrade(value as SteelGradeKey)}>
                    <SelectTrigger id="steel-grade" className="text-base">
                      <SelectValue placeholder="Select a steel grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aisi-1045">AISI 1045</SelectItem>
                      <SelectItem value="aisi-4140">AISI 4140</SelectItem>
                      <SelectItem value="aisi-d2">AISI D2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle>Recommended Process</CardTitle>
              <CardDescription>
                {result ? `Parameters for ${result.name}` : 'Select a grade to see results.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="font-semibold text-lg">{result.process}</div>
                  <ul className="space-y-3 text-sm">
                    <li><strong className="text-foreground font-medium">Austenitizing Temp:</strong> <span className="text-muted-foreground">{result.austenitizing}</span></li>
                    <li><strong className="text-foreground font-medium">Soaking Time:</strong> <span className="text-muted-foreground">{result.soak}</span></li>
                    <li><strong className="text-foreground font-medium">Quenching Medium:</strong> <span className="text-muted-foreground">{result.quench}</span></li>
                    <li><strong className="text-foreground font-medium">Tempering Temp:</strong> <span className="text-muted-foreground">{result.tempering}</span></li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 text-muted-foreground">
                  <p>Results will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
