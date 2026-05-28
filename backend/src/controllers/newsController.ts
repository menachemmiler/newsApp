import { Request, Response } from "express";
import * as gnewsService from "../services/gnewsService";

// הגדרת הטיפוס של ה-Query Parameters הצפויים
interface NewsQuery {
  country?: string;
  category?: string;
}

export const getNews = async (
  req: Request<{}, {}, {}, NewsQuery>,
  res: Response,
): Promise<Response> => {
  try {
    const { country, category } = req.query;

    // קריאה לשירות לקבלת הנתונים המוטפסים
    const newsData = await gnewsService.fetchTopHeadlines(country, category);

    return res.status(200).json(newsData);
  } catch (error: any) {
    console.error("Error in getNews controller:", error.message);

    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.errors?.[0] || "Internal Server Error";

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};
