import { Article } from '../types';
import { VIEWS } from '../utils/strings';
import { cleanArticleTitle, formatNumber } from '../utils/utils';

type Props = Article;

const ResultItem = ({ article, views, rank }: Props) => {
  return (
    <div className="result-item">
      <div className="result-item-left">
        <div className="result-item-left-text">
          {cleanArticleTitle(article)}
        </div>
      </div>
      <div className="result-item-right">
        <span>{VIEWS}</span>
        <div>{formatNumber(views)}</div>
      </div>
    </div>
  );
};

export default ResultItem;
