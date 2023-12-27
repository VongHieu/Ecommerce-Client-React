import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsService } from 'src/services/news-servive';
import { responseHeaders } from 'src/utils/const';

const getAllNewsPaging = createAsyncThunk('NEWS_GET_PAGING_NEWS', async (p) => {
  const response = await newsService.getAllNews(p);
  const dataPanigation = JSON.parse(response.headers[responseHeaders.panigation]);
  return { items: response.data, ...dataPanigation };
});

export const newsActionThunk = {
  getAllNewsPaging,
};
