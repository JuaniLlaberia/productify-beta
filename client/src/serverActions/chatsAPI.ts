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
    method: 'PATCH',
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
