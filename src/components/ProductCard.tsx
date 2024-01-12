import { cartItem, item } from "../types/items"
import { Card, CardActionArea, CardContent, Button, Typography, CardMedia, Rating } from "@mui/material"
import { Link } from "react-router-dom"
import { addItemToCart, updateQuantity, deleteFromCart } from "../store/reducers/cartReducer"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import DeleteIcon from '@mui/icons-material/Delete';
import { ShoppingCart } from "@mui/icons-material"
import { ButtonGroup } from "@mui/material"

const ProductCard = ({item}: {item: item}) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state=>state.cart);
    const cartItem:cartItem = cart.find(c=>c.id===item.id)||{...item, ['count']: 0};

    const addToCart = (item:item) =>{
        dispatch(addItemToCart(item));
    }

    const changeQuantity = (change:number) => {
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

    return(
        <Card key={item.id} sx={{maxWidth: 300, display: "flex", flexDirection: "column"}} >
        <Link to={`/product/${item.id}`} style={{'textDecoration': "none", "color": "black"}}>
            <CardActionArea>
            
                <CardMedia
                component="img"
                image={`src/${item.image}`}
                alt={`${item.item_name}`}
                style={{maxHeight: 250}}
                />

                <CardContent>
                    
                    <Typography gutterBottom variant="h6" component="div">
                        {item.item_name}
                    </Typography>
                    
                    <div style={{"display": "grid", "gridAutoFlow": "column", "placeItems": "center", "textAlign": "center"}}>
                        <div>
                            <p>Rs.<em>{item.current_price}</em> {item.original_price!==item.current_price && <del>{item.original_price}</del>}
                            </p>
                        </div>
                        <div style={{"display": "flex", "alignItems": "center", "justifyContent": "space-around"}}>
                            <Rating value={item.rating.stars} readOnly/>
                            <p>({item.rating.count})</p>
                        </div>
                    </div>
                    
                </CardContent>
            
            </CardActionArea>
        </Link>
        
        {cartItem.count===0?
        (cartItem.delivery_date?<Button onClick={()=>addToCart(item)} color="success" variant="contained" startIcon={<ShoppingCart/>}>
            Add
        </Button>:<p style={{margin: "auto", padding: "5px", color: "red"}}>Out of Stock</p>
        )
        :<div style={{"display": "grid", "gridAutoFlow": "row"}}>
        <ButtonGroup variant="outlined" color="inherit" style={{"display": "grid", "gridAutoFlow": "column"}}>
            <Button onClick={()=>changeQuantity(-1)}>-</Button>
            <Button>{cartItem.count}</Button>
            <Button onClick={()=>changeQuantity(+1)}>+</Button>
        </ButtonGroup>

        <Button onClick={()=>handleRemove(cartItem)} color="error" variant="contained" startIcon={<DeleteIcon/>}>
            Remove
        </Button>
        </div>
        }

        </Card>
    )
}

export default ProductCard;