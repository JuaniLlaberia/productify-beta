import { formatDistanceToNowStrict } from 'date-fns';

export const formatDateDistance = (date: Date) => {
  const formatedDate = formatDistanceToNowStrict(date);
  if (formatedDate.includes('seconds')) return 'Just now';
  return `${formatedDate} ago`;
};
