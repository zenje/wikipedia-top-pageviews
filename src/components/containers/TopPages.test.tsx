import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios, { AxiosResponse } from 'axios';
import { Article } from '../../types';
import { DEFAULT_NUM_RESULTS, API_MIN_DATE } from '../../utils/constants';
import {
  COUNTRY,
  ERROR_MESSAGES,
  NUMBER_OF_RESULTS,
  START_DATE,
} from '../../utils/strings';
import {
  cleanArticleTitle,
  getFormattedDate,
  getTopPagesForCountryUrl,
  getTopPagesUrl,
  getWikipediaLink,
  getYesterday,
} from '../../utils/utils';
import TopPages from './TopPages';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const YESTERDAY: Date = getYesterday();
const YESTERDAY_FORMATTED: string = getFormattedDate(YESTERDAY);

const MOCK_DATA1 = {
  items: [
    {
      articles: [
        {
          article: 'Main_Page',
          rank: 1,
          views: 5148826,
        },
        {
          article: 'Doctor_Strange_in_the_Multiverse_of_Madness',
          rank: 3,
          views: 710076,
        },
      ],
    },
  ],
};

const MOCK_DATA2 = {
  items: [
    {
      articles: [
        {
          article: 'Wikipedia',
          rank: 57,
          views: 51292,
        },
        {
          article: 'List_of_Marvel_Cinematic_Universe_films',
          rank: 58,
          views: 51228,
        },
        {
          article: 'JavaScript',
          rank: 144,
          views: 30536,
        },
      ],
    },
  ],
};

const MOCK_DATA_COUNTRY = {
  items: [
    {
      articles: [
        {
          article: 'The_Witcher_(TV_series)',
          project: 'en.wikipedia',
          views_ceil: 41400,
          rank: 68,
        },
        {
          article: 'Harry_Potter_(film_series)',
          project: 'en.wikipedia',
          views_ceil: 41200,
          rank: 69,
        },
        {
          article: 'BTS',
          project: 'en.wikipedia',
          views_ceil: 41000,
          rank: 70,
        },
      ],
    },
  ],
};

const MOCK_DATA_EMPTY = {
  items: [
    {
      articles: [],
    },
  ],
};

const MOCK_DATA_ARTICLE: Article = {
  article: 'Title',
  views: 1000,
  rank: 1,
};

const MOCK_RESPONSE_SUCCESS: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('TopPages - initial state', () => {
  it('render all input controls with default values, state, and fetched data', async () => {
    mockAxiosWithResolvedValues(MOCK_DATA1);
    render(<TopPages />);

    // assert that all input controls are present
    assertTextInDocument(START_DATE, COUNTRY, NUMBER_OF_RESULTS);

    // assert that input controls have the expected default values
    const dateInput = screen.getByLabelText<HTMLInputElement>(START_DATE);
    const countryInput: HTMLSelectElement =
      screen.getByLabelText<HTMLSelectElement>(COUNTRY);
    const numberOfResultsInput: HTMLSelectElement =
      screen.getByLabelText<HTMLSelectElement>(NUMBER_OF_RESULTS);
    expect(dateInput.value).toBe(YESTERDAY_FORMATTED);
    expect(countryInput.value).toBe('');
    expect(numberOfResultsInput.value).toBe(String(DEFAULT_NUM_RESULTS));

    // wait for axios requests to resolve and update the component with mock results
    const { articles } = MOCK_DATA1.items[0];
    let resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA1.items[0].articles.length);

    // check displayed details of result items
    const result1 = resultsNodes[0];
    const result2 = resultsNodes[1];
    const article1 = articles[0].article;
    const article2 = articles[1].article;
    expect(result1.textContent).toBe(cleanArticleTitle(article1));
    expect(result2.textContent).toBe(cleanArticleTitle(article2));
    expect(result1).toHaveAttribute('href', getWikipediaLink(article1));
    expect(result2).toHaveAttribute('href', getWikipediaLink(article2));

    // assert that data was only fetched once
    const url = getTopPagesUrl(YESTERDAY);
    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});

describe('TopPages - changing input control values', () => {
  it('select a date, fetch data for new date', async () => {
    mockAxiosWithResolvedValues(MOCK_DATA1, MOCK_DATA2, MOCK_DATA2, MOCK_DATA2);
    render(<TopPages />);

    // assert inital date input value
    const dateInput: HTMLInputElement =
      screen.getByLabelText<HTMLInputElement>(START_DATE);
    expect(dateInput.value).toBe(YESTERDAY_FORMATTED);

    // wait for axios requests to resolve and update the component with mock results
    let resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA1.items[0].articles.length);

    // change the date input to valid date
    const newDate1 = new Date(2022, 4, 1); // 05/01/2022
    const newDateFormatted1: string = getFormattedDate(newDate1);
    fireEvent.change(dateInput, { target: { value: newDateFormatted1 } });
    expect(dateInput.value).toBe(newDateFormatted1);

    // wait for axios requests to resolve and update the component with mock results
    resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA2.items[0].articles.length);

    // change the date input to be invalid (< min date)
    const newDate2 = new Date(1900, 4, 1); // 05/01/1900
    const newDateFormatted2: string = getFormattedDate(newDate2);
    fireEvent.change(dateInput, { target: { value: newDateFormatted2 } });

    // change the date input to be invalid (> max date)
    const newDate3 = new Date();
    newDate3.setDate(newDate3.getDate() + 100); // 100 days from today
    const newDateFormatted3: string = getFormattedDate(newDate3);
    fireEvent.change(dateInput, { target: { value: newDateFormatted3 } });

    // change the date input to valid date (min date)
    const newDate4 = API_MIN_DATE;
    const newDateFormatted4: string = getFormattedDate(newDate4);
    fireEvent.change(dateInput, { target: { value: newDateFormatted4 } });

    // wait for axios requests to resolve and update the component with mock results
    resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA2.items[0].articles.length);

    // assert that data was fetched 3 times, with initial and new date urls, ignoring invalid dates
    const url1 = getTopPagesUrl(YESTERDAY);
    const url2 = getTopPagesUrl(newDate1);
    const url3 = getTopPagesUrl(newDate4);
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenNthCalledWith(1, url1);
    expect(axios.get).toHaveBeenNthCalledWith(2, url2);
    expect(axios.get).toHaveBeenNthCalledWith(3, url3);
  });

  it('select a country, fetch data for new country', async () => {
    mockAxiosWithResolvedValues(MOCK_DATA1, MOCK_DATA_COUNTRY, MOCK_DATA1);
    render(<TopPages />);

    // assert initial default country dropdown has empty option selected
    const countryInput: HTMLSelectElement =
      screen.getByLabelText<HTMLSelectElement>(COUNTRY);
    expect(countryInput.value).toBe('');

    // wait for axios requests to resolve and update the component with mock results
    let resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA1.items[0].articles.length);

    // change the country input
    const newCountry = 'Japan';
    userEvent.selectOptions(countryInput, newCountry);
    expect(countryInput.value).toBe('JP');

    // wait for axios requests to resolve and update the component with mock results
    resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA2.items[0].articles.length);

    // change the country input to blank option
    userEvent.selectOptions(countryInput, '');
    expect(countryInput.value).toBe('');

    // wait for axios requests to resolve and update the component with mock results
    resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(MOCK_DATA1.items[0].articles.length);

    // assert that data was fetched 3 times, with initial and new date urls
    const url1 = getTopPagesUrl(YESTERDAY);
    const url2 = getTopPagesForCountryUrl('JP', YESTERDAY);
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenNthCalledWith(1, url1);
    expect(axios.get).toHaveBeenNthCalledWith(2, url2);
    expect(axios.get).toHaveBeenNthCalledWith(3, url1);
  });

  it('change the number of results displayed', async () => {
    const mockResults = generateDataWithNArticles(500);
    mockAxiosWithResolvedValues(mockResults);
    render(<TopPages />);

    // assert initial default number of results in select dropdown
    const numberOfResultsInput: HTMLSelectElement =
      screen.getByLabelText<HTMLSelectElement>(NUMBER_OF_RESULTS);
    expect(numberOfResultsInput.value).toBe(String(DEFAULT_NUM_RESULTS));

    // assert initial default number of displayed results
    let resultsNodes = await waitFor(() => screen.getAllByRole('link'));
    expect(resultsNodes.length).toBe(DEFAULT_NUM_RESULTS);

    // change the number of results input
    const newNumberOfResults = 75;
    userEvent.selectOptions(numberOfResultsInput, String(newNumberOfResults));
    expect(numberOfResultsInput.value).toBe(String(newNumberOfResults));

    // assert new number of displayed results
    resultsNodes = screen.getAllByRole('link');
    expect(resultsNodes.length).toBe(newNumberOfResults);

    // assert that data was only fetched once
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe('TopPages - error handling', () => {
  let consoleErrorSpy: any;
  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('general - render with error after error response', async () => {
    mockAxiosWithRejectedValues();
    render(<TopPages />);

    // assert that error message is being displayed
    let errorMessage = await waitFor(() =>
      screen.getByText(ERROR_MESSAGES.GENERAL)
    );
    expect(errorMessage).toBeInTheDocument();

    // assert that data was only fetched once (failure)
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('country - render with error after error response for by-country request', async () => {
    // initially return a successful response; return an error on the second request
    mockAxiosWithResolvedValues(MOCK_DATA_EMPTY);
    mockAxiosWithRejectedValues();
    render(<TopPages />);

    // change the country input
    const countryInput: HTMLSelectElement =
      screen.getByLabelText<HTMLSelectElement>(COUNTRY);
    const newCountry = 'Antarctica';
    userEvent.selectOptions(countryInput, newCountry);
    expect(countryInput.value).toBe('AQ');

    // assert that error message is being displayed
    let errorMessage = await waitFor(() =>
      screen.getByText(ERROR_MESSAGES.COUNTRY)
    );
    expect(errorMessage).toBeInTheDocument();

    // assert that data was only fetched twice (success, then failure)
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('no results - render with error after response with no results', async () => {
    mockAxiosWithResolvedValues(MOCK_DATA_EMPTY);
    render(<TopPages />);

    // assert that error message is being displayed
    let errorMessage = await waitFor(() =>
      screen.getByText(ERROR_MESSAGES.NO_RESULTS_FOUND)
    );
    expect(errorMessage).toBeInTheDocument();

    // assert that data was only fetched once (failure)
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});

function assertTextInDocument(...args: string[]) {
  args.forEach((text) => {
    const textNode = screen.getByText(text);
    expect(textNode).toBeInTheDocument();
  });
}

function mockAxiosWithResolvedValues(...args: any[]) {
  let mockGet = mockedAxios.get;
  args.forEach((data) => {
    mockGet.mockResolvedValueOnce({ ...MOCK_RESPONSE_SUCCESS, data });
  });
}

function mockAxiosWithRejectedValues() {
  mockedAxios.get.mockRejectedValueOnce(new Error('async error message'));
}

function generateDataWithNArticles(n: number) {
  let articles: Article[] = [];
  for (let i = 0; i < n; i++) {
    let article: Article = {
      ...MOCK_DATA_ARTICLE,
      views: MOCK_DATA_ARTICLE.views + i,
      rank: i + 1,
    };
    articles.push(article);
  }
  const data = {
    items: [
      {
        articles,
      },
    ],
  };
  return data;
}
