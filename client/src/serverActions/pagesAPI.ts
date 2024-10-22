import { PageColumnType, PageTaskType, PageType } from '../types/pagesTypes';
import { columnTemplateType } from '../utils/variables/templates';
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
  columns,
}: {
  name: string;
  projectId: string;
  columns: columnTemplateType;
}) => {
  const response = await fetch(`${URL}/api/v1/page/${projectId}/new-page`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, columns }),
  });

  if (!response.ok) throw new Error('Failed to create page.');

  const data: {
    status: string;
    message: string;
    data: { _id: string; name: string; tasksCount: number };
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
    `${URL}/api/v1/page/${projectId}/delete/${pageId}`,
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

  const data: CustomResponse & { data?: PageTaskType } = await response.json();

  if (data.status === 'failed') throw new Error(data.message);

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
    `${URL}/api/v1/page/${pageId}/task/update/${task._id}`,
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

export const addUsersToBoard = async ({
  projectId,
  pageId,
  users,
}: {
  projectId: string;
  pageId: string;
  users: string[];
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/${projectId}/add-users`,
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

export const removeUserFromBoard = async ({
  projectId,
  pageId,
  userId,
}: {
  projectId: string;
  pageId: string;
  userId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/${projectId}/remove-user`,
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
