import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Article, GetTopPagesResponse } from '../types';
import { DEFAULT_NUM_RESULTS, getTopPagesUrl } from '../utils/constants';
import { getYesterday } from '../utils/utils';
import ControlInputs from './ControlInputs';
import ResultList from './ResultList';

const TopPages = () => {
  const [topPagesData, setTopPagesData] = useState<Article[]>([]);
  const [date, setDate] = useState<Date | null>(getYesterday());
  const [numberOfResults, setNumberOfResults] =
    useState<number>(DEFAULT_NUM_RESULTS);

  useEffect(() => {
    if (date !== null) {
      axios
        .get<GetTopPagesResponse>(getTopPagesUrl(date))
        .then((responseData) => {
          console.log(responseData);
          const { articles } = responseData.data.items[0];
          setTopPagesData(articles);
        })
        .catch((error) => console.error(error));
    }
  }, [date]);

  const handleDateChange = (
    selectedDate: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ): void => {
    setDate(selectedDate);
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const element = event.target as HTMLSelectElement;
    setNumberOfResults(element.value as unknown as number);
  };

  const displayedResults = topPagesData.slice(0, numberOfResults);

  return (
    <div className="top-pages-container">
      <div className="top-pages-wrapper">
        <ControlInputs
          date={date}
          handleDateChange={handleDateChange}
          handleSelectChange={handleSelectChange}
          selectValue={numberOfResults}
        />
        <ResultList results={displayedResults} />
      </div>
    </div>
  );
};

export default TopPages;
