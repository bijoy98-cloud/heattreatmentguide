
'use client';

import { AppLayout } from "@/components/app-layout";
import { CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { items, removeFromCart, clearCart } = useCart();
  const { user } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "You must be logged in to make a purchase.",
      });
      router.push('/login?redirect=/checkout');
      return;
    }
    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Your cart is empty. Please select a plan.",
      });
      router.push('/pricing');
      return;
    }
    
    toast({
      title: "Purchase Successful!",
      description: `Thank you, ${user.email}. Your ${items[0].name} plan is now active.`,
    });
    
    clearCart();
    router.push('/dashboard'); 
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <ShoppingCart className="h-8 w-8 text-primary" />
            Checkout
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review your order and complete your purchase.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length > 0 ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{item.name} Plan</p>
                          <p className="text-sm text-muted-foreground">Annual Subscription</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                <Trash2 className="h-4 w-4 text-destructive"/>
                            </Button>
                        </div>
                      </div>
                    ))}
                     <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5"/>
                    Payment Details
                </CardTitle>
                <CardDescription>Enter your payment information to complete the purchase.</CardDescription>
              </CardHeader>
              <form onSubmit={handlePayment}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" required />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM / YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="•••" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg" disabled={items.length === 0}>
                    Pay ${total.toFixed(2)}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
