import { useForm } from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';
import InputWrapper from '../../components/InputWrapper';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { useAuthEmail } from './useAuthEmail';
import { useVerifyCode } from './useVerifyCode';
import { StepType } from '../../types/extraTypes';

//Had to put the inputs separatly because REACT HOOK FORM was throwing a BUG
const EmailField = ({ register, error }: StepType) => {
  return (
    <InputWrapper
      label='Email Address'
      errorMsg={error}
    >
      <Input
        register={register('email', {
          required: 'Use your personal or work email',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        })}
        placeholder='example@gmail.com'
      />
    </InputWrapper>
  );
};

//Had to put the inputs separatly because REACT HOOK FORM was throwing a BUG
const CodeField = ({ register, error }: StepType) => {
  return (
    <InputWrapper
      label='Verification Code'
      errorMsg={error}
    >
      <Input
        register={register('code', {
          required: 'Provide a project name',
        })}
        placeholder='Code'
      />
    </InputWrapper>
  );
};

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendEmailAuth, isSending } = useAuthEmail();
  const { verifyCode, isLoading } = useVerifyCode();

  const { crrStep, nextStep, isLastStep } = useMultiStepForm([
    <EmailField
      register={register}
      error={errors?.email?.message as string}
    />,
    <CodeField
      register={register}
      error={errors?.code?.message as string}
    />,
  ]);

  const handleAuthEmail = handleSubmit(data => {
    if (!isLastStep) {
      sendEmailAuth(data.email, {
        onSuccess: () => nextStep(),
      });

      return;
    }

    verifyCode({ email: data.email, code: data.code });
  });

  return (
    <form
      className='w-full'
      onSubmit={handleAuthEmail}
    >
      <section>{crrStep}</section>
      <Button
        full
        isLoading={isSending || isLoading}
      >
        {isLastStep ? 'Continue with Email' : 'Send verification code'}
      </Button>
    </form>
  );
};

export default AuthForm;
