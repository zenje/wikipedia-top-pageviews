import { cleanArticleTitle, getFormattedDate } from './utils';

describe('cleanArticleTitle()', () => {
  it('multi-word title', () => {
    const title: string = 'New_York_City';
    const cleanedTitle: string = cleanArticleTitle(title);
    expect(cleanedTitle).toBe('New York City');
  });

  it('multi-word title with parentheses', () => {
    const title: string = 'Java_(programming_language)';
    const cleanedTitle: string = cleanArticleTitle(title);
    expect(cleanedTitle).toBe('Java (programming language)');
  });

  it('special Wikipedia article - should add a space after colon', () => {
    const title: string = 'Special:Search';
    const cleanedTitle: string = cleanArticleTitle(title);
    expect(cleanedTitle).toBe('Special: Search');
  });
});

describe('getFormattedDate()', () => {
  it('formats date', () => {
    const date: Date = new Date(2022, 4, 1);
    const formattedDate: string = getFormattedDate(date);
    expect(formattedDate).toBe('05/01/2022');
  });
});
