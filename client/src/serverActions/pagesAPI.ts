import { PageColumnType, PageTaskType, PageType } from '../types/pagesTypes';
import { CustomResponse } from './authAPI';

const URL: string = import.meta.env.VITE_SERVER_URL;

export const getPage = async (pageId: string): Promise<PageType> => {
  const response = await fetch(`${URL}/api/v1/page/${pageId}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (data.status === 'failed') throw new Error(data.message);

  return data.data;
};

export const createPage = async ({
  name,
  projectId,
}: {
  name: string;

  projectId: string;
}) => {
  const response = await fetch(`${URL}/api/v1/page/new/${projectId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) throw new Error('Failed to create page.');

  const data: {
    status: string;
    message: string;
    data: { _id: string; name: string; pageType: 'task' | 'notes' };
  } = await response.json();

  return data.data;
};

export const deletePage = async ({
  pageId,
  projectId,
}: {
  pageId: string;
  projectId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/delete/${pageId}/${projectId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (!response.ok) throw new Error('Failed to delete page');
  return await response.json();
};

export const addColumn = async ({
  pageId,
  column,
}: {
  pageId: string;
  column: PageColumnType;
}) => {
  const response = await fetch(`${URL}/api/v1/page/${pageId}/column/new`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...column }),
  });

  if (!response.ok) throw new Error('Failed to create column');

  const data: CustomResponse & { data: PageColumnType } = await response.json();
  return data.data;
};

export const deleteColumn = async ({
  pageId,
  columnId,
}: {
  pageId: string;
  columnId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/column/delete/${columnId}`,
    { method: 'DELETE', credentials: 'include' }
  );

  if (!response.ok) throw new Error('Failed to delete column');

  return await response.json();
};

export const addTask = async ({
  pageId,
  task,
}: {
  pageId: string;
  task: PageTaskType;
}) => {
  const response = await fetch(`${URL}/api/v1/page/${pageId}/task/new`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...task }),
  });

  if (!response.ok) throw new Error('Failed to create task');

  const data: CustomResponse & { data: PageTaskType } = await response.json();
  return data.data;
};

export const deleteTask = async ({
  pageId,
  taskId,
}: {
  pageId: string;
  taskId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/task/delete/${taskId}`,
    { method: 'DELETE', credentials: 'include' }
  );

  if (!response.ok) throw new Error('Failed to delete task');

  return await response.json();
};

export const changeStatus = async ({
  status,
  pageId,
  taskId,
}: {
  status: string;
  pageId: string;
  taskId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/content/update-status/${taskId}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) throw new Error('Failed to update status');

  return await response.json();
};

export const updateTask = async ({
  pageId,
  task,
}: {
  pageId: string;
  task: PageTaskType;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/content/update/${task._id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task }),
    }
  );

  if (!response.ok) throw new Error('Failed to update content');
  return await response.json();
};
