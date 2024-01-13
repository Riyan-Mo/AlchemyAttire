import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { initializeitem } from "../store/reducers/itemReducer";
import { Rating } from "@mui/material";
import {Button, ButtonGroup} from "@mui/material";
import { initializeCart } from "../store/reducers/cartReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingCart } from "@mui/icons-material";
import { addItemToCart, deleteFromCart, updateQuantity } from "../store/reducers/cartReducer";
import { item, cartItem } from "../types/items";

const Product = () => {
    const id = useParams().id;
    const dispatch = useAppDispatch()
    const items = useAppSelector(state=>state.item)
    const cart:cartItem[] = useAppSelector(state=>state.cart);

    useEffect(()=>{
        dispatch(initializeitem());
    }, [])
    
    useEffect(()=>{
        dispatch(initializeCart());
    }, [])

    const addToCart = (item:item) =>{
        dispatch(addItemToCart(item));
    }

    const changeQuantity = (change:number, cartItem: cartItem) => {
        if(change===-1 && cartItem.count===1){
            dispatch(deleteFromCart(cartItem));
        }
        else{
            dispatch(updateQuantity(cartItem, change));
        }
    }

    const handleRemove = (cartItem: cartItem) =>{
        dispatch(deleteFromCart(cartItem));
    }

    if(items.length===0||!cart){
        return <h1 style={{textAlign: "center"}}>Loading...</h1>
    }

    const item = items.find(i=>Number(i.id)===Number(id));
    if(!item){
        return;
    }
    const cartItem:cartItem = cart.find(c=>Number(c.id)===Number(id))||{...item, ['count']: 0};
    const randomItems = [];
    const randomNumber = Math.floor(Math.random() * 3);
    for(let i = 0; i<3; i++){
        if(Number(items[randomNumber+i].id) !== Number(id)){
            randomItems[i] = items[randomNumber+i];
        }
    }

    const sideBarItemStyle:React.CSSProperties = {display: "flex", justifyContent: "space-around", border: "1px lightgrey solid", alignItems: "center", padding: "1rem", borderRadius: "10px", gap: "1rem", textDecoration: "none", color: "black", flexDirection: "row"};
    
    if(!item || !cartItem){
        return;
    }

    return(
        <div style={{display:"grid", gridTemplateColumns: "2fr 1fr"}}>
            <div style={{display: "grid", padding: "20px"}}>
                <img src={`../src/${item?.image}`} alt="Couldn't find" style={{justifySelf: "center"}}/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
                    <h2>{item?.item_name}</h2>
                    <p style={{color: "red"}}>Rs.{item?.current_price} {item?.original_price!==item?.current_price?
                    <del style={{color: "black"}}>{item?.original_price}</del>
                    :""}
                    </p>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "-30px"}}>
                    <em>{item?.company}</em>
                    <p>Discount: <span style={{color: "red"}}>{item?.discount_percentage}%</span></p>
                </div>
                <div>
                    <div style={{display: "flex", alignItems: "center"}}><Rating value={item?.rating.stars} readOnly/>({item?.rating.stars})</div>
                </div>
                <div>
                {cartItem?.count===0?
                (cartItem?.delivery_date?
                <Button onClick={()=>addToCart(item)} color="success" variant="contained" startIcon={<ShoppingCart/>}>
                Add
                </Button>:<p style={{margin: "auto", padding: "5px", color: "red"}}>Out of Stock</p>
                )
                :<div style={{"display": "grid", "gridAutoFlow": "row"}}>
                     <ButtonGroup variant="outlined" color="inherit" style={{"display": "grid", "gridAutoFlow": "column"}}>
                        <Button onClick={()=>changeQuantity(-1, cartItem)}>-</Button>
                        <Button>{cartItem?.count}</Button>
                        <Button onClick={()=>changeQuantity(+1, cartItem)}>+</Button>
                    </ButtonGroup>
                    <Button onClick={()=>handleRemove(cartItem)} color="error" variant="contained" startIcon={<DeleteIcon/>}>
                        Remove
                    </Button>
                </div>}
                </div>
                <div>
                <p>Deliver by: {item?.delivery_date}</p>
                </div>
                <div>
                    <p>Return period: {item?.return_period} days</p>
                </div>
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
                <h4>Suggested for you</h4>
                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                {randomItems.map(rItem=>{
                    return(
                        <Link 
                        to={`/product/${rItem.id}`} 
                        key={rItem.id} 
                        style={sideBarItemStyle}>
                            <img src={`../src/${rItem.image}`} alt={rItem.item_name} style={{maxWidth: "3rem", maxHeight: "4rem", borderRadius: "4px", objectFit: "cover"}}/>
                            <p>{rItem.item_name}</p>
                            <p>Rs.{rItem.current_price}</p>
                        </Link>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Product