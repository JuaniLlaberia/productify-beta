import { AuthType } from '../features/authentication/useGetAuth';
const URL: string = import.meta.env.VITE_SERVER_URL;

export type CustomResponse = {
  status: 'success' | 'failed';
  message: string;
};

export const authEmail = async (email: string): Promise<CustomResponse> => {
  const response = await fetch(`${URL}/api/v1/auth/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error('Failed to send email.');

  return await response.json();
};

export const verifyAuthCode = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<CustomResponse> => {
  const response = await fetch(`${URL}/api/v1/auth/verify-code`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  });

  const data: CustomResponse = await response.json();

  if (data.status === 'failed') throw new Error(data.message);

  return data;
};

export const loginWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${URL}/api/v1/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Failed to login.');

  return await response.json();
};

export const getAuth = async (): Promise<AuthType> => {
  const response = await fetch(`${URL}/api/v1/user/me`, {
    method: 'GET',
    credentials: 'include',
  });

  return await response.json();
};

export const logout = async () => {
  const response = await fetch(`${URL}/api/v1/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to logout.');
};
