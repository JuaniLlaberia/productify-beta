import type { FieldValues, UseFormRegister } from 'react-hook-form';

export type StepType = {
  nameError: string;
  register: UseFormRegister<FieldValues>;
};
