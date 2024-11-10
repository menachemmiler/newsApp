import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchNews } from "../store/newsSlice";

interface Props {
  category: string;
  country: string;
  key: string;
}

const TryNews = ({ country, category, key }: Props) => {
  const { articles, status, totalArticles } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useDispatch<AppDispatch>();

  // הפעלת הפעולה fetchNews פעם אחת כשמרכיב הקומפוננטה נטען
  useEffect(() => {
    dispatch(
      fetchNews(
        `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=10&apikey=${
          key || "ea4293c6a0d12abb7f161d1889f3bc72"
        }`
      )
    );
  }, [dispatch, country, category]); // תלות ב-`dispatch` בלבד

  // הדפס את הנתונים עבור debugging
  useEffect(() => {
    console.log({ articles, status, totalArticles });
  }, [articles, status, totalArticles]);

  // תצוגת טעינה
  if (status === "loading") return <p>Loading...</p>;
  // תצוגת שגיאה
  if (status === "failed") return <p>Failed to load news.</p>;

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <div className="news" key={index}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <p>{article.content}</p>
          <img src={article.image} alt="news" />
          <p>{article.publishedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default TryNews;
