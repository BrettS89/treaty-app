import moment from 'moment';
import api from '../feathers';

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

export const uploadFile = async (file: File, account_id: string) => {
  const res = await api.service('storage/s3').create({ content_type: file.type });

  await fetch(res.urls.upload, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  return api
    .service('storage/file')
    .create({
      account_id,
      meta: {
        id: res.meta.id,
        size: file.size,
        type: file.type,
      },
      name: file.name,
      urls: {
        delivery: res.urls.delivery,
        storage: res.urls.storage,
      },
    });
};

export const downloadFile = (url: string, filename: string): void => {
  fetch(url, {
    headers: {
      'cache-control':'no-cache',
    },
  })
    .then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
      })
    });
};

export const limitText = (str: string, limit: number): string => 
  str.length > limit
    ? str.slice(0, limit) + '...'
    : str;
