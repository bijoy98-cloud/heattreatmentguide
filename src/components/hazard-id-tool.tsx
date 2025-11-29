
'use client';

import { useState } from 'react';
import { hazardCategories } from '@/lib/heat-treatment-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ListChecks, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HazardIdTool() {
  const allItems = hazardCategories.flatMap(category => category.items);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = (totalChecked / allItems.length) * 100;
  
  const handleReset = () => {
    setCheckedItems({});
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-4 mb-4">
            <ListChecks className="w-12 h-12 text-primary" />
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Hazard Identification Tool</h1>
                <p className="text-lg text-muted-foreground mt-1 text-justify">
                    An interactive checklist for routine safety audits.
                </p>
            </div>
        </div>
        <p className="text-muted-foreground max-w-4xl text-justify">
            Walk through your work area and use this tool to verify that key safety measures are in place. Checking an item confirms that the condition is met and safe. Leaving an item unchecked indicates a potential hazard that requires attention.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Safety Checklist Progress</CardTitle>
          <div className="flex items-center gap-4 pt-2">
            <Progress value={progressPercentage} className="w-full" />
            <span className="text-lg font-bold text-muted-foreground whitespace-nowrap">
              {totalChecked} / {allItems.length}
            </span>
          </div>
        </CardHeader>
        <CardContent>
            {totalChecked > 0 && (
                <Button variant="outline" onClick={handleReset}>Reset Checklist</Button>
            )}
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {hazardCategories.map(category => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map(item => {
                const isChecked = checkedItems[item.id] || false;
                return (
                  <div
                    key={item.id}
                    className={cn(
                        "flex items-center space-x-3 rounded-lg p-4 transition-colors",
                        isChecked ? 'bg-green-500/10 border-green-500/20 border' : 'bg-muted/40'
                    )}
                  >
                    <Checkbox
                      id={item.id}
                      checked={isChecked}
                      onCheckedChange={(checked) => handleCheckChange(item.id, !!checked)}
                      className="w-5 h-5"
                    />
                    <Label
                      htmlFor={item.id}
                      className={cn("text-base flex-1 cursor-pointer", isChecked && "text-green-700 dark:text-green-300")}
                    >
                      {item.label}
                    </Label>
                    {isChecked 
                        ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                        : <AlertTriangle className="w-5 h-5 text-amber-500" />
                    }
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
