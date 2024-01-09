import axios from "axios";
import { item } from "../types/items";

const baseUrl = "http://localhost:3001"
const itemUrl =  `${baseUrl}/items`
const wishlistUrl = `${baseUrl}/wishlist`
const cartUrl = `${baseUrl}/cart`

const getItems = async() => {
    const {data} = await axios.get<Array<item>>(itemUrl);
    return data;
}

const getWishlist = async() => {
    const {data} = await axios.get<Array<item>>(wishlistUrl);
    return data;
}

const getCart = async() => {
    const {data} = await axios.get<Array<item>>(cartUrl);
    return data;
}

export default {
    getItems,
    getWishlist,
    getCart
}