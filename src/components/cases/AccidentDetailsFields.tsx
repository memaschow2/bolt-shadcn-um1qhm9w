import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CreateCaseInput } from '@/lib/types';

interface AccidentDetailsFieldsProps {
  register: UseFormRegister<CreateCaseInput>;
  errors: FieldErrors<CreateCaseInput>;
}

export function AccidentDetailsFields({ register, errors }: AccidentDetailsFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Input
          type="datetime-local"
          placeholder="Accident Date"
          {...register('accident_date')}
          className={errors.accident_date ? 'border-destructive' : ''}
        />
        {errors.accident_date && (
          <p className="mt-1 text-sm text-destructive">
            {errors.accident_date.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Accident Place"
          {...register('accident_place')}
          className={errors.accident_place ? 'border-destructive' : ''}
        />
        {errors.accident_place && (
          <p className="mt-1 text-sm text-destructive">
            {errors.accident_place.message}
          </p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Accident Circumstances"
          {...register('accident_circumstances')}
          className={errors.accident_circumstances ? 'border-destructive' : ''}
        />
        {errors.accident_circumstances && (
          <p className="mt-1 text-sm text-destructive">
            {errors.accident_circumstances.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Opponent Name"
          {...register('accident_opponent_name')}
          className={errors.accident_opponent_name ? 'border-destructive' : ''}
        />
        {errors.accident_opponent_name && (
          <p className="mt-1 text-sm text-destructive">
            {errors.accident_opponent_name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Opponent License Plate Number"
          {...register('accident_opponent_licence_plate_number')}
          className={errors.accident_opponent_licence_plate_number ? 'border-destructive' : ''}
        />
        {errors.accident_opponent_licence_plate_number && (
          <p className="mt-1 text-sm text-destructive">
            {errors.accident_opponent_licence_plate_number.message}
          </p>
        )}
      </div>
    </div>
  );
}