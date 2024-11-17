import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Article from "../types/Article";

// הגדרת מצב התחלתי
interface NewsState {
  articles: Article[]; // מערך של מאמרים
  totalArticles: number; // מספר המאמרים הכללי
  status: "idle" | "loading" | "succeeded" | "failed"; // סטטוס הטעינה
}

const initialState: NewsState = {
  articles: [],
  totalArticles: 0,
  status: "idle",
};

// יצירת פעולה אסינכרונית באמצעות createAsyncThunk
export const fetchNews = createAsyncThunk<NewsState, string>(
  "news/fetchNews", // סוג הפעולה
  async (url: string, thunkAPI) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data; // מחזיר את הנתונים
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
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
        state.status = "succeeded"; // שינוי סטטוס אם הצליח
        state.articles = action.payload.articles; // עדכון המאמרים
        state.totalArticles = action.payload.totalArticles; // עדכון מספר המאמרים
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed"; // שינוי סטטוס אם נכשל
      });
  },
});

export default newsSlice.reducer;
