import { MessageType } from '../types/chatTypes';
import { CustomResponse } from './authAPI';

const URL: string = import.meta.env.VITE_SERVER_URL;

export const createProjectChat = async ({
  projectId,
  name,
  members,
}: {
  projectId: string;
  name: string;
  members: string[];
}) => {
  const response = await fetch(`${URL}/api/v1/project/${projectId}/chat/new`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, members }),
  });

  if (!response.ok) throw new Error('Failed to create chat');

  const data: {
    status: string;
    message: string;
    data: { chatId: string };
  } = await response.json();

  return data.data;
};

export const getChatMessages = async ({
  chatId,
  page,
}: {
  chatId: string;
  page: number;
}) => {
  const response = await fetch(
    `${URL}/api/v1/chat/${chatId}/messages?page=${page}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!response.ok) throw new Error('Failed to get messages');

  const data: {
    status: 'success' | 'failed';
    message?: string;
    data: MessageType[];
  } = await response.json();

  return data.data;
};

export const deleteChat = async ({
  projectId,
  chatId,
}: {
  projectId: string;
  chatId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/project/${projectId}/chat/${chatId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (!response.ok) throw new Error('Failed to delete chat');

  return await response.json();
};

export const addUsersToChat = async ({
  projectId,
  chatId,
  users,
}: {
  projectId: string;
  chatId: string;
  users: string[];
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/project/${projectId}/chat/${chatId}/add-users`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users }),
    }
  );

  if (!response.ok) throw new Error('Failed to add users');

  return await response.json();
};

export const removeUserFromChat = async ({
  projectId,
  chatId,
  userId,
}: {
  projectId: string;
  chatId: string;
  userId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/project/${projectId}/chat/${chatId}/remove-user`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) throw new Error('Failed to remove user');

  return await response.json();
};
