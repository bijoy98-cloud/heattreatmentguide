
import { AppLayout } from "@/components/app-layout";

export default function LearningHubPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Learning Hub</h2>
        <p className="text-muted-foreground">
          Loading content...
        </p>
      </div>
    </AppLayout>
  );
}
