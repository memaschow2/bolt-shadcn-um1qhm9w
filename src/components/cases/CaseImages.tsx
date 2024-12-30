import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteCaseImage } from '@/lib/api';
import type { CaseImage } from '@/lib/types';

interface CaseImagesProps {
  images: CaseImage[];
  onImageDelete: (imageId: string) => void;
}

export function CaseImages({ images, onImageDelete }: CaseImagesProps) {
  const { toast } = useToast();

  const handleDelete = async (imageId: string) => {
    try {
      await deleteCaseImage(imageId);
      onImageDelete(imageId);
      toast({
        title: 'Image deleted',
        description: 'The image has been deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete image',
        variant: 'destructive',
      });
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No images uploaded yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {images.map((image) => (
        <div key={image.id} className="group relative">
          <img
            src={image.url}
            alt="Case"
            className="aspect-square w-full rounded-lg object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 hidden group-hover:flex"
            onClick={() => handleDelete(image.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}