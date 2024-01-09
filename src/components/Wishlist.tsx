import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { initializeWishlist } from "../store/reducers/wishlistReducer";

const Wishlist = () => {
    const dispatch = useAppDispatch();
    const wishlist = useAppSelector(state=>state.wishlist);

    useEffect(()=>{
        dispatch(initializeWishlist());
    })

    return(
        <h2>WishList</h2>
    )
}
export default Wishlist;