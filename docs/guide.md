# Latest News App ⚡

## Setting up NextJS and TailwindCSS:

```
npx create-next-app -e with-tailwindcss latest-news-app
cd latest-news-app
npm install @heroicons/react encoding
npm run dev
```

## Convert NextJS 12 to NextJS 13:

Create a "app" folder in the root.

In next.config.js:

```
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};
```

Restart Server.

In app/page.tsx:

```
import React from "react";

type Props = {};

function Home({}: Props) {
  return <div>Home</div>;
}

export default Home;
```

You receive an error:

```
error - Conflicting app and page file was found, please remove the conflicting files to continue:
error -   "pages/index.tsx" - "app/page.tsx"

```

Delete pages/index.tsx file.

Now the app/page.tsx file is the main root file. a layout.tsx and head.tsx file is auto-generated in app folder.

## Update Tailwind CSS import:

Remove the import from pages/\_app.tsx

```
import '../styles/globals.css'
```

Add the import in app/layout.tsx:

```
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
```

In app/head.tsx:

```
export default function Head() {
  return (
    <>
      <title>Latest News App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
```

## Create a Header components:

In app/Header.tsx:

```
import React from "react";

type Props = {};

function Header({}: Props) {
  return <div>Header</div>;
}

export default Header;

```

## Update app/layout.tsx:

```
import "../styles/globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
```

## Add Custom Fonts (Poppins):

First download the fonts from Google fonts. Then go to https://transfonter.org/ , upload the fonts and convert. Upload the font woff,woff2 and css files in public/fonts/poppins

### Update styles/globals.css:

```
@import url("/fonts/poppins/stylesheet.css");
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Update tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

```

### Example usage of custom font poppins as tailwind classes:

```
<h1 className="text-4xl font-poppins font-light">Latest News</h1>

```

## Enable Dark mode in Tailwind CSS:

Read this [guide](https://v2.tailwindcss.com/docs/dark-mode)

### Create app/Providers.tsx:

Providers.tsx will be a client-side rendered component and this is where you would use Redux and other Providers ideally.

```
"use client";
import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default Providers;

```

### Update app/layout.tsx:

```
import "../styles/globals.css";
import Providers from "./Providers";
import Header from "./Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <Header />
          <div className="p-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

```

### Install [Next Themes](https://www.npmjs.com/package/next-themes):

```
npm install next-themes
```

### Update app/Providers.tsx with next-themes ThemeProvider:

```
"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}

export default Providers;

```

### Update tailwind.config.js with darkMode:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

```

### Add Dark Mode Button:

Create app/DarkModeButton.tsx:

```
"use client";
import React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
type Props = {};

function DarkModeButton({}: Props) {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="h-8 w-8 cursor-pointer text-yellow-400"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="h-8 w-8 cursor-pointer text-[#2a2a2a]"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return <div>{renderThemeChanger()}</div>;
}

export default DarkModeButton;

```

## Add custom color palette and blur spots:

### In tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Configure your color palette here
        ivory: "#F9F4EC",
        chalk: "#EAEAEA",
        clay: "#B0695C",
        balticSea: "#2A2A2A",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
```

### In app/layout.tsx:

```
import "../styles/globals.css";
import Providers from "./Providers";
import Header from "./Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-ivory text-balticSea dark:bg-balticSea dark:text-ivory transition-all duration-700">
        <Providers>
          <Header />
          <div className="p-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
```

### In styles/globals.css add blur-spot css:

```
@import url("/fonts/poppins/stylesheet.css");
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .blur-spot {
    background: rgba(176, 105, 92, 0.9);
    border-radius: 50%;
    position: absolute;
    z-index: -9;
  }

  .hero-blur {
    width: 22rem;
    height: 30rem;
    left: 0rem;
  }

  .plan-blur-1 {
    width: 10rem;
    height: 10rem;
    top: 45rem;
    left: 0rem;
  }

  .plan-blur-2 {
    width: 10rem;
    height: 10rem;
    top: 5rem;
    right: 0rem;
  }
}

```

### In app/page.tsx:

```
import React from "react";

type Props = {};

function Home({}: Props) {
  return (
    <div className="">
      <div className="blur-spot blur-[150px] plan-blur-1"></div>
      <div className="blur-spot blur-[150px] plan-blur-2"></div>
      Home
    </div>
  );
}

export default Home;
```

## Building Header Component:

### Create a typings.d.ts file in the root:

```
type Category =
  | "general"
  | "business"
  | "sports"
  | "technology"
  | "entertainment"
  | "health"
  | "science";

```

### Create constants.ts file in the root:

```
export const categories: Category[] = [
  "general",
  "business",
  "sports",
  "technology",
  "entertainment",
  "health",
  "science",
];

```

### Update styles/globals.css:

```
@import url("/fonts/poppins/stylesheet.css");
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .blur-spot {
    background: rgba(176, 105, 92, 0.9);
    border-radius: 50%;
    position: absolute;
    z-index: -9;
  }

  .hero-blur {
    width: 22rem;
    height: 30rem;
    left: 0rem;
  }

  .plan-blur-1 {
    width: 10rem;
    height: 10rem;
    top: 45rem;
    left: 0rem;
  }

  .plan-blur-2 {
    width: 10rem;
    height: 10rem;
    top: 5rem;
    right: 0rem;
  }
}

@layer components {
  .btn{
    @apply bg-balticSea dark:bg-chalk/80 text-white dark:text-balticSea px-4 lg:px-8 py-2 rounded-full cursor-pointer disabled:bg-balticSea/20 disabled:dark:bg-chalk/10
  }
  .navLink {
    @apply text-center border-[1px] border-balticSea dark:border-ivory rounded-full px-4 py-2 mb-4 cursor-pointer hover:font-bold hover:border-clay dark:hover:border-clay  active:border-clay active:text-clay transition-transform duration-200 ease-out;
  }
}

```

### Create app/NavLinks.tsx:

```
"use clients";

import React from "react";
import { categories } from "../constants";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

type Props = {};

function NavLinks({}: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname?.split("/").pop() === path;
    // Ex: mysite.com/news/technology
    // It splits at / so you have 3 values in an array: [mysite.com , news , technology]
    // on pop() it takes the last value Ex: technology
    // Compares technology to path value and retuns a boolean value.
  };
  return (
    <nav className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 mt-10 text-xs md:text-sm border-b">
      {categories.map((category) => (
        <NavLink
          key={category}
          category={category}
          isActive={isActive(category)}
        />
      ))}
    </nav>
  );
}

export default NavLinks;

```

### Create app/NavLink.tsx:

```
import Link from "next/link";
import React from "react";

interface Props {
  category: string;
  isActive: boolean;
}

function NavLink({ category, isActive }: Props) {
  return (
    <Link
      href={`/news/${category}`}
      className={`navLink  ${isActive && ""}`}
    >
      {category}
    </Link>
  );
}

export default NavLink;

```

### Create app/SearchBox.tsx:

```
"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {};

function SearchBox({}: Props) {
    const [input, setInput] = useState("");
  const router = useRouter(); // next/navigation for nextjs 13

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    // router.push(`/search/${input}`); // using dynamic route
    router.push(`/search?term=${input}`); // using query param
  };
  return (
    <form className="mt-10 flex space-x-5" onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search keywords..."
        className="w-full flex-1 h-14 rounded-sm placeholder-gray-500 dark:placeholder-ivory/50 placeholder-opacity-50 text-balticSea outline-none bg-transparent dark:text-ivory font-bold"
      />
      <button
        type="submit"
        disabled={!input}
        className="btn flex items-center space-x-2"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchBox;

```

### In app/Header.tsx:

Add the DarkModeButton, NavLinks and SearchBox components.

```
import React from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

type Props = {};

function Header({}: Props) {
  return (
    <header className=" p-10 font-poppins">
      <nav className="flex items-center place-items-start">
        <Bars3CenterLeftIcon className="h-8 w-8 cursor-pointer" />
        <div className="px-10 flex-1">Home</div>
        <div className="space-x-10 items-center flex">
          <DarkModeButton />
          <button className="hidden md:inline btn">
            Subscribe Now
          </button>
        </div>
      </nav>
      <div className="mt-10">
        <Link href="/" prefetch={false}>
          <h1 className="text-4xl font-light">Latest News</h1>
        </Link>
      </div>
      <NavLinks />
      <SearchBox />
    </header>
  );
}

export default Header;

```

## Building Homepage:

### Update typings.d.ts:

```
type Category =
  | "general"
  | "business"
  | "sports"
  | "technology"
  | "entertainment"
  | "health"
  | "science";


type Pagination = {
  count: Int;
  limit: Int;
  offset: Int;
  total: Int;
};

type DataEntry = {
  author: string | null;
  category: string;
  country: string;
  description: string;
  image: string | null;
  language: string;
  published_at: string;
  source: string;
  title: string;
  url: string;
};

type NewsResponse = {
  pagination?: Pagination;
  data?: DataEntry[];
};

```

### Install [GraphQL](https://graphql.org/) and [GraphQL Request](https://www.npmjs.com/package/graphql-request):

```
npm add graphql-request graphql
```

### Implement [MediaStack](https://mediastack.com/) API:

Sign up on Media Stack.
Copy your API Access Key and add it into .env.local file in the root.

```
MEDIASTACK_API_KEY=...
```

If you don't add NEXT_PUBLIC in the beginning of the env variable it won't be present on the client. It would be a secret key.

### Implementing StepZen:

We build the graphQL API using StepZen.
Sign Up amd Connect using Github.

Install dependecies:

```
sudo npm install -g stepzen
```

Copy Admin Key.

Login with StepZen account:

```
stepzen login -a tomsriver
```

It asks for your admin key.

Go to StepZen Dashboard > Account (https://dashboard.stepzen.com/account) > Copy the API Key.

#### Update env.local:

```
MEDIASTACK_API_KEY=...
STEPZEN_API_KEY=...
```

#### Get MediaStack API Endpoint:

In MediaStack go to https://mediastack.com/quickstart. The API Request looks like this:

```
// Live News Data
http://api.mediastack.com/v1/news?access_key=YOUR_ACCESS_KEY
// optional parameters:
    & sources = cnn,bbc
    & categories = business,sports
    & countries = us,au
    & languages = en,-de
    & keywords = virus,-corona
    & sort = published_desc
    & offset = 0
    & limit = 100
```

Ex:

```
http://api.mediastack.com/v1/news?access_key={process.env.MEDIASTACK_API_KEY}&categories=business,sports
```

We make a connection to mediastack API through graphQL
A call is made from client to StepZen and StepZen handles the rest.

#### Initialize StepZen in the project:

```
stepzen init
```

What would you like your endpoint to be called? api/latest-news

This creates a stepzen.config.json file in the root.

```
{
 "endpoint": "api/latest-news"
}
```

#### Import a REST API endpoint from your terminal:

Go to https://dashboard.stepzen.com/account > Getting Started > REST API> Import a REST API endpoint from your terminal. Run the code below. Make sure to replace the access_key value in the url before running the command in the terminal.

```
stepzen import curl "http://api.mediastack.com/v1/news?access_key={process.env.MEDIASTACK_API_KEY}"
```

OR

```
stepzen import curl "http://api.mediastack.com/v1/news?access_key={process.env.MEDIASTACK_API_KEY}&sources=cnn,bbc&categories=general,business,entertainment,health,science,sports,technology&countries=us,au&languages=en&sort=published_desc&offset=0&limit=100"
```

```
schema @sdl(files: ["curl/index.graphql"]) {
  query: Query
}

```

And also creates curl/index.graphql:

```
type DataEntry {
  author: JSON
  category: String
  country: String
  description: String
  image: String
  language: String
  published_at: DateTime
  source: String
  title: String
  url: String
}
type Pagination {
  count: Int
  limit: Int
  offset: Int
  total: Int
}
type Root {
  data: [DataEntry]
  pagination: Pagination
}

type Query {
  myQuery(
    access_key: String
    categories: String
    countries: String
    languages: String
    limit: String
    offset: String
    sort: String
    sources: String
  ): Root @rest(endpoint: "http://api.mediastack.com/v1/news")
}

```

This schema helps build a graphQL interface around it.

#### Update curl/index.graphql:

Add keywords in Query type.

```
...

type Query {
  myQuery(
    access_key: String
    categories: String
    countries: String
    languages: String
    limit: String
    offset: String
    sort: String
    sources: String
    keywords: String
  ): Root @rest(endpoint: "http://api.mediastack.com/v1/news")
}
```

#### Run stepzen start:

StepZen connects your REST API in your schema and builds your endpoint.

```
stepzen start
```

It basiclly deploys api/lates-news to StepZen:

```
You can test your hosted API with curl:

curl https://tomsriver.stepzen.net/api/latest-news/__graphql \
   --header "Authorization: Apikey $(stepzen whoami --apikey)" \
   --header "Content-Type: application/json" \
   --data-raw '{
     "query": "query SampleQuery { __schema { description queryType { fields {name} } } }"
   }'

or explore it with GraphiQL at http://localhost:5001/api/latest-news

Your API url is https://tomsriver.stepzen.net/api/latest-news/__graphql
```

Copy the first command link to use for later for data fetching:

```
https://tomsriver.stepzen.net/api/latest-news/__graphql
```

You can edit your queries using 2 ways:

1. Go to StepZen Dashboard > Explorer > Select api/latest-news in dropdown > myQuery (RHS)

OR

2. http://localhost:5001/api/latest-news

We use the 2nd option.

Go to http://localhost:5001/api/latest-news while the server is running.
Click on Explorer and Export tabs to open them.
In Explorer, select everything under data and pagination. Under myQuery, select access_key and enter your mediastack api key. To run the query click on the Play button.

Copy the code from the Code Exporter Section:

```
const GET_QUERY = gql`
  query MyQuery   {
    myQuery(access_key: "your-mediastack-api-key-goes-here") {
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
```

### Create utils/fetchNews.ts:

```
const fetchNews = async (
  catgory?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  //GraphQL query
  // Fetch function with NextJS 13 caching....
  // Sort function by images v/s no images present
  //return res
};

export default fetchNews;

```

#### Paste in the graphql query in fetchNews.ts:

```
import { gql } from "graphql-request";

const fetchNews = async (
  catgory?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  //GraphQL query
  const query = gql`
    query MyQuery {
      myQuery(access_key: "your-mediastack-api-key-goes-here") {
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
  // Sort function by images v/s no images present
  //return res
};

export default fetchNews;
```

#### Create lib/sortNewsByImage.ts:

```
export default function sortNewsByImage(news: NewsResponse) {
  const newsWithImage = news.data!.filter((item) => item.image !== null);
  const newsWithoutImage = news.data!.filter((item) => item.image === null);
  const sortedNewsResponse = {
    pagination: news.pagination,
    dta: [...newsWithImage, ...newsWithoutImage],
  };
  return sortedNewsResponse;
}
```

#### To avoid running out of quota on Mediastack:

Open the url

```
http://api.mediastack.com/v1/news?access_key={mediastack_api_key}}&sources=cnn,bbc&categories=general,business,entertainment,health,science,sports,technology&countries=us,au&languages=en&sort=published_desc&offset=0&limit=100

http://api.mediastack.com/v1/news?access_key={mediastack_api_key}}&sources=cnn,bbc&categories=general&countries=us,au&languages=en&sort=published_desc&offset=0&limit=100
```

Copy the response.

Create response.json in the root and paste the code in there.

#### Update utils/fetchNews.ts:

```
import { gql } from "graphql-request";
import { json } from "stream/consumers";
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
      $categories: String!
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

  const res = await fetch(
    "https://tomsriver.stepzen.net/api/latest-news/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );
  console.log(
    "Loading latest data from API for category >>>",
    category,
    keywords
  );

  const newResponse = await res.json();

  // Sort function by images v/s no images present
  const news = sortNewsByImage(newResponse.data.myQuery);
  return news;
};

export default fetchNews;

```

#### Update app/page.tsx:

```
import React from "react";
import { categories } from "../constants";
import fetchNews from "../utils/fetchNews";

type Props = {};

async function Home({}: Props) {
  // Fetch news data
  const news: NewsResponse = await fetchNews(categories.join(","));
  console.log(news);
  return (
    <div className="">
      <div className="blur-spot blur-[150px] plan-blur-1"></div>
      <div className="blur-spot blur-[150px] plan-blur-2"></div>
      Home
    </div>
  );
}

export default Home;

```

You should see the news response in the terminal since it is a server rendered component.

## Building NewsList Component:

### Create app/NewsList.tsx:

```
import React from "react";

type Props = {
  news: NewsResponse;
};

function NewsList({news}: Props) {
  return <main>NewsList</main>;
}

export default NewsList;

```

### Update app/page.tsx with NewsList Component and add in the response to avoid exceeding quota limit on Mediastack:

```
import React from "react";
import { categories } from "../constants";
import fetchNews from "../utils/fetchNews";
import NewsList from "./NewsList";
import response from "../response.json";
type Props = {};

async function Home({}: Props) {
  // Fetch news data
  // const news: NewsResponse = response || await fetchNews(categories.join(","));
  const news: NewsResponse = response;
  console.log(news);
  return (
    <div className="">
      <div className="blur-spot blur-[150px] plan-blur-1"></div>
      <div className="blur-spot blur-[150px] plan-blur-2"></div>
      <NewsList news={news} />
    </div>
  );
}

export default Home;


```

### Create app/Article.tsx:

```
import React from "react";

type Props = {
  article: DataEntry;
};

function Article({ article }: Props) {
  return <div>Article</div>;
}

export default Article;

```

### Update NewsList.tsx:

```
import React from "react";
import Article from "./Article";

type Props = {
  news: NewsResponse;
};

function NewsList({ news }: Props) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
      {news.data?.map((article) => (
        <Article key={article.title} article={article} />
      ))}
    </main>
  );
}

export default NewsList;

```

### Update app/Article.tsx:

#### Install [Line-Clamp](https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp) for multi-line truncation:

```
npm install @tailwindcss/line-clamp
```

Update tailwind.config.js plugins:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Configure your color palette here
        ivory: "#F9F4EC",
        chalk: "#EAEAEA",
        clay: "#B0695C",
        balticSea: "#2A2A2A",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/line-clamp")],
};

```

To use line-clamp:

```
<p class="line-clamp-2"></p>
```

#### Create app/ReadMoreButton.tsx:

```
"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  article: DataEntry;
};

function ReadMoreButton({ article }: Props) {
  const router = useRouter();
//   console.log(article);
//   console.log(Object.entries(article));

  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/article?${queryString}`;
    console.log(url);
    router.push(url);
  };

  return (
    <button onClick={handleClick} className="btn rounded-b-lg">
      Read More
    </button>
  );
}

export default ReadMoreButton;

```

#### Update app/Article.tsx:

```
import React from "react";
import ReadMoreButton from "./ReadMoreButton";

type Props = {
  article: DataEntry;
};

function Article({ article }: Props) {
  return (
    <article className="bg-chalk/50 dark:bg-balticSea/50 flex flex-col rounded-lg shadow-sm hover:scale-105 hover:shadow-lg hover:bg-chalk dark:hover:bg-balticSea transition-all duration-200 ease-out">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="h-56 w-full object-cover rounded-t-lg shadow-md"
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold">{article.title}</h2>
          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-2">{article.description}</p>
          </section>
          <footer className="text-xs text-right ml-auto flex space-x-1 pt-5 italic text-gray-400">
            <p>{article.source}</p>
            <p>{article.published_at}</p>
          </footer>
        </div>
        <ReadMoreButton article={article} />
      </div>
    </article>
  );
}

export default Article;

```

#### Update styles/globals.css:

```
@import url("/fonts/poppins/stylesheet.css");
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .blur-spot {
    background: rgba(176, 105, 92, 0.9);
    border-radius: 50%;
    position: absolute;
    z-index: -9;
  }

  .hero-blur {
    width: 22rem;
    height: 30rem;
    left: 0rem;
  }

  .plan-blur-1 {
    width: 10rem;
    height: 10rem;
    top: 45rem;
    left: 0rem;
  }

  .plan-blur-2 {
    width: 10rem;
    height: 10rem;
    top: 5rem;
    right: 0rem;
  }
}

@layer components {
  .btn {
    @apply bg-balticSea dark:bg-chalk/80 text-white dark:text-balticSea px-4 lg:px-8 py-2 rounded-full cursor-pointer disabled:bg-balticSea/20 disabled:dark:bg-chalk/10;
  }
  .navLink {
    @apply text-center border-[1px] border-balticSea dark:border-ivory rounded-full px-4 py-2 mb-4 cursor-pointer hover:font-bold hover:border-clay dark:hover:border-clay  active:border-clay active:text-clay transition-transform duration-200 ease-out;
  }
  .headerTitle {
    @apply text-4xl capitalize px-10 pt-5 underline decoration-clay decoration-2 underline-offset-4 decoration-double;
  }
}

```

#### Create the article page:

Create app/article/page.tsx:

```
import React from "react";
import { notFound } from "next/navigation";
import Article from "../Article";

type Props = {
  searchParams?: DataEntry;
};

function ArticlePage({ searchParams }: Props) {
  if (
    (searchParams && Object.entries(searchParams).length === 0) ||
    !searchParams
  ) {
    return notFound();
  }
  const article: DataEntry = searchParams;
  return (
    <article>
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="h-50 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
          />
        )}
        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-2">
            {article.title}
          </h1>
          <div className="flex divide-x-2 space-x-4">
            <h2 className="font-bold">By: {article.author}</h2>
            <h2 className="font-bold pl-4">Source: {article.source}</h2>
            <p className="pl-4">{article.published_at}</p>
          </div>
          <p className="pt-4">{article.description}</p>
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;

```

## Implementing Search Functionality:

### Create app/search/page.tsx:

```
import React from "react";
import fetchNews from "../../utils/fetchNews";
import response from "../../response.json";
import NewsList from "../NewsList";

type Props = { searchParams?: { term: string } };

async function SearchPage({ searchParams }: Props) {
  // Fetch news data
  const news: NewsResponse = response || (await fetchNews("general", searchParams?.term, true));
 //   const news: NewsResponse = response;
  console.log(news);
  return (
    <div>
      <h1 className="headerTitle">Search Results for: {searchParams?.term}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default SearchPage;

```

## Implementing Dynamic Routing in NextJS 13:

### Create app/news/[category]/page.tsx:

```
import React from "react";
import fetchNews from "../../../utils/fetchNews";
import response from "../../../response.json";
import NewsList from "../../NewsList";
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

```

### Prebuild Category Pages:

You can pre-build the category pages at build time to avoid waiting for the data to load and use ISR rules.

#### Update app/news/[category]/page.tsx:

```
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

```

## Implementing Live Timestamp Functionality:

### Install [React-Timeago](https://www.npmjs.com/package/react-timeago):

```
npm i react-timeago
npm i --save-dev @types/react-timeago
```

### Create app/LiveTimestamp.tsx:

```
"use client";
import React from "react";
import TimeAgo from "react-timeago";
type Props = { timestamp: string };

function LiveTimestamp({ timestamp }: Props) {
  return <TimeAgo date={timestamp} />;
}

export default LiveTimestamp;


```

### Update app/Article.tsx:

```
import React from "react";
import LiveTimestamp from "./LiveTimestamp";
import ReadMoreButton from "./ReadMoreButton";

type Props = {
  article: DataEntry;
};

function Article({ article }: Props) {
  return (
    <article className="bg-chalk/50 dark:bg-balticSea/50 flex flex-col rounded-lg shadow-sm hover:scale-105 hover:shadow-lg hover:bg-chalk dark:hover:bg-balticSea transition-all duration-200 ease-out">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="h-56 w-full object-cover rounded-t-lg shadow-md"
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold">{article.title}</h2>
          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-2">{article.description}</p>
          </section>
          <footer className="text-xs text-right ml-auto flex space-x-1 pt-5 italic text-gray-400">
            <p>{article.source} -</p>
            {/* <p>{article.published_at}</p> */}
            <p><LiveTimestamp timestamp={article.published_at}/></p>
          </footer>
        </div>
        <ReadMoreButton article={article} />
      </div>
    </article>
  );
}

export default Article;

```

### Update app/article/page.tsx:

```
import React from "react";
import { notFound } from "next/navigation";
import Article from "../Article";
import LiveTimestamp from "../LiveTimestamp";

type Props = {
  searchParams?: DataEntry;
};

function ArticlePage({ searchParams }: Props) {
  if (
    (searchParams && Object.entries(searchParams).length === 0) ||
    !searchParams
  ) {
    return notFound();
  }
  const article: DataEntry = searchParams;
  return (
    <article>
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="h-50 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
          />
        )}
        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-2">
            {article.title}
          </h1>
          <div className="flex divide-x-2 space-x-4">
            <h2 className="font-bold">By: {article.author}</h2>
            <h2 className="font-bold pl-4">Source: {article.source}</h2>
            {/* <p className="pl-4">{article.published_at}</p> */}
            <p className="pl-4"><LiveTimestamp timestamp={article.published_at}/></p>
          </div>
          <p className="pt-4">{article.description}</p>
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;

```

## Add a Loading page:

### In app/loading.tsx:

```
import React from "react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="animate-pulse text-lg text-ivory text-center p-10">
      Loading New Feed...
    </div>
  );
}

export default loading;

```

### Update app/article/page.tsx:

```
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
  console.log({ news });
  //set timeout for 3 seconds to show loading
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="">
      <div className="blur-spot blur-[150px] plan-blur-1"></div>
      <div className="blur-spot blur-[150px] plan-blur-2"></div>
      <NewsList news={news} />
    </div>
  );
}

export default Home;

```

## Deply to Vercel:

```
vercel login
vercel
Setup and deploy: Y
valyndsilva
N
latest-new-app
Add env to vercel
vercel env pull
vercel build or npm run build
```
