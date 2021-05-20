import moment from 'moment';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatDollarAmount = (n: number): string => {
  return formatter.format(n).split('.')[0];
};

export const formatDate = (date: string): string => {
  const roughDate = date.includes('T')
    ? date.split('T')[0]
    : date;

  const d = roughDate.split('-');
  return `${d[1]}-${d[2]}-${d[0]}`;
};

export const formatDateTime = (isoDateTime: string): string => {
  return moment(isoDateTime, moment.ISO_8601).local().format('MM-DD-YYYY hh:mm a')
};

export const buildTimeline = (effectiveDate: string) => {
  const dateArr = effectiveDate.split('-');
  const formattedEffectiveDate = `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;

  const daysBack = [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77];

  return daysBack.reduce((acc, curr) => {
    return [...acc, moment(formattedEffectiveDate, 'MM-DD-YYYY').subtract(curr, 'days').format('MM-DD-YYYY')]
  }, [formattedEffectiveDate]).reverse();
};
