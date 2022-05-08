import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { FetchConfig } from '../../types';
import { DEFAULT_NUM_RESULTS } from '../../utils/constants';
import { ERROR_MESSAGES } from '../../utils/strings';
import { getFetchConfig, getYesterday } from '../../utils/utils';
import ErrorContainer from '../other/ErrorContainer';
import Loading from '../other/Loading';
import ResultList from '../results/ResultList';
import ControlInputs from './ControlInputs';

const TopPages = () => {
  const [date, setDate] = useState<Date | null>(getYesterday());
  const [numberOfResults, setNumberOfResults] =
    useState<number>(DEFAULT_NUM_RESULTS);
  const [countryCode, setCountryCode] = useState<string>('');
  const [fetchConfig, setFetchConfig] = useState<FetchConfig | null>(null);

  useEffect(() => {
    if (date != null) {
      const fetchConfig = getFetchConfig(date, countryCode);
      setFetchConfig(fetchConfig);
    }
  }, [date, countryCode]);

  const handleDateChange = useCallback(
    (
      selectedDate: Date | null,
      event: React.SyntheticEvent<any> | undefined
    ): void => {
      setDate(selectedDate);
    },
    [setDate]
  );

  const handleCountryChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        setCountryCode(event.target.value);
      },
      [setCountryCode]
    );

  const handleNumResultsChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        setNumberOfResults(element.value as unknown as number);
      },
      [setNumberOfResults]
    );

  let { data, loading, hasError } = useFetch(fetchConfig);
  let displayedResults: any[] = [];
  let errorMessage = fetchConfig?.getErrorMessage() ?? '';
  if (!hasError && !loading && Array.isArray(data)) {
    if (data && data.length > 0) {
      displayedResults = data.slice(0, numberOfResults);
    } else {
      hasError = true;
      errorMessage = ERROR_MESSAGES.NO_RESULTS_FOUND;
    }
  }

  return (
    <div className="top-pages-container">
      <div className="top-pages-wrapper">
        <ControlInputs
          countryValue={countryCode}
          date={date}
          handleCountryChange={handleCountryChange}
          handleDateChange={handleDateChange}
          handleNumResultsChange={handleNumResultsChange}
          numResultsValue={numberOfResults}
        />
        {loading ? (
          <Loading />
        ) : hasError ? (
          <ErrorContainer message={errorMessage} />
        ) : (
          <ResultList
            start={1}
            end={displayedResults.length}
            total={data.length}
            results={displayedResults}
          />
        )}
      </div>
    </div>
  );
};

export default TopPages;
