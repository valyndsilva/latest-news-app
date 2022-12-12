import React from "react";
import LiveTimestamp from "./LiveTimestamp";
import ReadMoreButton from "./ReadMoreButton";

type Props = {
  article: DataEntry;
};

function Article({ article }: Props) {
  return (
    <article className="bg-chalk/50 dark:bg-zinc-700 flex flex-col rounded-lg shadow-md hover:scale-105 hover:shadow-lg hover:bg-chalk dark:hover:bg-zinc-700/80 transition-all duration-200 ease-out">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="object-cover h-52 w-full rounded-lg shadow-md"
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold  line-clamp-2">{article.title}</h2>
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

{/* <div class="flex justify-center">
  <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
    <img
      class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
      src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
      alt=""
    />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
      <p class="text-gray-700 text-base mb-4">
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </p>
      <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
    </div>
  </div>
</div>; */}