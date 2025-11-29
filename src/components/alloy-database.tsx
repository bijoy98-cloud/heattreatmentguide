"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { steelGrades } from "@/lib/heat-treatment-data";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Database, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export function AlloyDatabase() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSteels = useMemo(() => {
    if (!searchTerm) {
      return steelGrades;
    }
    return steelGrades.filter((steel) =>
      steel.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Database className="h-8 w-8 text-primary" />
          Alloy Database
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
          Explore interactive data for steel grades (e.g., AISI, DIN, JIS) including composition, hardness ranges, and recommended heat treatment cycles. Use the search bar to filter by name.
        </p>
      </div>
      
      <div className="max-w-sm">
        <Input
          placeholder="Search for a steel grade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus-visible:ring-blue-400 bg-primary/10"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Steel Grade</TableHead>
              <TableHead className="font-bold">Carbon %</TableHead>
              <TableHead className="font-bold">Alloy Factor</TableHead>
              <TableHead className="font-bold">Hardenability</TableHead>
              <TableHead className="font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSteels.length > 0 ? (
              filteredSteels.map((steel) => (
                <TableRow key={steel.value}>
                  <TableCell className="font-semibold">{steel.label}</TableCell>
                  <TableCell>{steel.carbon.toFixed(2)}%</TableCell>
                  <TableCell>{steel.alloyFactor.toFixed(1)}</TableCell>
                  <TableCell className="capitalize">{steel.hardenability}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/calculator?steelGrade=${steel.value}`}>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculate
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No steel grades found for "{searchTerm}".
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
