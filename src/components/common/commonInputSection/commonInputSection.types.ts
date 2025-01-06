import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from 'react-hook-form';

export interface CommonInputSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  name: Path<T>;
  placeholder: string;
  type?: string;
  validation?: RegisterOptions<T, Path<T>>;
  inputType?: 'input' | 'textarea';
  rows?: number;
}
