const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatDollarAmount = (n: number): string => {
  return formatter.format(n).split('.')[0];
};
