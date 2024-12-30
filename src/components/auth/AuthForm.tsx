import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { authSchema } from '@/lib/validation';
import type { z } from 'zod';

type FormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      if (isSignUp) {
        await signUp(data.email, data.password);
        toast({
          title: 'Account created successfully',
          description: 'Please check your email to verify your account',
        });
      } else {
        await signIn(data.email, data.password);
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in',
        });
      }
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSignUp
            ? 'Sign up to get started'
            : 'Sign in to access your account'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md">
          <div>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              placeholder="Password"
              {...register('password')}
              className={errors.password ? 'border-destructive' : ''}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
        </div>

        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setIsSignUp(!isSignUp);
              reset();
            }}
            className="text-sm"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </Button>
        </div>
      </form>
    </div>
  );
}