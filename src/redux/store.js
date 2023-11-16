import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categorySliceReducer from './reducers/category-reducer';
import sliderReducer from './reducers/slider-reducer';

const rootReducer = combineReducers({
  categories: categorySliceReducer,
  slides: sliderReducer,
});

const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export { store };
