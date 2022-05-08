import { render, screen } from '@testing-library/react';
import { Article } from '../../types';
import { VIEWS } from '../../utils/strings';
import {
  cleanArticleTitle,
  formatNumber,
  getWikipediaLink,
} from '../../utils/utils';
import ResultItem from './ResultItem';

const ARTICLE_US: Article = {
  article: 'New_York_City',
  rank: 260,
  views: 20983,
};

const ARTICLE_JA: Article = {
  article: 'メインページ',
  project: 'ja.wikipedia',
  rank: 1,
  views: 380800,
};

describe('ResultItem', () => {
  it('basic render of component for article (US)', () => {
    render(<ResultItem {...ARTICLE_US} />);
    assertElementsAreDisplayed(ARTICLE_US);
  });

  it('basic render of component for article (Japan)', () => {
    render(<ResultItem {...ARTICLE_JA} />);
    assertElementsAreDisplayed(ARTICLE_JA);
  });
});

function assertElementsAreDisplayed(article: Article) {
  assertArticleLink(article);

  const rankText: HTMLDivElement = screen.getByText<HTMLDivElement>(
    article.rank
  );
  expect(rankText).toBeInTheDocument();

  const viewsText: HTMLSpanElement = screen.getByText<HTMLSpanElement>(VIEWS);
  expect(viewsText).toBeInTheDocument();

  const formattedViews = formatNumber(article.views);
  const numberOfViewsText: HTMLDivElement =
    screen.getByText<HTMLDivElement>(formattedViews);
  expect(numberOfViewsText).toBeInTheDocument();
}

function assertArticleLink(article: Article) {
  const articleName: string = cleanArticleTitle(article.article);
  const articleLink: HTMLLinkElement =
    screen.getByRole<HTMLLinkElement>('link');
  expect(articleLink).toBeInTheDocument();
  expect(articleLink.textContent).toBe(articleName);
  expect(articleLink).toHaveAttribute(
    'href',
    getWikipediaLink(article.article, article.project)
  );
}
