import { Case } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface CaseDetailsViewProps {
  case_: Case;
}

export function CaseDetailsView({ case_ }: CaseDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-secondary">Basic Information</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-muted-foreground">Title: {case_.title}</p>
          {case_.description && (
            <p className="text-sm text-muted-foreground">Description: {case_.description}</p>
          )}
          <p className="text-sm text-muted-foreground">Status: {case_.status}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-secondary">Accident Details</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-muted-foreground">
            Date: {case_.accident_date ? formatDate(case_.accident_date) : 'Not specified'}
          </p>
          <p className="text-sm text-muted-foreground">
            Place: {case_.accident_place || 'Not specified'}
          </p>
          <p className="text-sm text-muted-foreground">
            Circumstances: {case_.accident_circumstances || 'Not specified'}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-secondary">Opponent Information</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-muted-foreground">
            Name: {case_.accident_opponent_name || 'Not specified'}
          </p>
          <p className="text-sm text-muted-foreground">
            License Plate: {case_.accident_opponent_licence_plate_number || 'Not specified'}
          </p>
        </div>
      </div>
    </div>
  );
}