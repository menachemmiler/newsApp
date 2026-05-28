import axios from "axios";

// הגדרת הטיפוסים של הנתונים החוזרים מ-GNews
export interface Article {
  id?: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image?: string;
  publishedAt: string;
}

export interface GNewsResponse {
  articles: Article[];
  totalArticles: number;
}

export const fetchTopHeadlines = async (
  country?: string,
  category?: string,
): Promise<GNewsResponse> => {
  const apiKey = process.env.GNEWS_API_KEY;
  const baseUrl = "https://gnews.io/api/v4/top-headlines";

  if (!apiKey) {
    throw new Error("API Key is missing in environment variables");
  }

  const response = await axios.get<GNewsResponse>(baseUrl, {
    params: {
      country: country || "il",
      category: category || "general",
      max: 10,
      apikey: apiKey,
    },
  });

  return response.data;
};
