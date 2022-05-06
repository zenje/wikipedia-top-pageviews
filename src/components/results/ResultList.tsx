import { Article } from '../../types';
import ResultItem from './ResultItem';

type Props = {
  results: Article[];
};

const ResultList = ({ results }: Props) => {
  return (
    <div className="results">
      {results.map((result, index) => (
        <ResultItem key={`item-${index}`} {...result} />
      ))}
    </div>
  );
};

export default ResultList;
