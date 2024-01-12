import axios from "axios";
import { item, cartItem } from "../types/items";

const baseUrl = "http://localhost:3001"
const itemUrl =  `${baseUrl}/items`
const favouriteUrl = `${baseUrl}/favourite`
const cartUrl = `${baseUrl}/cart`

const getItems = async() => {
    const {data} = await axios.get<Array<item>>(itemUrl);
    return data;
}

const getFavourite = async() => {
    const {data} = await axios.get<Array<item>>(favouriteUrl);
    return data;
}

const getCart = async() => {
    const {data} = await axios.get<Array<cartItem>>(cartUrl);
    return data;
}

const addToCart = async(product:cartItem) =>{
    const {data} = await axios.post<cartItem>(`${cartUrl}`, product);
    return data; 
}

const updateCount = async (product:cartItem) => {
    const {data} = await axios.put<cartItem>(`${cartUrl}/${product.id}`, product);
    return data;
}

const removeCartItem = async(cartItemId: cartItem['id']) => {
    const {data} = await axios.delete<cartItem>(`${cartUrl}/${cartItemId}`);
    return data;
}

export default {
    getItems,
    getFavourite,
    getCart,
    addToCart,
    updateCount,
    removeCartItem,
}