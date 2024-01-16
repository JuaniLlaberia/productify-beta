import { PageContentType, PageType } from '../types/pagesTypes';
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
  pageType,
  projectId,
}: {
  name: string;
  pageType: 'task' | 'notes';
  projectId: string;
}) => {
  const response = await fetch(`${URL}/api/v1/page/new/${projectId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, pageType }),
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

export const addContent = async ({
  pageId,
  content,
}: {
  pageId: string;
  content: PageContentType;
}) => {
  const response = await fetch(`${URL}/api/v1/page/${pageId}/content/new`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...content }),
  });

  if (!response.ok) throw new Error('Failed to create content');

  const data: CustomResponse & { data: PageContentType } =
    await response.json();
  return data.data;
};

export const deleteContent = async ({
  pageId,
  contentId,
}: {
  pageId: string;
  contentId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/content/delete/${contentId}`,
    { method: 'DELETE', credentials: 'include' }
  );

  if (!response.ok) throw new Error('Failed to delete content');

  return await response.json();
};

export const changeStatus = async ({
  status,
  pageId,
  contentId,
}: {
  status: 'pending' | 'progress' | 'finished';
  pageId: string;
  contentId: string;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/content/update-status/${contentId}`,
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

export const updateContent = async ({
  pageId,
  content,
}: {
  pageId: string;
  content: PageContentType;
}): Promise<CustomResponse> => {
  const response = await fetch(
    `${URL}/api/v1/page/${pageId}/content/update/${content._id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...content }),
    }
  );

  if (!response.ok) throw new Error('Failed to update content');
  return await response.json();
};
