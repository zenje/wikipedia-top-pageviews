import {
  API_MIN_DATE as MIN_DATE,
  TOP_PAGES_BASE_URL,
  TOP_PAGES_COUNTRY_BASE_URL,
} from './constants';
import { COUNTRY_CODES } from './countryCodes';
import { Article, SelectOption } from '../types';

export const cleanArticleTitle = (title: string) => {
  return title
    .replaceAll(/(?<=\w):(?=\w)/g, ': ')
    .replaceAll('_', ' ')
    .trim();
};

export const formatNumber = (n: number) => {
  return n.toLocaleString('en-US');
};

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

export const getCountryOptions = (): SelectOption[] => {
  const emptyOption: SelectOption = {
    key: '',
    label: '',
  };
  return [
    emptyOption,
    ...Object.keys(COUNTRY_CODES).map((countryCode) => {
      return {
        key: countryCode,
        label: COUNTRY_CODES[countryCode],
      };
    }),
  ];
};

export const getTopPagesUrl = (date: Date): string => {
  const { day, month, year }: DateParts = _getDateParts(date);
  return `${TOP_PAGES_BASE_URL}/${year}/${month}/${day}`;
};

export const getTopPagesForCountryUrl = (
  countryCode: string,
  date: Date
): string => {
  const { day, month, year }: DateParts = _getDateParts(date);
  return `${TOP_PAGES_COUNTRY_BASE_URL}/${countryCode}/all-access/${year}/${month}/${day}`;
};

export const processDataDefault = (responseData: any): Article[] => {
  const { articles } = responseData.items[0];
  return articles;
};

export const processDataForCountry = (responseData: any): Article[] => {
    const { articles } = responseData.items[0];
    return articles.map((article: any) => {
      return {
        article: article.article,
        views: article.views_ceil,
        rank: article.rank
      };
    });
}

function _pad(n: number, width: number, z?: string): string {
  z = z || '0';
  let ns: string = n + '';
  return ns.length >= width ? ns : new Array(width - ns.length + 1).join(z) + n;
}

type DateParts = {
  day: string;
  month: string;
  year: string;
};

function _getDateParts(date: Date): DateParts {
  const day: string = _pad(date.getDate(), 2);
  const month: string = _pad(date.getMonth() + 1, 2); // js month is 0-based
  const year: string = date.getFullYear() as unknown as string;
  return { day, month, year };
}
