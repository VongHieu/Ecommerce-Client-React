import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categorySliceReducer from './reducers/category-reducer';
import sliderReducer from './reducers/slider-reducer';
import productCategoryReducer from './reducers/product-category-reducer';
import productReducer from './reducers/product-reducer';

const rootReducer = combineReducers({
  categories: categorySliceReducer,
  slides: sliderReducer,
  productCategories: productCategoryReducer,
  products: productReducer,
});

const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export { store };
