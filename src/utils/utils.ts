import { API_MIN_DATE as MIN_DATE } from './constants';
import { COUNTRY_CODES } from './countryCodes';
import { SelectOption } from '../types';

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
