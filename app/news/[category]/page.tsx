import React from "react";
import fetchNews from "../../../utils/fetchNews";
import response from "../../../response.json";
import NewsList from "../../NewsList";
import { categories } from "../../../constants";
type Props = { category: Category };

async function CategoryPage({ category }: Props) {
  //   const news: NewsResponse = await fetchNews(category);
  const news: NewsResponse = response;
  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default CategoryPage;

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category }));
}

// Pre-builds all these pages. The fetch revalidation rules keeps the cached values up-to-date.
// Ex: localhost:3000/news/general
// Ex: localhost:3000/news/business
// Ex: localhost:3000/news/entertainment
// Ex: localhost:3000/news/health
// Ex: localhost:3000/news/science
// Ex: localhost:3000/news/sports
// Ex: localhost:3000/news/technology
