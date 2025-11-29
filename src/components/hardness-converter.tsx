
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scale } from "lucide-react";

// ASTM E140 approximate conversion data for steel
const conversionTable = [
    { hrc: 68, hv: 940, hbw: 739 },
    { hrc: 65, hv: 800, hbw: 688 },
    { hrc: 62, hv: 720, hbw: 641 },
    { hrc: 60, hv: 697, hbw: 601 },
    { hrc: 58, hv: 649, hbw: 564 },
    { hrc: 55, hv: 595, hbw: 525 },
    { hrc: 52, hv: 544, hbw: 495 },
    { hrc: 50, hv: 513, hbw: 477 },
    { hrc: 48, hv: 485, hbw: 451 },
    { hrc: 45, hv: 446, hbw: 415 },
    { hrc: 42, hv: 409, hbw: 388 },
    { hrc: 40, hv: 384, hbw: 375 },
    { hrc: 38, hv: 361, hbw: 352 },
    { hrc: 35, hv: 331, hbw: 321 },
    { hrc: 32, hv: 302, hbw: 294 },
    { hrc: 30, hv: 285, hbw: 277 },
    { hrc: 25, hv: 258, hbw: 243 },
    { hrc: 20, hv: 228, hbw: 212 },
];

type Scale = "hrc" | "hv" | "hbw";

export function HardnessConverter() {
  const [inputValue, setInputValue] = useState("55");
  const [inputScale, setInputScale] = useState<Scale>("hrc");
  const [outputValues, setOutputValues] = useState({
    hrc: "55",
    hv: "595",
    hbw: "525",
  });

  const handleConversion = (value: string, scale: Scale) => {
    setInputValue(value);
    setInputScale(scale);

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setOutputValues({ hrc: "-", hv: "-", hbw: "-" });
      return;
    }

    let baseHrc = 0;
    if (scale === 'hrc') {
        baseHrc = numValue;
    } else {
        // Find the closest value in the table for the input scale
        let closest = conversionTable.reduce((prev, curr) => {
            return (Math.abs(curr[scale] - numValue) < Math.abs(prev[scale] - numValue) ? curr : prev);
        });
        baseHrc = closest.hrc;
    }

    // Find the two HRC points to interpolate between
    let lower = null;
    let upper = null;
    for (const point of conversionTable) {
        if (point.hrc <= baseHrc) {
            lower = point;
        }
        if (point.hrc >= baseHrc) {
            upper = point;
            break;
        }
    }

    if (!lower || !upper || lower.hrc === upper.hrc) {
        const point = lower || upper || conversionTable[0];
        setOutputValues({
            hrc: point.hrc.toString(),
            hv: point.hv.toString(),
            hbw: point.hbw.toString(),
        });
        return;
    }

    const ratio = (baseHrc - lower.hrc) / (upper.hrc - lower.hrc);
    const hrc = baseHrc.toFixed(1);
    const hv = (lower.hv + ratio * (upper.hv - lower.hv)).toFixed(0);
    const hbw = (lower.hbw + ratio * (upper.hbw - lower.hbw)).toFixed(0);
    
    setOutputValues({ hrc, hv, hbw });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Scale className="h-8 w-8 text-primary" />
          Hardness Converter
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Approximate hardness conversions for steel based on ASTM E140.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Input Value</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-value">Hardness Value</Label>
              <Input
                id="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => handleConversion(e.target.value, inputScale)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-scale">Input Scale</Label>
              <Select
                value={inputScale}
                onValueChange={(scale: Scale) => handleConversion(inputValue, scale)}
              >
                <SelectTrigger id="input-scale">
                  <SelectValue placeholder="Select scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hrc">Rockwell C (HRC)</SelectItem>
                  <SelectItem value="hv">Vickers (HV)</SelectItem>
                  <SelectItem value="hbw">Brinell (HBW)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Converted Values</CardTitle>
                <CardDescription>The approximate equivalent hardness values.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Rockwell C</p>
                        <p className="text-3xl font-bold">{outputValues.hrc}</p>
                        <p className="text-xs text-muted-foreground">HRC</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Vickers</p>
                        <p className="text-3xl font-bold">{outputValues.hv}</p>
                        <p className="text-xs text-muted-foreground">HV</p>
                    </div>
                     <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Brinell</p>
                        <p className="text-3xl font-bold">{outputValues.hbw}</p>
                        <p className="text-xs text-muted-foreground">HBW</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Conversion Table (ASTM E140 for Steel)</CardTitle>
          <CardDescription>
            A reference table for approximate hardness conversions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Rockwell C (HRC)</TableHead>
                  <TableHead className="font-bold">Vickers (HV)</TableHead>
                  <TableHead className="font-bold">Brinell (HBW)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversionTable.map((row) => (
                  <TableRow key={row.hrc} className={row.hrc === Math.round(parseFloat(outputValues.hrc)) ? 'bg-primary/10' : ''}>
                    <TableCell className="font-semibold">{row.hrc}</TableCell>
                    <TableCell>{row.hv}</TableCell>
                    <TableCell>{row.hbw}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
