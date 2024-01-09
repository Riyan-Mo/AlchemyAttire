import { createSlice } from "@reduxjs/toolkit";
import { item } from "../../types/items";
import itemService from "../../services/itemService";

const initialState = <item[]>[];

const wishlistReducer = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishList(_state, action){
            return action.payload;
        },
        addItem(state, action){
            const item = action.payload;
            return {...state, item};
        }
    }
})

export const {setWishList, addItem} = wishlistReducer.actions;

export const initializeWishlist = () =>{
    return async (dispatch: (arg0: { payload: unknown; type: "wishlist/setWishList"; }) => void) => {
        const response = await itemService.getWishlist();
        dispatch(setWishList(response));
    }
}

export default wishlistReducer.reducer;