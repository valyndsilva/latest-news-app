import React from "react";
import LiveTimestamp from "./LiveTimestamp";
import ReadMoreButton from "./ReadMoreButton";

type Props = {
  article: DataEntry;
};

function Article({ article }: Props) {
  return (
    <article className="bg-chalk/50 dark:bg-slate-700/50 flex flex-col rounded-lg shadow-md hover:scale-105 hover:shadow-lg hover:bg-chalk dark:hover:bg-slate-700 transition-all duration-200 ease-out">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="object-cover h-52 w-full rounded-lg shadow-md"
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold">{article.title}</h2>
          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-2">{article.description}</p>
          </section>
          <footer className="text-xs text-right ml-auto flex space-x-1 pt-3 italic text-gray-400">
            <p>{article.source} -</p>
            {/* <p>{article.published_at}</p> */}
            <p>
              <LiveTimestamp timestamp={article.published_at} />
            </p>
          </footer>
        </div>
        <ReadMoreButton article={article} />
      </div>
    </article>
  );
}

export default Article;
