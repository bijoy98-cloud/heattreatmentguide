
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Quiz = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div ref={ref}>
        <Card>
            <CardHeader>
                <CardTitle>Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The interactive quiz will be implemented here.</p>
            </CardContent>
        </Card>
    </div>
  );
});

Quiz.displayName = 'Quiz';
