
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navItems, type NavItem } from '@/lib/heat-treatment-data';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubContent,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import {
  ExternalLink,
  LogOut,
  Lock,
  Youtube,
  Linkedin,
  Shield,
  CreditCard,
  User as UserIcon,
  ShoppingCart,
  Trash2,
  Settings,
  ArrowUp,
  ChevronDown,
} from 'lucide-react';
import { useFirebase } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from './ui/dropdown-menu';
import { getAuth, signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { GlobalSearch } from './global-search';
import { ThemeToggle } from './theme-toggle';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isAdminUser } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

type Plan = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Admin';


function UserProfileButton() {
  const { user } = useFirebase();
  const router = useRouter();

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/login');
    });
  };

  type Plan = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Admin';
  let currentPlan: Plan;
  const isAdmin = isAdminUser(user);

  if (isAdmin) {
    currentPlan = 'Admin';
  } else if (user.email?.includes('+premium')) {
    currentPlan = 'Premium';
  } else if (user.email === 'bijoysaha98@gmail.com' || user.email?.includes('+standard')) {
    currentPlan = 'Standard';
  } else if (user.email === 'spacetime020372@gmail.com' || user.email?.includes('+basic')) {
    currentPlan = 'Basic';
  } else {
    currentPlan = 'Free';
  }
  
  const isCurrentPlan = true;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL ?? ''}
              alt={user.displayName ?? 'User'}
            />
            <AvatarFallback className="bg-primary/80 text-white">
              {user.email?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {user.displayName ?? 'User'}
              </p>
              <Badge
                variant={currentPlan === 'Admin' ? 'destructive' : 'default'}
                className={cn(
                  "capitalize",
                  currentPlan === 'Free' && 'bg-muted text-muted-foreground',
                  isCurrentPlan && 'bg-green-600 hover:bg-green-700 text-white border-transparent'
                )}
              >
                {currentPlan}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/pricing">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Pricing Plans</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/checkout">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
         <DropdownMenuGroup>
            <DropdownMenuLabel>Manage My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Personal Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/change-password">
                <Lock className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </Link>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <ThemeToggle />
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className={cn(
                'fixed bottom-4 right-4 z-50 rounded-full transition-opacity duration-300',
                isVisible ? 'opacity-100' : 'opacity-0'
            )}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
}

function SidebarNavItem({ item, handleLinkClick }: { item: NavItem, handleLinkClick: (e: React.MouseEvent, href: string) => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useFirebase();

  let currentPlan: Plan = 'Free';
  if (user) {
    if (isAdminUser(user)) {
      currentPlan = 'Admin';
    } else if (user.email?.includes('+premium')) {
      currentPlan = 'Premium';
    } else if (user.email === 'bijoysaha98@gmail.com' || user.email?.includes('+standard')) {
      currentPlan = 'Standard';
    } else if (user.email === 'spacetime020372@gmail.com' || user.email?.includes('+basic')) {
      currentPlan = 'Basic';
    } else {
      currentPlan = 'Free';
    }
  }

  const restrictedPaths: Record<string, (Plan)[]> = {
    '/alloy-database': ['Basic', 'Standard', 'Premium', 'Admin'],
    '/calculator': ['Standard', 'Premium', 'Admin'],
    '/hardness-calculator': ['Standard', 'Premium', 'Admin'],
    '/carburizing': ['Standard', 'Premium', 'Admin'],
    '/quality-assurance': ['Standard', 'Premium', 'Admin'],
    '/brazing': ['Premium', 'Admin'],
    '/plasma-nitriding': ['Standard', 'Premium', 'Admin'],
    '/course': ['Standard', 'Premium', 'Admin'],
    '/management-system': ['Standard', 'Premium', 'Admin'],
  };
  
  const isRestricted = (href: string) => {
      const requiredPlans = restrictedPaths[href];
      return user && requiredPlans && !requiredPlans.includes(currentPlan);
  };
  
  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
            <SidebarMenuButton
                variant="ghost"
                className="justify-start w-full"
                tooltip={{ children: item.label }}
                 onClick={(e) => {
                    if (item.href) handleLinkClick(e, item.href)
                }}
            >
                <item.icon className="shrink-0" />
                <span>{item.label}</span>
                <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <SidebarMenuSub>
                {item.children.map(child => (
                    <SidebarMenuSubItem key={child.href}>
                         <Link href={child.href} className="block w-full" onClick={(e) => handleLinkClick(e, child.href)}>
                            <SidebarMenuSubButton isActive={pathname === child.href} className={cn(isRestricted(child.href) && "text-muted-foreground/50 hover:text-muted-foreground/60")}>
                                <child.icon className="shrink-0" />
                                <span>{child.label}</span>
                                {isRestricted(child.href) && <Lock className="ml-auto h-3 w-3" />}
                            </SidebarMenuSubButton>
                        </Link>
                    </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
     <SidebarMenuItem key={item.href}>
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <SidebarMenuButton
            className="justify-start w-full"
            tooltip={{ children: item.label }}
          >
            <item.icon className="shrink-0" />
            <span>{item.label}</span>
            <ExternalLink className="ml-auto h-3 w-3" />
          </SidebarMenuButton>
        </a>
      ) : (
        <Link
          href={item.href}
          className="block w-full"
          onClick={(e) => handleLinkClick(e, item.href)}
        >
          <SidebarMenuButton
            isActive={!isRestricted(item.href) && pathname === item.href}
            className={cn(
              "justify-start w-full",
              isRestricted(item.href) && "text-muted-foreground/50 hover:text-muted-foreground/60"
            )}
            tooltip={{ children: item.label }}
          >
            <item.icon className="shrink-0" />
            <span>{item.label}</span>
            {isRestricted(item.href) && <Lock className="ml-auto h-3 w-3" />}
          </SidebarMenuButton>
        </Link>
      )}
    </SidebarMenuItem>
  );
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const isAdmin = isAdminUser(user);
  
  let currentPlan: Plan;
  if (user) {
    if (isAdmin) {
      currentPlan = 'Admin';
    } else if (user.email?.includes('+premium')) {
      currentPlan = 'Premium';
    } else if (user.email === 'bijoysaha98@gmail.com' || user.email?.includes('+standard')) {
      currentPlan = 'Standard';
    } else if (user.email === 'spacetime020372@gmail.com' || user.email?.includes('+basic')) {
      currentPlan = 'Basic';
    } else {
      currentPlan = 'Free';
    }
  } else {
    currentPlan = 'Free';
  }


  const restrictedPaths: Record<string, (Plan)[]> = {
    '/alloy-database': ['Basic', 'Standard', 'Premium', 'Admin'],
    '/calculator': ['Standard', 'Premium', 'Admin'],
    '/hardness-calculator': ['Standard', 'Premium', 'Admin'],
    '/carburizing': ['Standard', 'Premium', 'Admin'],
    '/quality-assurance': ['Standard', 'Premium', 'Admin'],
    '/brazing': ['Premium', 'Admin'],
    '/plasma-nitriding': ['Standard', 'Premium', 'Admin'],
    '/course': ['Standard', 'Premium', 'Admin'],
    '/management-system': ['Standard', 'Premium', 'Admin'],
  };
  
  const publicPaths = ['/login', '/about', '/skill-development', '/ai-features'];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === '/' || publicPaths.includes(href)) {
      return;
    }

    if (!isUserLoading && !user) {
      e.preventDefault();
      router.push(`/login?redirect=${href}`);
      return;
    }

    const requiredPlans = restrictedPaths[href];
    if (user && requiredPlans && !requiredPlans.includes(currentPlan)) {
       e.preventDefault();
       router.push('/pricing');
       toast({
         title: 'Upgrade Required',
         description: `This feature requires a ${requiredPlans[0]} plan or higher.`,
         variant: 'destructive',
       });
       return;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems
              .filter((item) => !item.hidden || (item.href === '/admin' && isAdmin))
              .map((item) => (
                 <SidebarNavItem key={item.href} item={item} handleLinkClick={handleLinkClick} />
              ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-center gap-2 p-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600/70 hover:text-red-600"
              asChild
            >
              <a
                href="https://www.youtube.com/channel/UCaoJ6eqgXqawJ9hfEn43Bag"
                target="_blank"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600/70 hover:text-blue-600"
              asChild
            >
              <Link
                href="https://www.facebook.com/HeatTreatmentTraining/"
                target="_blank"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500/70 hover:text-blue-500"
              asChild
            >
              <Link
                href="https://www.linkedin.com/in/bijoy-saha-bijoy98"
                target="_blank"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-muted px-4 sm:px-6">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold tracking-tight text-lg md:text-xl">
                Heat Treatment Guide
              </div>
              <div className="text-sm text-muted-foreground">
                An AI-powered guide
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlobalSearch />
            <UserProfileButton />
          </div>
        </header>
        <div className="flex min-h-[calc(100vh-4rem-1px)] flex-col">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          <footer className="p-4 text-center text-xs text-muted-foreground">
            <Link href="/" className="hover:underline">
              © 2025 heattreatmentguide.com
            </Link>
          </footer>
        </div>
        <ScrollToTopButton />
      </SidebarInset>
    </SidebarProvider>
  );
}

    

    
