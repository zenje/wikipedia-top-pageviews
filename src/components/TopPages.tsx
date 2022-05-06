import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Article, GetTopPagesResponse } from '../types';
import { getTopPagesUrl, RESULTS_OPTIONS } from '../utils/constants';
import { NUMBER_OF_RESULTS, START_DATE } from '../utils/strings';
import { getDatePickerOptions, getYesterday } from '../utils/utils';
import DatePicker from './DatePicker';
import ResultList from './ResultList';
import SelectInput from './SelectInput';

const TopPages = () => {
  const [topPagesData, setTopPagesData] = useState<Article[]>([]);
  const [date, setDate] = useState<Date | null>(getYesterday());
  const [numberOfResults, setNumberOfResults] = useState<number>(100);

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
    console.log(selectedDate);
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
        <div className="top-pages-input">
          <div className="input-item">
            <div className="input-item-wrapper">
              <label htmlFor="start-date">{START_DATE}</label>
              <DatePicker
                date={date}
                onChange={handleDateChange}
                {...getDatePickerOptions()}
              />
            </div>
          </div>
          <div className="input-item">
            <div className="input-item-wrapper">
              <label>{NUMBER_OF_RESULTS}</label>
              <SelectInput
                onChange={handleSelectChange}
                options={RESULTS_OPTIONS}
                selectedValue={numberOfResults}
              />
            </div>
          </div>
        </div>
        <ResultList results={displayedResults} />
      </div>
    </div>
  );
};

export default TopPages;
