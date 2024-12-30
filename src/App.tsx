import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import { UserMenu } from '@/components/auth/UserMenu';
import { ConnectSupabase } from '@/components/auth/ConnectSupabase';
import { Toaster } from '@/components/ui/toaster';

function AppContent() {
  const { user, loading } = useAuth();

  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return <ConnectSupabase />;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {user ? (
        <>
          <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-end px-4">
              <UserMenu />
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </>
      ) : (
        <div className="flex min-h-screen items-center justify-center px-4">
          <AuthForm />
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}