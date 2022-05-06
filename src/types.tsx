export type Article = {
  article: string;
  views: number;
  rank: number;
};

export type GetTopPagesResponse = {
  items: ResponseItem[];
};

type ResponseItem = {
  articles: Article[];
};

export type KeyLabelOption = {
  label: string | number;
  key: string | number;
};

export type SelectOption = KeyLabelOption | string | number;
