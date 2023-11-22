import { createAsyncThunk } from '@reduxjs/toolkit';

const defaultMessage = {
  message: null,
};

const addProductCart = createAsyncThunk('CART_ADD_PRODUCT_CART', (p) => p);

const cleanMessage = createAsyncThunk('CLEAN_MESSAGE', () => defaultMessage);

export const cartActionThunk = {
  addProductCart,
  cleanMessage,
};
