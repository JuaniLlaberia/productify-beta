const URL: string = import.meta.env.VITE_SERVER_URL;

type invitationResponse = {
  status: 'success' | 'failed';
  code: string;
};

export const getInvitationCode = async (
  projectId: string
): Promise<invitationResponse> => {
  const response = await fetch(`${URL}/api/v1/invitation/${projectId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to fetch invitation code.');

  return await response.json();
};

export const resetInvitationCode = async ({
  invitationId,
  projectId,
}: {
  invitationId: string;
  projectId: string;
}): Promise<invitationResponse> => {
  const response = await fetch(
    `${URL}/api/v1/invitation/reset/${invitationId}/${projectId}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  if (!response.ok) throw new Error('Failed to reset invitation code.');

  return await response.json();
};
