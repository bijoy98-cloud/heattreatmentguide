
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, CreditCard, Star, ShoppingCart, HelpCircle, Calculator, Info } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AppLayout } from '@/components/app-layout';

type Plan = 'Basic' | 'Standard' | 'Premium';

const plansData: {
    name: Plan;
    price: string;
    id: string;
    priceAmount: number;
    period: string;
    description: string;
    features: string[];
    cta: string;
    isPrimary: boolean;
}[] = [
  {
    name: 'Basic',
    id: 'plan_basic',
    price: '$25',
    priceAmount: 25,
    period: 'per year',
    description: 'Ideal for students, hobbyists, and individuals starting in the field. Get access to core AI tools and a rich library of reference materials to support your learning and projects.',
    features: [
      "AI Material Suggestion",
      "AI Fault Diagnosis",
      "AI Image Analyzer",
      "Searchable Alloy Database",
      "Process Explanations & Glossary",
      "Industrial Safety & PPE Guides"
    ],
    cta: 'Get Started',
    isPrimary: false,
  },
  {
    name: 'Standard',
    id: 'plan_standard',
    price: '$50',
    priceAmount: 50,
    period: 'per year',
    description: 'Perfect for professionals and small teams. This plan unlocks advanced AI calculators for process design, structured learning programs, and in-depth guides for daily operations.',
    features: [
      'All Basic features, plus:',
      'Hardness-Based AI Process Calculator',
      'Carburizing AI Process Generator',
      'Full 90-Day Course Program & Quizzes',
      'Quality Assurance & Management System Guides',
      'Special Process Guides (Nitriding)',
    ],
    cta: 'Upgrade',
    isPrimary: true,
  },
  {
    name: 'Premium',
    id: 'plan_premium',
    price: '$100',
    priceAmount: 100,
    period: 'per year',
    description: 'The complete toolkit for experts, consultants, and organizations. Gain a competitive edge with exclusive access to live AI chat for immediate expert consultation and specialized process data.',
    features: [
      'All Standard features, plus:',
      'Live AI Chat for direct Q&A',
      'Specialized Brazing Process Guide & Calculator',
      'Downloadable Work Instruction Templates',
      'Priority Email & Chat Support',
      'Access to exclusive webinars',
    ],
    cta: 'Upgrade',
    isPrimary: false,
  },
];

function UpgradeCalculator() {
  const [currentPlan, setCurrentPlan] = useState('');
  const [targetPlan, setTargetPlan] = useState('');
  const [daysSubscribed, setDaysSubscribed] = useState('');
  const [upgradeFee, setUpgradeFee] = useState<string | null>(null);
  const { toast } = useToast();

  const planPrices: Record<string, number> = {
    Basic: 25,
    Standard: 50,
    Premium: 100,
  };

  const calculateFee = () => {
    if (!currentPlan || !targetPlan || !daysSubscribed) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill out all fields." });
      return;
    }
    
    const days = parseInt(daysSubscribed, 10);
    if (isNaN(days) || days < 0) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid number of days." });
      return;
    }

    if (planPrices[targetPlan] <= planPrices[currentPlan]) {
      setUpgradeFee("No upgrade fee required for a downgrade or same-level plan.");
      return;
    }

    let fee = 0;
    
    if (days <= 30) {
        // Promotional fixed-fee logic
        if (currentPlan === 'Basic' && targetPlan === 'Standard') {
            fee = 25;
        } else if (currentPlan === 'Standard' && targetPlan === 'Premium') {
            fee = 50; 
        } else if (currentPlan === 'Basic' && targetPlan === 'Premium') {
            fee = 75;
        }
    } else {
        // Pro-rata logic for upgrades after 30 days
        const daysRemaining = 365 - days > 0 ? 365 - days : 0;
        const unusedValue = planPrices[currentPlan] * (daysRemaining / 365);
        fee = planPrices[targetPlan] - unusedValue;
    }
    
    setUpgradeFee(`Calculated Upgrade Fee: $${fee.toFixed(2)}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Calculator className="h-6 w-6 text-primary" />
          Upgrade Fee Calculator
        </CardTitle>
        <CardDescription>
          Estimate the cost to upgrade your plan based on our pricing model.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-plan">Current Plan</Label>
            <Select value={currentPlan} onValueChange={setCurrentPlan}>
              <SelectTrigger id="current-plan">
                <SelectValue placeholder="Select current plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-plan">Desired Plan</Label>
            <Select value={targetPlan} onValueChange={setTargetPlan}>
              <SelectTrigger id="target-plan">
                <SelectValue placeholder="Select target plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="days-subscribed">Days Since Subscription Started</Label>
          <Input id="days-subscribed" type="number" placeholder="e.g., 15" value={daysSubscribed} onChange={(e) => setDaysSubscribed(e.target.value)} />
        </div>
        <Button onClick={calculateFee} className="w-full">Calculate Fee</Button>
        {upgradeFee && (
          <div className="pt-4 text-center">
            <p className="text-lg font-semibold">{upgradeFee}</p>
          </div>
        )}
        <div className="!mt-6 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
                <Info className="h-4 w-4 mt-1 shrink-0 text-primary"/>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">How Our Upgrade Pricing Works</h4>
                     <ol className="list-decimal list-inside space-y-2">
                        <li>
                            <strong>Promotional Offer (First 30 Days):</strong> To help you get the most value right away, we offer simple, fixed-price upgrades within the first 30 days of your subscription. For example, upgrading from Basic to Standard costs just $25.
                        </li>
                        <li>
                            <strong>Pro-Rata Model (After 30 Days):</strong> After the promotional period, all upgrades are calculated fairly. We credit you for the unused portion of your current plan, so you only pay the difference for the remaining time on your new, upgraded plan. This ensures fairness at any point in your subscription.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default function PricingPage() {
  const { user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  type UserPlan = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Admin';
  let currentPlan: UserPlan = 'Free';

  if (user) {
    if (user.email === 'bijoy98@gmail.com') {
      currentPlan = 'Admin';
    } else if (user.email?.includes('+premium')) {
      currentPlan = 'Premium';
    } else if (user.email === 'bijoysaha98@gmail.com' || user.email?.includes('+standard')) {
      currentPlan = 'Standard';
    } else if (user.email === 'spacetime020372@gmail.com' || user.email?.includes('+basic')) {
      currentPlan = 'Basic';
    }
  }
  
  const handleUpgradeClick = (plan: typeof plansData[0]) => {
    if (!user) {
      router.push('/login?redirect=/pricing');
      return;
    }
    
    let price = plan.priceAmount;
    if (currentPlan === 'Basic' && plan.name === 'Standard') {
        price = 50;
    } else if (currentPlan === 'Basic' && plan.name === 'Premium') {
        price = 100;
    } else if (currentPlan === 'Standard' && plan.name === 'Premium') {
        price = 100;
    }
    
    // @ts-ignore
    addToCart({
      id: plan.id,
      name: plan.name,
      price: price,
    });
    
    toast({
      title: 'Plan Added',
      description: `${plan.name} plan has been added to your order.`,
    });
    
    router.push('/checkout');
  };
  
  const planHierarchy: Record<UserPlan, number> = {
      'Free': 0,
      'Basic': 1,
      'Standard': 2,
      'Premium': 3,
      'Admin': 4,
  };

  const getPlanPrice = (currentPlan: UserPlan, targetPlan: Plan) => {
    if (targetPlan === 'Basic') return '$25';

    if (currentPlan === 'Basic' && targetPlan === 'Standard') return '$50';
    if (currentPlan === 'Basic' && targetPlan === 'Premium') return '$100';
    if (currentPlan === 'Standard' && targetPlan === 'Premium') return '$100';

    if (targetPlan === 'Standard') return '$50';
    if (targetPlan === 'Premium') return '$100';

    return plansData.find(p => p.name === targetPlan)?.price || '$0';
  };

  const freePlan = {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Access essential learning resources and community forums at no cost.',
    features: [
      'Community and Forum Access',
      'Skill Development Video Library'
    ],
    cta: 'Get Started for Free',
    isPrimary: false,
  };


  return (
    <AppLayout>
      <div className="space-y-12">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <CreditCard className="h-8 w-8 text-primary" />
            Pricing Plans
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Choose a plan that fits your needs. Start for free and upgrade as you
            grow.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[330px] md:max-w-[580px] lg:max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plansData.map((plan) => {
              const isCurrentPlan = plan.name === currentPlan || (currentPlan === 'Admin' && plan.name === 'Premium');
              const isDowngrade = plan.name !== 'Basic' && planHierarchy[plan.name as UserPlan] < planHierarchy[currentPlan];
              const isUpgrade = planHierarchy[plan.name as UserPlan] > planHierarchy[currentPlan];

              let ctaText = plan.cta;
              if (isCurrentPlan) ctaText = 'Your Current Plan';
              else if (isDowngrade) ctaText = 'Downgrade';
              else ctaText = `Upgrade to ${plan.name}`;

              const displayPrice = isUpgrade ? getPlanPrice(currentPlan, plan.name) : plan.price;

              return (
                  <Card
                  key={plan.name}
                  className={cn(
                      "flex flex-col border-2",
                      isCurrentPlan && "border-green-600",
                      !isCurrentPlan && plan.name === 'Basic' && 'border-plan-basic',
                      !isCurrentPlan && plan.name === 'Standard' && 'border-plan-standard',
                      !isCurrentPlan && plan.name === 'Premium' && 'border-plan-premium',
                      isCurrentPlan && 'ring-2 ring-offset-2 ring-green-600',
                  )}
                  >
                  {!isCurrentPlan && plan.name === 'Basic' && (
                    <div className="flex items-center justify-center gap-2 rounded-t-lg bg-plan-basic py-2 text-sm font-semibold text-white">
                      <Star className="h-4 w-4" />
                      Get Started
                    </div>
                  )}
                  {plan.isPrimary && !isCurrentPlan && (
                      <div className="flex items-center justify-center gap-2 rounded-t-lg bg-plan-standard py-2 text-sm font-semibold text-primary-foreground">
                      <Star className="h-4 w-4" />
                      Most Popular
                      </div>
                  )}
                  {!isCurrentPlan && plan.name === 'Premium' && (
                    <div className="flex items-center justify-center gap-2 rounded-t-lg bg-plan-premium py-2 text-sm font-semibold text-white">
                      <Star className="h-4 w-4" />
                      Premium Features
                    </div>
                  )}
                   {isCurrentPlan && (
                      <div className={cn(
                          "flex items-center justify-center gap-2 rounded-t-lg py-2 text-sm font-semibold text-white bg-green-600",
                      )}>
                      <CheckCircle className="h-4 w-4" />
                      Current Plan
                      </div>
                  )}
                  <CardHeader className="flex-grow-0">
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{displayPrice}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <CardDescription className="pt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                      <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm text-muted-foreground">
                              {feature}
                          </span>
                          </li>
                      ))}
                      </ul>
                  </CardContent>
                  <CardFooter>
                      <Button
                          className="w-full"
                          variant={isUpgrade ? 'default' : 'outline'}
                          disabled={isCurrentPlan || isDowngrade}
                          onClick={() => handleUpgradeClick(plan)}
                      >
                          {ctaText}
                      </Button>
                  </CardFooter>
                  </Card>
              )
            })}
          </div>
        </div>
        
        <UpgradeCalculator />
      </div>
    </AppLayout>
  );
}
