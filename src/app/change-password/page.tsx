
import { AppLayout } from "@/components/app-layout";
import { ChangePasswordForm } from "@/components/change-password-form";

export default function ChangePasswordPage() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
            <ChangePasswordForm />
        </div>
      </div>
    </AppLayout>
  );
}
