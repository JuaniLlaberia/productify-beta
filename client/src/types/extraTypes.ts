import type { UseFormRegister } from 'react-hook-form';

export type StepType = {
  error: string;
  register: UseFormRegister<any>;
};

export type PasswordsType = {
  password: string;
  confirmedPassword: string;
};
