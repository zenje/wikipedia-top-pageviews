import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { FetchConfig } from '../types';
import useFetch from './useFetch';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ERROR_MESSAGE = 'error';
const FETCH_CONFIG: FetchConfig = {
  url: 'url',
  processData: (data: any) => data,
  getErrorMessage: () => ERROR_MESSAGE,
};
const MOCK_DATA = {
  data: {
    results: [1, 2, 3],
  },
};

describe('useFetch()', () => {
  let processDataSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    processDataSpy = jest.spyOn(FETCH_CONFIG, 'processData');
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('fetch with successful response', async () => {
    mockAxiosWithResolvedValue();
    render(<TestComponent fetchConfig={FETCH_CONFIG} />);

    const jsonData = JSON.stringify(MOCK_DATA.data);
    const dataNode = await waitFor(() => screen.getByText(jsonData));
    expect(dataNode).toBeInTheDocument();

    expect(processDataSpy).toBeCalledTimes(1);
    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toBeCalledWith(FETCH_CONFIG.url);
  });

  it('fetch with failed response', async () => {
    mockAxiosWithRejectedValue();
    render(<TestComponent fetchConfig={FETCH_CONFIG} />);

    const errorNode = await waitFor(() => screen.getByText(ERROR_MESSAGE));
    expect(errorNode).toBeInTheDocument();
    expect(consoleErrorSpy).toBeCalled();

    expect(processDataSpy).not.toBeCalled();
    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toBeCalledWith(FETCH_CONFIG.url);
  });
});

function mockAxiosWithResolvedValue() {
  mockedAxios.get.mockResolvedValue(MOCK_DATA);
}

function mockAxiosWithRejectedValue() {
  mockedAxios.get.mockRejectedValue(new Error('async error message'));
}

type TestComponentProps = {
  fetchConfig: FetchConfig;
};

const TestComponent = ({ fetchConfig }: TestComponentProps) => {
  const { data, loading, hasError } = useFetch(fetchConfig);
  if (loading) {
    return <div>Loading</div>;
  }
  if (hasError) {
    return <div>{fetchConfig.getErrorMessage()}</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
};
