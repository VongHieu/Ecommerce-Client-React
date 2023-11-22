import { createSlice } from '@reduxjs/toolkit';
import { cartActionThunk } from '../actions/cart-action';

const { addProductCart, cleanMessage } = cartActionThunk;
const successMessage = 'Thêm vào giỏ hàng thành công!';
const errorMessage = 'Có lỗi khi thêm!';
const existedMessage = 'Sản phẩm đã được thêm vào giỏ hàng!';

const cartSlice = createSlice({
  name: 'CART',
  initialState: {
    cart: [],
    count: 0,
    totalAmount: 0,
    loading: false,
    message: null,
    success: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductCart.pending, (state) => ({
        ...state,
        loading: true,
        success: false,
        error: false,
        message: null,
      }))
      .addCase(addProductCart.fulfilled, (state, action) => {
        const { id } = action.payload;
        const { cart } = state;
        const data = cart.find((item) => item.id === id);
        if (!data)
          return {
            ...state,
            loading: false,
            cart: [...state.cart, action.payload],
            count: [...state.cart, action.payload].length,
            totalAmount: [...state.cart, action.payload].reduce(
              (acc, cur) => acc + (cur.discount > 0 ? cur.price_sale : cur.price),
              0
            ),
            message: successMessage,
            success: true,
          };
        return {
          ...state,
          loading: false,
          cart: state.cart,
          count: state.count,
          totalAmount: state.totalAmount,
          success: true,
          message: existedMessage,
        };
      })
      .addCase(addProductCart.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
        message: errorMessage,
        success: false,
      }))
      .addCase(cleanMessage.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(cleanMessage.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        message: action.payload.message,
      }));
  },
});

export default cartSlice.reducer;
