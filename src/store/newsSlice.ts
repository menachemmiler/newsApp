// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import NewsResponse from "../types/NewsResponse";
// import Article from "../types/Article";

// interface NewsState {
//   articles: Article[]; // מערך של מאמרים (כתבות חדשות)
//   totalArticles: number; // סך הכל מאמרים (משמש לעקוב אחרי כמות המאמרים הכוללת)
//   status:  "idle" | "loading" | "failed"; // סטטוס טעינת הנתונים
// }

// const initialState: NewsState = {
//   articles: [],
//   totalArticles: 0,
//   status: "idle",
// };

// const newsSlice = createSlice({
//   name: "news", // שם ה-Slice (כלומר, החלק ב-Store שהוא מטפל בו)
//   initialState, // המצב ההתחלתי (שהגדרנו למעלה)
//   reducers: {
//     // updateState: (state, url: PayloadAction<string>) => {
//     updateState: (state) => {
//       let tryUrl =
//         "https://gnews.io/api/v4/top-headlines?country=il&max=10&apikey=ea4293c6a0d12abb7f161d1889f3bc72";
//       const asyncTry = async () => {
//         const response = await fetch(tryUrl);
//         console.log({ response });
//         if (response.status !== 200) {
//           state.status = "failed";
//           return;
//         }
//         const toJson = await response.json();
//         console.log({ toJson });
//         state =  {
//           articles: toJson.articles,
//           totalArticles: toJson.totalArticles,
//           status: "idle",
//         };
//       };
//       asyncTry();
//     },
//   }, // מקום לפעולות סינכרוניות (אין לנו כרגע כאלו)
// });

// export default newsSlice.reducer;
// export const { updateState } = newsSlice.actions;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Article from "../types/Article";

// הגדרת מצב התחלתי
interface NewsState {
  articles: Article[]; // מערך של מאמרים
  totalArticles: number; // מספר המאמרים הכללי
  status: "idle" | "loading" | "failed"; // סטטוס הטעינה
}

const initialState: NewsState = {
  articles: [],
  totalArticles: 0,
  status: "idle",
};

// יצירת פעולה אסינכרונית באמצעות createAsyncThunk
export const fetchNews = createAsyncThunk(
  "news/fetchNews", // סוג הפעולה
  async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    return data; // מחזיר את הנתונים
  }
);

const newsSlice = createSlice({
  name: "news", // שם ה-slice
  initialState, // המצב ההתחלתי
  reducers: {}, // לא צריך reducers נוספים כרגע
  // טיפול אוטומטי במצבים השונים של הפעולה האסינכרונית
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading"; // שינוי סטטוס בעת טעינה
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "idle"; // שינוי סטטוס אם הצליח
        state.articles = action.payload.articles; // עדכון המאמרים
        state.totalArticles = action.payload.totalArticles; // עדכון מספר המאמרים
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed"; // שינוי סטטוס אם נכשל
      });
  },
});

export default newsSlice.reducer;
