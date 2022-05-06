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
