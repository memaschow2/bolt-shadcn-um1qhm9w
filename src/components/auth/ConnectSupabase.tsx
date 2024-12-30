import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ConnectSupabase() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Connection Required</AlertTitle>
        <AlertDescription>
          Please click the "Connect to Supabase" button in the top right corner to set up your database connection.
        </AlertDescription>
      </Alert>
    </div>
  );
}