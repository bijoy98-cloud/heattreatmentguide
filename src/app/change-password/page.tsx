
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function ChangePasswordPage() {
  return (
    <AppLayout>
       <div className="flex flex-col items-center justify-center h-full text-center">
        <Lock className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="text-muted-foreground mt-2">This page is under construction.</p>
        <p className="text-muted-foreground">The password change functionality will be implemented here.</p>
      </div>
    </AppLayout>
  );
}
