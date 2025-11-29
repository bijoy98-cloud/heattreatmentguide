
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function BillingPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">Manage Billing</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
        <p className="text-muted-foreground">The billing management interface will be implemented here.</p>
      </div>
    </AppLayout>
  );
}
