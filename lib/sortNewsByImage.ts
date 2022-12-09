export default function sortNewsByImage(news: NewsResponse) {
  const newsWithImage = news.data!.filter((item) => item.image !== null);
  const newsWithoutImage = news.data!.filter((item) => item.image === null);
  const sortedNewsResponse = {
    pagination: news.pagination,
    dta: [...newsWithImage, ...newsWithoutImage],
  };
  return sortedNewsResponse;
}
