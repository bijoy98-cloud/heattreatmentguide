import { SidebarTrigger } from '@/components/ui/sidebar';

type AppHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function AppHeader({ title, children }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card p-4 md:p-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {children}
      </div>
    </header>
  );
}
