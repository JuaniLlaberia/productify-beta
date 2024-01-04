const URL: string = import.meta.env.VITE_SERVER_URL;

export const getProjects = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/project`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to fetch your projects.');

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const getProject = async (projectId: string) => {
  try {
    const response = await fetch(`${URL}/api/v1/project/${projectId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to fetch project.');

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};
