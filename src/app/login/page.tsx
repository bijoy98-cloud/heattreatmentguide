
import { AuthForm } from "@/components/auth-form";
import { AppLayout } from "@/components/app-layout";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <AuthForm />
    </div>
  );
}
