import { render, screen } from '@testing-library/react';
import { Article } from '../../types';
import { VIEWS } from '../../utils/strings';
import {
  cleanArticleTitle,
  formatNumber,
  getWikipediaLink
} from '../../utils/utils';
import ResultItem from './ResultItem';

const ARTICLE: Article = {
  article: 'New_York_City',
  rank: 260,
  views: 20983,
};

describe('ResultItem', () => {
  it('basic render of component', () => {
    render(<ResultItem {...ARTICLE} />);

    const articleName: string = cleanArticleTitle(ARTICLE.article);
    const articleLink: HTMLLinkElement =
      screen.getByRole<HTMLLinkElement>('link');
    expect(articleLink).toBeInTheDocument();
    expect(articleLink.textContent).toBe(articleName);
    expect(articleLink).toHaveAttribute(
      'href',
      getWikipediaLink(ARTICLE.article)
    );

    const rankText: HTMLDivElement = screen.getByText<HTMLDivElement>(
      ARTICLE.rank
    );
    expect(rankText).toBeInTheDocument();

    const viewsText: HTMLSpanElement = screen.getByText<HTMLSpanElement>(VIEWS);
    expect(viewsText).toBeInTheDocument();

    const formattedViews = formatNumber(ARTICLE.views);
    const numberOfViewsText: HTMLDivElement =
      screen.getByText<HTMLDivElement>(formattedViews);
    expect(numberOfViewsText).toBeInTheDocument();
  });
});
