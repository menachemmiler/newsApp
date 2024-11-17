import { useEffect } from "react";
import {  useSelector } from "react-redux";
import {  RootState, useAppDispatch } from "../store/store";
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
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();//שימוש מקובל יותר על ידי שימוש במשתנש שכולל את הטייפ

  // הפעלת הפעולה fetchNews פעם אחת כשמרכיב הקומפוננטה נטען
  useEffect(() => {
    dispatch(
      fetchNews(
        `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=10&apikey=${
          key || "ea4293c6a0d12abb7f161d1889f3bc72"
        }`
      )
    );
  }, [country, category]); // תלות ב-`dispatch` בלבד

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
          <p>
            {article.content}
            {article.content.includes('...') && (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                קרא עוד
              </a>
            )}
          </p>
          <img src={article.image} alt="news" />
          <p>{article.publishedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default TryNews;
