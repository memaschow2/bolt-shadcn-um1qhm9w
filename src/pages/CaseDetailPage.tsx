import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCase } from '@/lib/api';
import { CaseDetails } from '@/components/cases/CaseDetails';
import type { Case } from '@/lib/types';

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [case_, setCase] = useState<Case>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadCase = async () => {
      if (!id) return;
      try {
        const data = await getCase(id);
        setCase(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load case');
      } finally {
        setLoading(false);
      }
    };

    loadCase();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !case_) {
    return (
      <div className="p-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
        </div>
        <div className="text-center text-destructive">
          {error || 'Case not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cases
        </Button>
      </div>
      <CaseDetails
        case_={case_}
        onUpdate={(updatedCase) => setCase(updatedCase)}
      />
    </div>
  );
}