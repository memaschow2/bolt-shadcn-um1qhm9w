import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditCaseForm } from './EditCaseForm';
import { CaseDetailsView } from './CaseDetailsView';
import { CaseImageUpload } from './CaseImageUpload';
import { CaseImages } from './CaseImages';
import { getCaseImages } from '@/lib/api';
import type { Case, CaseImage } from '@/lib/types';

interface CaseDetailsProps {
  case_: Case;
  onUpdate: (updatedCase: Case) => void;
}

export function CaseDetails({ case_, onUpdate }: CaseDetailsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [images, setImages] = useState<CaseImage[]>([]);

  useEffect(() => {
    loadImages();
  }, [case_.id]);

  const loadImages = async () => {
    try {
      const data = await getCaseImages(case_.id);
      setImages(data);
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary">{case_.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Created on {new Date(case_.created_at).toLocaleDateString()}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
          className="text-secondary hover:text-secondary-hover"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      <CaseDetailsView case_={case_} />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-secondary">Images</h3>
        <CaseImageUpload caseId={case_.id} onUploadComplete={loadImages} />
        <CaseImages 
          images={images} 
          onImageDelete={(imageId) => {
            setImages(images.filter(img => img.id !== imageId));
          }} 
        />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Case</DialogTitle>
          </DialogHeader>
          <EditCaseForm
            case_={case_}
            onSuccess={(updatedCase) => {
              onUpdate(updatedCase);
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}