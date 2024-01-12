import { createSlice } from "@reduxjs/toolkit";
import { cartItem, item } from "../../types/items";
import itemService from "../../services/itemService";

const initialState = <cartItem[]>[];

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(_state, action){
            return action.payload;
        },
        addItem(state, action){
            const item = action.payload;
            state.push(item);
        },
        updateItem(state, action){
            const item = action.payload;
            const itemIndex = state.findIndex((i)=>item.id===i.id);
            const isPresent = itemIndex>-1;
            if(isPresent){
                state[itemIndex] = item;
            }
        },
        removeItem(state, action){
            const item:cartItem = action.payload;
            const newState = state.filter(i=>i.id!==item.id);
            return newState;
        }
    }
})

export const {setCart, addItem, updateItem, removeItem} = cartReducer.actions;

export const initializeCart = () =>{
    return async dispatch => {
        const response = await itemService.getCart();
        dispatch(setCart(response));
    }
}

export const addItemToCart = (item:item) => {
    return async dispatch => {
        const cartItem:cartItem = {...item, ['count']: 1};
        const response = await itemService.addToCart(cartItem);
        dispatch(addItem(response));
    }
}

export const updateQuantity = (item:cartItem, change:number) =>{
    return async dispatch => {
        const cartItem:cartItem = {...item, ['count']: item.count+change}
        const response = await itemService.updateCount(cartItem);
        dispatch(updateItem(response));
    }
}

export const deleteFromCart = (cartItem: cartItem) => {
    return async dispatch => {
        const response = await itemService.removeCartItem(cartItem.id);
        dispatch(removeItem(response));
    }
}

export default cartReducer.reducer;