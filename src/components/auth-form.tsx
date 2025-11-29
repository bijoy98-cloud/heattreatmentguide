
'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { auth } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: 'Successfully signed in with Google.' });
      router.push(redirect);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setIsSubmitting(true);
    try {
      // First, try to sign in. If it fails, it might be because the user doesn't exist.
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Successfully signed in.' });
      router.push(redirect);
    } catch (signInError: any) {
      // If sign-in fails because the user is not found, try creating an account.
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast({ title: 'Account created successfully.' });
          router.push(redirect);
        } catch (signUpError: any) {
          // Handle specific sign-up errors, like weak password.
          toast({
            variant: 'destructive',
            title: 'Sign-Up Failed',
            description: signUpError.message,
          });
        }
      } else {
        // Handle other sign-in errors (e.g., wrong password).
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: signInError.message,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login or Create Account</CardTitle>
        <CardDescription>
          Enter your email and password below to login or sign up.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleEmailAuth}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            Sign In / Sign Up
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col gap-4">
        
        <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
            >
                Back to Home
            </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
