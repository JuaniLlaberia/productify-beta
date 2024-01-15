export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  return Intl.DateTimeFormat('us-Us', options).format(date);
};
