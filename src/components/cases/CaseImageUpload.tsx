import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { uploadImage, addCaseImage } from '@/lib/api';

interface CaseImageUploadProps {
  caseId: string;
  onUploadComplete: () => void;
}

export function CaseImageUpload({ caseId, onUploadComplete }: CaseImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Upload image to Supabase Storage
      const { url, error: uploadError } = await uploadImage(file);
      if (uploadError) throw uploadError;

      // Add image record to database
      await addCaseImage(caseId, url);

      toast({
        title: 'Image uploaded',
        description: 'The image has been uploaded successfully',
      });

      onUploadComplete();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        disabled={isUploading}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {isUploading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        ) : (
          <Upload className="mr-2 h-4 w-4" />
        )}
        Upload Image
      </Button>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}