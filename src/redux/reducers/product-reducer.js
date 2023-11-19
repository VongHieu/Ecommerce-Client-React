import { createSlice } from '@reduxjs/toolkit';
import { productAsyncThunk } from '../actions/product-action';

const { getProductByProductCategory, getAllProduct } = productAsyncThunk;

const productSlice = createSlice({
  name: 'PRODUCT',
  initialState: {
    products: [],
    loading: false,
    message: '',
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductByProductCategory.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getProductByProductCategory.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        products: action.payload,
      }))
      .addCase(getProductByProductCategory.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
        message: action.error?.message,
      }))
      .addCase(getAllProduct.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllProduct.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        products: action.payload,
      }))
      .addCase(getAllProduct.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
        message: action.error?.message,
      }));
  },
});
export default productSlice.reducer;
