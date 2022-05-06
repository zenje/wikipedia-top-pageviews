import { API_MIN_DATE as MIN_DATE } from './constants';

export const cleanArticleTitle = (title: string) => {
  return title
    .replaceAll(/(?<=\w):(?=\w)/g, ': ')
    .replaceAll('_', ' ')
    .trim();
};

export const formatNumber = (n: number) => {
  return n.toLocaleString("en-US");
}

const getToday = (): Date => new Date();

export const getYesterday = (): Date => {
  const yesterday = new Date(getToday());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

export const getDatePickerOptions = (): { minDate: Date; maxDate: Date } => {
  return {
    minDate: MIN_DATE,
    maxDate: getYesterday(),
  };
};
