
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from '@/lib/heat-treatment-data';
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
  Briefcase,
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
import { useCart } from '@/hooks/use-cart';
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

        <DropdownMenuGroup>
          <DropdownMenuLabel>Subscription</DropdownMenuLabel>
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
           <DropdownMenuItem asChild>
            <Link href="/billing">
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Manage Billing</span>
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
            variant="default"
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
  
  const publicPaths = ['/login', '/about', '/skill-development'];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === '/' || publicPaths.includes(href) || href === '/skill-development') {
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

  const mainNavItems = navItems.filter(item => !item.parent);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mainNavItems
              .filter((item) => !item.hidden)
              .map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isParentActive = pathname === item.href || (hasChildren && item.children.some(child => pathname === child.href));

                if (hasChildren) {
                  return (
                    <Collapsible key={item.href} asChild>
                      <SidebarMenuItem>
                        <div className="flex items-center w-full">
                          <Link
                            href={item.href}
                            className="flex-grow"
                            onClick={(e) => handleLinkClick(e, item.href)}
                          >
                            <SidebarMenuButton
                              isActive={pathname === item.href}
                              className='justify-start w-full rounded-r-none'
                              tooltip={{ children: item.label }}
                            >
                              <item.icon className="shrink-0" />
                              <span>{item.label}</span>
                            </SidebarMenuButton>
                          </Link>
                          <CollapsibleTrigger asChild>
                             <SidebarMenuButton
                              className='justify-center w-10 rounded-l-none p-0'
                              isActive={isParentActive && pathname !== item.href}
                              aria-label={`Toggle ${item.label} submenu`}
                             >
                              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        </div>

                        <CollapsibleContent asChild>
                          <div className="space-y-1 pl-6 pt-1">
                            {item.children?.map(child => {
                               const requiredPlans = restrictedPaths[child.href];
                               const isRestricted = user && requiredPlans && !requiredPlans.includes(currentPlan);
                               return (
                                <SidebarMenuItem key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block w-full"
                                    onClick={(e) => handleLinkClick(e, child.href)}
                                  >
                                    <SidebarMenuButton
                                      isActive={!isRestricted && pathname === child.href}
                                      className={cn(
                                        'justify-start w-full',
                                        isRestricted && 'text-muted-foreground/50 hover:text-muted-foreground/60'
                                      )}
                                      tooltip={{ children: child.label }}
                                    >
                                      <child.icon className="shrink-0" />
                                      <span>{child.label}</span>
                                      {isRestricted && <Lock className="ml-auto h-3 w-3" />}
                                    </SidebarMenuButton>
                                  </Link>
                                </SidebarMenuItem>
                               )
                            })}
                          </div>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                const requiredPlans = restrictedPaths[item.href];
                const isRestricted = user && requiredPlans && !requiredPlans.includes(currentPlan);

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
                          isActive={!isRestricted && pathname === item.href}
                          className={cn(
                            'justify-start w-full',
                            isRestricted && 'text-muted-foreground/50 hover:text-muted-foreground/60'
                          )}
                          tooltip={{ children: item.label }}
                        >
                          <item.icon className="shrink-0" />
                          <span>{item.label}</span>
                          {isRestricted && <Lock className="ml-auto h-3 w-3" />}
                        </SidebarMenuButton>
                      </Link>
                    )}
                  </SidebarMenuItem>
                );
              })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
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
