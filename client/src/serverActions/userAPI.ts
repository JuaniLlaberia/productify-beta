import type { UserPreviewType } from '../types/userTypes';
import { CustomResponse } from './authAPI';

const URL: string = import.meta.env.VITE_SERVER_URL;

export const updateUser = async (
  newUserData: UserPreviewType
): Promise<CustomResponse> => {
  const response = await fetch(`${URL}/api/v1/user/update`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  });

  if (!response.ok) throw new Error('Failed to update user data');

  return await response.json();
};

export const deleteUser = async (): Promise<CustomResponse> => {
  const respose = await fetch(`${URL}/api/v1/user/delete`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!respose.ok) throw new Error('Failed to delete account');

  return await respose.json();
};
