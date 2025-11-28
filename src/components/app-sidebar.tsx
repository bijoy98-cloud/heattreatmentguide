'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Flame,
  BookText,
  Calculator,
  FlaskConical,
  ClipboardCheck,
  BookOpen,
  Film,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/glossary', icon: BookText, label: 'Glossary' },
  { href: '/calculator', icon: Calculator, label: 'Calculator' },
  { href: '/parameter-tool', icon: FlaskConical, label: 'AI Parameter Tool' },
  { href: '/quiz', icon: ClipboardCheck, label: 'Quiz Zone' },
  { href: '/learning-hub', icon: BookOpen, label: 'Learning Hub' },
  { href: '/video-summaries', icon: Film, label: 'Video Summaries' },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Flame className="h-6 w-6" />
          </div>
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
            Heat Guide
          </span>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label, side: 'right' }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        {/* Can add user profile or settings here later */}
      </SidebarFooter>
    </Sidebar>
  );
}
