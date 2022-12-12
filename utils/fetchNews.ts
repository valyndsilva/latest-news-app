import { gql } from "graphql-request";
import sortNewsByImage from "../lib/sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  //GraphQL query
  const query = gql`
    query MyQuery(
      $access_key: String!
      # $categories: String!
      $categories: String
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  // Fetch function with NextJS 13 caching....
  //cache:no-cache means SSR
  //cache:default means SSG / ISR

  const variables = {
    access_key: process.env.MEDIASTACK_API_KEY,
    categories: category,
    keywords: keywords,
  };
  const body = JSON.stringify({
    query,
    variables,
  });
  const headers = {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "Node",
  };

  const res = await fetch(`${process.env.STEPZEN_API_URL}`, {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers,
    body,
  });

  console.log(
    "Loading latest data from API for category >>>",
    category,
    keywords
  );
  console.log(res);
  const newsResponse = await res.json();
  if (newsResponse.data) {
    console.log(newsResponse.data);
    // Sort function by images v/s no images present
    const news = sortNewsByImage(newsResponse.data.myQuery);
    console.log(news);
    return news;
  }
  if (newsResponse.errors) {
    console.error(newsResponse.errors);
    // throw new Error("Failed to fetch API");
  }
};

export default fetchNews;
