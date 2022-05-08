export type Article = {
  article: string;
  views: number;
  rank: number;
  project?: string;
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

export type FetchConfig = {
  url: string;
  processData: (responseData: any) => any;
  getErrorMessage: () => string;
};
