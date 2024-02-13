export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  return Intl.DateTimeFormat('us-Us', { ...options, hour12: false }).format(
    date
  );
};
