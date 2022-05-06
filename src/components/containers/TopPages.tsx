import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { FetchConfig } from '../../types';
import { DEFAULT_NUM_RESULTS } from '../../utils/constants';
import {
  getTopPagesForCountryUrl,
  getTopPagesUrl,
  getYesterday,
  processDataDefault,
  processDataForCountry
} from '../../utils/utils';
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
      let url: string = countryCode
        ? getTopPagesForCountryUrl(countryCode, date)
        : getTopPagesUrl(date);
      let processData = countryCode
        ? processDataForCountry
        : processDataDefault;
      setFetchConfig({
        url,
        processData,
      });
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

  const { data, loading } = useFetch(fetchConfig);
  let displayedResults: any[] = [];
  if (Array.isArray(data)) {
    displayedResults = data.slice(0, numberOfResults);
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
        {loading ? <Loading /> : <ResultList results={displayedResults} />}
      </div>
    </div>
  );
};

export default TopPages;
