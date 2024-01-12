import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import itemReducer from "./reducers/itemReducer";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        item: itemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;