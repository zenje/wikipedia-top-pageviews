const pad = (n: number, width: number, z?: string): string => {
  z = z || '0';
  let ns: string = n + '';
  return ns.length >= width ? ns : new Array(width - ns.length + 1).join(z) + n;
};

const TOP_PAGES_BASE_URL =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access';

export const getTopPagesUrl = (date: Date): string => {
  const day: string = pad(date.getDate(), 2);
  const month: string = pad(date.getMonth() + 1, 2); // js month is 0-based
  const year: string = date.getFullYear() as unknown as string;
  return `${TOP_PAGES_BASE_URL}/${year}/${month}/${day}`;
};

export const RESULTS_OPTIONS: number[] = [25, 50, 75, 100, 200];

// Per Wikipedia API: The API serves data starting at 2015-08-01.
export const API_MIN_DATE = new Date(2015, 7, 1); // js month is 0-based
