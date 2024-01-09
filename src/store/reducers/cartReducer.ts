import { createSlice } from "@reduxjs/toolkit";
import { item } from "../../types/items";
import itemService from "../../services/itemService";

const initialState = <item[]>[];

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(_state, action){
            return action.payload;
        },
        addItem(state, action){
            const item = action.payload;
            return {...state, item};
        }
    }
})

export const {setCart, addItem} = cartReducer.actions;

export const initializecart = () =>{
    return async (dispatch: (arg0: { payload: unknown; type: "cart/setCart"; }) => void) => {
        const response = await itemService.getCart();
        dispatch(setCart(response));
    }
}

export default cartReducer.reducer;