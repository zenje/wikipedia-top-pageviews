import axios from 'axios';
import { useEffect, useState } from 'react';
import { Article, GetTopPagesResponse } from '../types';
import { RESULTS_OPTIONS, URL } from '../utils/constants';
import { NUMBER_OF_RESULTS, START_DATE } from '../utils/strings';
import DatePicker from './DatePicker';
import ResultList from './ResultList';
import SelectInput from './SelectInput';

const TopPages = () => {
  const [topPagesData, setTopPagesData] = useState<Article[]>([]);
  const [numberOfResults, setNumberOfResults] = useState<number>(100);

  useEffect(() => {
    axios
      .get<GetTopPagesResponse>(URL)
      .then((responseData) => {
        console.log(responseData);
        const { articles } = responseData.data.items[0];
        setTopPagesData(articles);
      })
      .catch((error) => console.error(error));
  }, []);

  const displayedResults = topPagesData.slice(0, numberOfResults);

  return (
    <div className="top-pages-container">
      <div className="top-pages-wrapper">
        <div className="top-pages-input">
          <div className="input-item">
            <div className="input-item-wrapper">
              <label htmlFor="start-date">{START_DATE}</label>
              <DatePicker />
            </div>
          </div>
          <div className="input-item">
            <div className="input-item-wrapper">
              <label>{NUMBER_OF_RESULTS}</label>
              <SelectInput options={RESULTS_OPTIONS} />
            </div>
          </div>
        </div>
        <ResultList results={displayedResults} />
      </div>
    </div>
  );
};

export default TopPages;
