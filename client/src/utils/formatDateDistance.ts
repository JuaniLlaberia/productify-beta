import { differenceInDays } from 'date-fns';
import { formatDate } from './formatDate';

export const formatDateDistance = (date: Date) => {
  const distance = differenceInDays(new Date(), date);
  const formatedTime = formatDate(date, {
    hour: 'numeric',
    minute: 'numeric',
  }).split(' ')[0];

  if (distance === 0) {
    return `today at ${formatedTime}`;
  } else if (distance === 1) {
    return `yesturday at ${formatedTime}`;
  } else {
    return `${formatDate(date, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })} ${formatedTime}`;
  }
};
