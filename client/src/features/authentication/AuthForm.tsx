import { useForm } from 'react-hook-form';
import { useAuthEmail } from './useAuthEmail';
import { useVerifyCode } from './useVerifyCode';
import { toast } from 'sonner';

type AuthForm = {
  type: 'login' | 'signup';
};

type FormValuesType = {
  email: string;
  code: string;
};

const AuthForm = ({ type }: AuthForm) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValuesType>();

  const { sendEmailAuth, status } = useAuthEmail();
  const { verifyCode } = useVerifyCode();

  const handleAuth = handleSubmit(({ email }) => {
    sendEmailAuth(email);
  });

  const handleCodeVerification = handleSubmit(({ email, code }) => {
    verifyCode({ email, code });
  });

  //   if (status) {
  //     console.log(status);
  //   }

  return (
    <>
      <button onClick={() => toast.error('test')}>s</button>
      <form onSubmit={handleAuth}>
        <h1>{type === 'login' ? 'Login' : 'Signup'}</h1>
        <input
          className='border-4'
          {...register('email', { required: 'Provide your email.' })}
        />
        <button>Send email</button>
      </form>
      <form onSubmit={handleCodeVerification}>
        <h1>{type === 'login' ? 'Login' : 'Signup'}</h1>
        <input
          className='border-4'
          {...register('code', { required: 'Provide your code.' })}
        />
        <button>Send code</button>
      </form>
    </>
  );
};

export default AuthForm;
