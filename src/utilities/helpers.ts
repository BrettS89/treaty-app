const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatDollarAmount = (n: number): string => {
  return formatter.format(n).split('.')[0];
};

export const formatDate = (date: string): string => {
  const d = date.split('-');
  return `${d[1]}-${d[2]}-${d[0]}`;
};
