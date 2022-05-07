export const TOP_PAGES_BASE_URL =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access';

export const TOP_PAGES_COUNTRY_BASE_URL =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country';

export const BASE_WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki';

export const ALL_ACCESS = 'all-access';
// Per Wikipedia API: For anonymous requests, origin query string parameter
// can be set to * which will allow requests from anywhere.
export const ALLOW_ALL_ORIGIN = '?origin=*';

export const DEFAULT_NUM_RESULTS: number = 100;

export const NUM_RESULTS_OPTIONS: number[] = [25, 50, 75, 100, 200];

// Per Wikipedia API: The API serves data starting at 2015-08-01.
export const API_MIN_DATE = new Date(2015, 7, 1); // js month is 0-based
