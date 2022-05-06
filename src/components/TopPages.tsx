import axios from 'axios';
import { useEffect, useState } from 'react';
import { RESULTS_OPTIONS, URL } from '../constants';
import { Article, GetTopPagesResponse } from '../types';

type Props = {};

const ResultsDropdown = () => {
  return (
    <select>
      {RESULTS_OPTIONS.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

const Results = ({ results }: { results: Article[] }) => {
  return (
    <div>
      {results.map((result) => (
        <>
          <div>{result.article}</div>
          <div>{result.views}</div>
          <div>{result.rank}</div>
        </>
      ))}
    </div>
  );
};

const TopPages = (props: Props) => {
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
    <div>
      <ResultsDropdown />
      <Results results={displayedResults} />
    </div>
  );
};

export default TopPages;
