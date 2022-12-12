"use client";
import React from "react";
import Article from "./Article";

type Props = {
  news: NewsResponse;
};

function NewsList({ news }: Props) {
  // console.log(news);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-10">
      {/* Using MediaStack APIreal-time updates */}
      {news.data?.map((article) => (
        <Article key={article.title} article={article} />
      ))}
    </main>
  );
}

export default NewsList;
