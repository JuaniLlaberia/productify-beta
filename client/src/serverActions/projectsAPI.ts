import {
  NewProjectType,
  ProjectInfoType,
  ProjectPrevType,
} from '../types/projectTypes';

const URL: string = import.meta.env.VITE_SERVER_URL;

export const getProjects = async (): Promise<ProjectPrevType> => {
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

export const getProject = async (
  projectId: string
): Promise<ProjectInfoType> => {
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

export const createProject = async (newProject: NewProjectType) => {
  try {
    const response = await fetch(`${URL}/api/v1/project/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) throw new Error('Failed to create new project.');

    const data: {
      status: string;
      message: string;
      data: { projectId: string };
    } = await response.json();

    return data.data;
  } catch (err) {
    throw err;
  }
};
