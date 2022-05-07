import { Article } from '../../types';
import { VIEWS } from '../../utils/strings';
import {
  cleanArticleTitle,
  formatNumber,
  getWikipediaLink,
} from '../../utils/utils';

type Props = Article;

const ResultItem = ({ article, views, rank }: Props) => {
  return (
    <div className="result-item">
      <div className="result-item-left">
        <span className="rank">{rank}</span>
        <div className="result-item-left-text">
          <a
            href={getWikipediaLink(article)}
            target="_blank"
            rel="noreferrer noopener"
          >
            {cleanArticleTitle(article)}
          </a>
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
