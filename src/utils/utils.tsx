export const cleanArticleTitle = (title: string) => {
  return title.replaceAll(/(?<=\w):(?=\w)/g, ': ').replaceAll('_', ' ');
};
