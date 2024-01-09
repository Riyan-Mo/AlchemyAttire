import { createSlice } from "@reduxjs/toolkit";
import { item } from "../../types/items";
import itemService from "../../services/itemService";

const initialState = <item[]>[];

const itemReducer = createSlice({
    name: "item",
    initialState,
    reducers: {
        setItem(_state, action){
            return action.payload;
        }
    }
})

export const {setItem} = itemReducer.actions;

export const initializeitem = () =>{
    return async (dispatch: (arg0: { payload: unknown; type: "item/setItem"; }) => void) => {
        const response = await itemService.getItems();
        dispatch(setItem(response));
    }
}

export default itemReducer.reducer;