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

interface NewsResponse {
  pagination: Pagination;
  data: DataEntry[];
}
