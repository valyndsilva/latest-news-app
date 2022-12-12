import React from "react";
import { categories } from "../../../constants";
import response from "../../../response.json";
import fetchNews from "../../../utils/fetchNews";
import NewsList from "../../NewsList";
type Props = { slug: Category };

async function CategoryPage({ slug }: Props) {
  // console.log("Category selected:", slug);
  const news: NewsResponse = await fetchNews(slug);
  //  const news: NewsResponse = response || (await fetchNews(category));
  // const news: NewsResponse = response;
  return (
    <div>
      <h1 className="headerTitle">{slug}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default CategoryPage;

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category }));
}

// Pre-builds all these pages. The fetch revalidation rules keeps the cached values up-to-date.
// Ex: localhost:3000/news/general
// Ex: localhost:3000/news/business
// Ex: localhost:3000/news/entertainment
// Ex: localhost:3000/news/health
// Ex: localhost:3000/news/science
// Ex: localhost:3000/news/sports
// Ex: localhost:3000/news/technology
