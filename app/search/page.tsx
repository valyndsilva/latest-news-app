import React from "react";
import fetchNews from "../../utils/fetchNews";
import generalResponse from "../../generalResponse.json";
import NewsList from "../NewsList";

type Props = { searchParams?: { term: string } };

async function SearchPage({ searchParams }: Props) {
  // Fetch news data
  const news: NewsResponse = await fetchNews(
    "general",
    searchParams?.term,
    true
  );
  // const news: NewsResponse =
  //   generalResponse || (await fetchNews("general", searchParams?.term, true));
  // const news: NewsResponse = generalResponse;
  console.log(news);
  return (
    <div>
      <h1 className="headerTitle">Search Results for: {searchParams?.term}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default SearchPage;
