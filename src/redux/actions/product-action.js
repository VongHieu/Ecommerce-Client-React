import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from 'src/services/product-service';

const getProductByProductCategory = createAsyncThunk(
  'PRODUCTS_GET_BY_PRODUCT_CATEORY_PRODUCTS',
  async () => {
    const { data } = await productService.getProductByProductCategory();
    return data;
  }
);
const getAllProduct = createAsyncThunk('PRODUCT_GET_ALL_PRODUCTS', async () => {
  const { data } = await productService.getAllProduct();
  return data;
});

export const productAsyncThunk = {
  getProductByProductCategory,
  getAllProduct,
};
