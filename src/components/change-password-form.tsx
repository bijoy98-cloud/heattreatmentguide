
'use client';

import { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
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
import { Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Please enter your current password.'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long.'),
});

type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, auth } = useFirebase();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
    if (!user || !auth || !user.email) return;

    startTransition(async () => {
      try {
        const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
        
        await reauthenticateWithCredential(user, credential);
        
        await updatePassword(user, data.newPassword);

        toast({
          title: 'Success',
          description: 'Your password has been updated successfully.',
        });
        router.push('/dashboard');
      } catch (error: any) {
        console.error('Password Change Error:', error);
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          setError('currentPassword', {
            type: 'manual',
            message: 'The current password you entered is incorrect.',
          });
        } else if (error.code === 'auth/weak-password') {
            setError('newPassword', {
              type: 'manual',
              message: 'The new password is too weak. Please choose a stronger one.',
            });
        }
        else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
          });
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
            <Lock />
            Change Password
        </CardTitle>
        <CardDescription>
          Enter your current and new password below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                {...register('currentPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">Toggle current password visibility</span>
              </Button>
            </div>
            {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
             <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
              />
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">Toggle new password visibility</span>
              </Button>
            </div>
            {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
