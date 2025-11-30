'use client'

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { navItems } from "@/lib/heat-treatment-data";
import Link from "next/link";
import { HomeClientLinks } from "@/components/home-client-links";
import { CheckCircle } from "lucide-react";
import { useFirebase } from "@/firebase";
import { PricingDialog } from "@/components/pricing-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Plan = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Admin';

export default function Home() {
  const features = navItems.filter(
    (item) =>
      ((!item.children &&
        ((item.href === '/about' || (!item.external && !item.hidden)) ||
          item.href === '/fundamental' ||
          item.href === '/hazard-identification'))) ||
      item.href === '/ai-features' ||
      item.href === '/industrial-safety'
  );
  
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  let currentPlan: Plan = 'Free';
  if (user) {
      const isAdmin = user.email === 'bijoy98@gmail.com';
      if (isAdmin) {
        currentPlan = 'Admin';
      } else if (user.email?.includes('+premium')) {
        currentPlan = 'Premium';
      } else if (user.email === 'bijoysaha98@gmail.com' || user.email?.includes('+standard')) {
        currentPlan = 'Standard';
      } else if (user.email === 'spacetime020372@gmail.com' || user.email?.includes('+basic')) {
        currentPlan = 'Basic';
      }
  }
  
  const restrictedPathsConfig: Record<string, (Plan)[]> = {
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

  const handleFeatureClick = (e: React.MouseEvent, href: string) => {
    if (isUserLoading) {
      e.preventDefault();
      return;
    }
    
    // Public paths that do not require login
    if (href === '/about' || href === '/skill-development') {
      router.push(href);
      return;
    }

    const requiredPlans = restrictedPathsConfig[href];

    // If there are no required plans, it's a free feature for logged-in users.
    if (!requiredPlans) {
      if (!user) {
         e.preventDefault();
         router.push(`/login?redirect=${href}`);
      } else {
        router.push(href);
      }
      return;
    }

    if (!user) {
      e.preventDefault();
      router.push(`/login?redirect=${href}`);
      return;
    }
    
    if (!requiredPlans.includes(currentPlan)) {
      e.preventDefault();
      router.push('/pricing');
      toast({
        title: "Upgrade Required",
        description: `This feature requires a ${requiredPlans[0]} plan or higher.`,
        variant: "destructive",
      });
    } else {
      router.push(href);
    }
  };


  return (
    <AppLayout>
      <div className="space-y-12">
        <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-background p-8">
            <div className="relative z-10 space-y-6">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    The Future of Metallurgy is Here
                </h1>
                <p className="max-w-3xl text-lg text-muted-foreground text-justify">
                    Your comprehensive, AI-powered assistant for steel heat treatment. Explore processes, calculate parameters, and get suggestions to perfect your craft.
                </p>
                <div className="pt-4">
                    <HomeClientLinks />
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>AI-Powered Suggestions</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Comprehensive Alloy Database</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Process Calculators</span>
                    </div>
                </div>
            </div>
             <div className="absolute inset-0 z-0 bg-grid-slate-100/[0.03] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Explore Our Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const requiredPlans = restrictedPathsConfig[feature.href];
              const isRestricted = user ? requiredPlans && !requiredPlans.includes(currentPlan) : !!requiredPlans;

              return (
                <div key={feature.href} onClick={(e) => handleFeatureClick(e, feature.href)} className="cursor-pointer h-full">
                  <Card className="group h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description || `Explore ${feature.label.toLowerCase()} and expand your knowledge.`}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
