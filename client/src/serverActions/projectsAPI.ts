import {
  NewProjectType,
  ProjectInfoType,
  ProjectPrevType,
} from '../types/projectTypes';
import { CustomResponse } from './authAPI';

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

export const deleteProject = async (
  projectId: string
): Promise<CustomResponse> => {
  try {
    const response = await fetch(`${URL}/api/v1/project/delete/${projectId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to delete project');

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const leaveProject = async (
  projectId: string
): Promise<CustomResponse> => {
  try {
    const response = await fetch(`${URL}/api/v1/project/${projectId}/leave`, {
      method: 'PATCH',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Failed to leave project.');

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const deleteUserFromProject = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}): Promise<CustomResponse> => {
  try {
    const response = await fetch(
      `${URL}/api/v1/project/remove-user/${projectId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) throw new Error(response.statusText);

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const toggleAdmin = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}): Promise<CustomResponse> => {
  try {
    const response = await fetch(
      `${URL}/api/v1/project/toggle-admin/${projectId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) throw new Error(response.statusText);

    return await response.json();
  } catch (err) {
    throw err;
  }
};
