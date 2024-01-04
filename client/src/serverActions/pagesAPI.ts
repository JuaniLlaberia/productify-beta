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
