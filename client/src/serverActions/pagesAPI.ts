import { PageType } from '../types/pagesTypes';

const URL: string = import.meta.env.VITE_SERVER_URL;

export const getPage = async (pageId: string): Promise<PageType> => {
  try {
    const response = await fetch(`${URL}/api/v1/page/${pageId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (data.status === 'failed') throw new Error(data.message);

    return data.data;
  } catch (err) {
    throw err;
  }
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
  try {
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
      data: { pageId: string };
    } = await response.json();

    return data.data;
  } catch (err) {
    throw err;
  }
};
