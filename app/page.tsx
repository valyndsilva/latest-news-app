import React from "react";
import { categories } from "../constants";
import fetchNews from "../utils/fetchNews";
import NewsList from "./NewsList";
import response from "../response.json";
type Props = {};

async function Home({}: Props) {
  // Fetch news data
  // const news: NewsResponse =
  //   response || (await fetchNews(categories.join(",")));
  const news: NewsResponse = response;
  console.log({news});
  return (
    <div className="">
      <div className="blur-spot blur-[150px] plan-blur-1"></div>
      <div className="blur-spot blur-[150px] plan-blur-2"></div>
      <NewsList news={news} />
    </div>
  );
}

export default Home;
