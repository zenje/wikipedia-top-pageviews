import { Article } from '../../types';
import { VIEWS } from '../../utils/strings';
import {
  cleanArticleTitle,
  formatNumber,
  getWikipediaLink,
} from '../../utils/utils';

type Props = Article;

const ResultItem = ({ article, views, rank, project }: Props) => {
  return (
    <div className="result-item">
      <div className="result-item-left">
        <span className="rank">{rank}</span>
        <div className="result-item-left-text">
          <a
            href={getWikipediaLink(article, project)}
            target="_blank"
            rel="noreferrer noopener"
          >
            {article && cleanArticleTitle(article)}
          </a>
        </div>
      </div>
      <div className="result-item-right">
        <span>{VIEWS}</span>
        <div>{views && formatNumber(views)}</div>
      </div>
    </div>
  );
};

export default ResultItem;
