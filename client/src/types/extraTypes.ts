import type { FieldValues, UseFormRegister } from 'react-hook-form';

export type StepType = {
  error: string;
  register: UseFormRegister<any>;
};
