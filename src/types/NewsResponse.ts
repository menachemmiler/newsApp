import Article from "./Article";

export default interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}
