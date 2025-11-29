
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
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.67-4.66 1.67-3.86 0-6.99-3.16-6.99-7.02s3.13-7.02 6.99-7.02c2.2 0 3.28.84 4.1 1.62l2.33-2.33C18.16 2.66 15.83 1.33 12.48 1.33 6.9 1.33 2.53 5.75 2.53 11.3s4.37 9.97 9.95 9.97c2.93 0 5.25-.97 6.99-2.73 1.83-1.83 2.36-4.38 2.36-6.38 0-.4-.04-.8-.12-1.18h-9.2z"
            />
          </svg>
          Google
        </Button>
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
