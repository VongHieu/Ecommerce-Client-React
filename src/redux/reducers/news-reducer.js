import { createSlice } from '@reduxjs/toolkit';
import { newsActionThunk } from '../actions/news-action';

const { getAllNewsPaging } = newsActionThunk;
const newsSlice = createSlice({
  name: 'NEWS',
  initialState: {
    news: [],
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNewsPaging.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllNewsPaging.fulfilled, (state, action) => {
        const { has_previous, has_next, current_page, page_size, total_count, total_pages, items } = action.payload;
        return {
          ...state,
          loading: false,
          news: items,
          has_previous,
          has_next,
          current_page,
          page_size,
          total_count,
          total_pages,
          success: true,
        };
      });
  },
});

export default newsSlice.reducer;
