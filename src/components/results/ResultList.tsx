import { Article } from '../../types';
import ResultItem from './ResultItem';

type Props = {
  end: number;
  start: number;
  total: number;
  results: Article[];
};

const ResultList = ({ end, start, total, results }: Props) => {
  return (
    <div className="results-container">
      <div className="results-info">{`${start} - ${end} of ${total}`}</div>
      {results.map((result, index) => (
        <ResultItem key={`item-${index}`} {...result} />
      ))}
    </div>
  );
};

export default ResultList;
