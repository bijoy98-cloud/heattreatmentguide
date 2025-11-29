
'use client';

import { useState, useMemo } from 'react';
import { steelGrades } from '@/lib/heat-treatment-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Database, Download, ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useRouter } from 'next/navigation';

export function AlloyDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredSteels = useMemo(() => {
    if (!searchTerm) {
      return steelGrades;
    }
    return steelGrades.filter((steel) =>
      steel.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCalculate = (steelGrade: string) => {
    router.push(`/calculator?steelGrade=${steelGrade}`);
  };

  const handleDownload = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Label,Carbon,Alloy Factor,Hardenability,Carburizing Factor\n' +
      steelGrades
        .map((e) =>
          `"${e.label}",${e.carbon},${e.alloyFactor},${e.hardenability || ''},${
            e.carburizingFactor || ''
          }`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'steel_grades.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-4 mb-4">
          <Database className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Alloy Database
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Search and explore various steel grades.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-4xl text-justify">
          This database contains key information about common steel grades used in heat treatment. Use the search to filter alloys or download the full list. Select an alloy and click 'Calculate' to pre-fill the Process Parameter Calculator.
        </p>
      </section>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-grow">
              <CardTitle>Steel Grades</CardTitle>
              <CardDescription>
                A list of common alloys and their basic properties.
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search steel grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto bg-blue-50 dark:bg-blue-900/20"
              />
              <Button onClick={handleDownload} variant="default" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download CSV</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alloy Name</TableHead>
                  <TableHead className="text-center">~ Carbon %</TableHead>
                  <TableHead className="text-center">Hardenability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSteels.map((steel) => (
                  <TableRow key={steel.value}>
                    <TableCell className="font-medium">{steel.label}</TableCell>
                    <TableCell className="text-center">{steel.carbon}</TableCell>
                    <TableCell className="text-center capitalize">{steel.hardenability || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleCalculate(steel.value)}
                        variant="ghost"
                        size="sm"
                      >
                        Calculate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
             {filteredSteels.length === 0 && (
                <caption className="text-center p-8 text-muted-foreground">
                    No matching steel grades found for "{searchTerm}".
                </caption>
             )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-300">Looking for more?</CardTitle>
            <CardDescription className="text-blue-800 dark:text-blue-400">
                For in-depth material data sheets and specifications, visit trusted industry resources.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex gap-4">
                <Button variant="outline" asChild>
                    <a href="https://www.matweb.com/" target="_blank" rel="noopener noreferrer">
                        MatWeb <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
                 <Button variant="outline" asChild>
                    <a href="https://www.asminternational.org/" target="_blank" rel="noopener noreferrer">
                        ASM International <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
