import { createAsyncThunk } from '@reduxjs/toolkit';

const defaultMessage = {
  message: null,
};

const addProductCart = createAsyncThunk('CART_ADD_PRODUCT_CART', (p) => p);

const cleanMessage = createAsyncThunk('CLEAN_MESSAGE', () => defaultMessage);

const addQuantityProductCart = createAsyncThunk('ADD_QUANTITY_PRODUCT_CART', (p) => p);

const removeProductToCart = createAsyncThunk('REMOVE_CART_PRODUCT_CART', (p) => p);

export const cartActionThunk = {
  addProductCart,
  cleanMessage,
  addQuantityProductCart,
  removeProductToCart,
};
