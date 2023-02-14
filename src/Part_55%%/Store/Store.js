import { configureStore,  } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {apiSlice} from './apiSlice';

const Store = configureStore({
    reducer: {
       
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
    middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
setupListeners(Store.dispatch)
export default Store;