import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AccidentDetailsFields } from './AccidentDetailsFields';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { updateCase } from '@/lib/api';
import type { Case, UpdateCaseInput } from '@/lib/types';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['open', 'in_progress', 'closed']),
  accident_date: z.string().optional(),
  accident_place: z.string().optional(),
  accident_circumstances: z.string().optional(),
  accident_opponent_name: z.string().optional(),
  accident_opponent_licence_plate_number: z.string().optional(),
});

interface EditCaseFormProps {
  case_: Case;
  onSuccess: (updatedCase: Case) => void;
}

export function EditCaseForm({ case_, onSuccess }: EditCaseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateCaseInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: case_.title,
      description: case_.description,
      status: case_.status,
      accident_date: case_.accident_date,
      accident_place: case_.accident_place,
      accident_circumstances: case_.accident_circumstances,
      accident_opponent_name: case_.accident_opponent_name,
      accident_opponent_licence_plate_number: case_.accident_opponent_licence_plate_number,
    },
  });

  const onSubmit = async (data: UpdateCaseInput) => {
    try {
      setIsLoading(true);
      const updatedCase = await updateCase(case_.id, data);
      toast({
        title: 'Case updated',
        description: 'Your case has been updated successfully',
      });
      onSuccess(updatedCase);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update case',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-secondary">Basic Information</h3>
        <div>
          <Input
            placeholder="Case title"
            {...register('title')}
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Case description (optional)"
            {...register('description')}
            className={errors.description ? 'border-destructive' : ''}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Select
            defaultValue={case_.status}
            onValueChange={(value) => setValue('status', value as Case['status'])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-secondary">Accident Details</h3>
        <AccidentDetailsFields register={register} errors={errors} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}