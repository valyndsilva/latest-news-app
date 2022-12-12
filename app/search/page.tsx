import React from "react";
import fetchNews from "../../utils/fetchNews";
import ukraineResponse from "../../ukraineResponse.json";
import NewsList from "../NewsList";

type Props = { searchParams?: { term: string } };

async function SearchPage({ searchParams }: Props) {
  // Fetch news data
  // const news: any = await fetchNews("general", searchParams?.term, true);
  // const news: NewsResponse = response;
  const news: any = ukraineResponse|| 
    await fetchNews("general", searchParams?.term, true)
  );
  // console.log(news);

  return (
    <div>
      <h1 className="headerTitle">Search Results for: {searchParams?.term}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default SearchPage;
