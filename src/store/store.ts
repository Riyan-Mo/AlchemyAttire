import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./reducers/wishlistReducer";

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;