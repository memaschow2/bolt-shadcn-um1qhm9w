import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCases } from '@/lib/api';
import type { Case } from '@/lib/types';

export function CaseList() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cases');
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        {error}
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No cases found. Create your first case to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cases.map((case_) => (
        <div
          key={case_.id}
          className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-accent"
          onClick={() => navigate(`/cases/${case_.id}`)}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{case_.title}</h3>
              {case_.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {case_.description}
                </p>
              )}
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
              {case_.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}