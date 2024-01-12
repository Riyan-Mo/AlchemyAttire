import { useAppDispatch } from "../hooks/hooks";
import { useAppSelector } from "../hooks/hooks";
import { Paper, TableContainer, Table, TableRow, TableCell } from "@mui/material";
import { deleteFromCart, updateQuantity } from "../store/reducers/cartReducer";
import { cartItem } from "../types/items";
import {Button, ButtonGroup} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const Cart = () => {
    const cart = useAppSelector(state=>state.cart);
    const dispatch = useAppDispatch();

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

    const totalWithoutDiscount = cart.reduce((prev, curr)=>prev+=(curr.original_price*curr.count),0)
    const totalDiscount = cart.reduce((prev, curr)=>prev+=(((curr.discount_percentage/100) * curr.original_price)*curr.count),0)
    const totalBill = cart.reduce((prev, curr)=>prev+=(curr.current_price*curr.count),0)

    if(cart.length>0){
    return(
        <div style={{display: "flex", flexDirection:"column", gap: "1rem"}}>
            <h1 style={{textAlign: "center", color: "#1976d2"}}>Cart</h1>
            <Paper sx={{width: '100%'}}>
            <TableContainer>
            <Table>
            {cart.map(cartItem => {
                return(    
                            <TableRow sx={{display: 'flex', justifyContent: "space-around", alignItems: "center", border: "1px solid grey"}}>
                                <TableCell>
                                    <Link to={`/product/${cartItem.id}`}>
                                    <img src={`../src/${cartItem.image}`} alt={`src/${cartItem.item_name}`} style={{maxWidth: "8vw"}}/>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/product/${cartItem.id}`} style={{textDecoration: "none", color: "black"}}>
                                    <p>{cartItem.item_name}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {cartItem.original_price===cartItem.current_price?
                                    <p>Rs.{cartItem.current_price}</p>:
                                    <p>Rs.{cartItem.current_price} <del>{cartItem.original_price}</del></p>
                                    }
                                </TableCell>
                                <TableCell>
                                    <p>Discount: {cartItem.discount_percentage}%</p>
                                </TableCell>
                                <TableCell>
                                    <p>Get by: {cartItem.delivery_date}</p>
                                </TableCell>
                                <TableCell sx={{"display": "grid", "gridAutoFlow": "row", gap: "1rem"}}>
                                 <ButtonGroup variant="outlined" color="inherit" style={{"display": "grid", "gridAutoFlow": "column"}}>
                                    <Button onClick={()=>changeQuantity(-1, cartItem)}>-</Button>
                                    <Button>{cartItem.count}</Button>
                                    <Button onClick={()=>changeQuantity(+1, cartItem)}>+</Button>
                                </ButtonGroup>
                                <Button onClick={()=>handleRemove(cartItem)} color="error" variant="contained" startIcon={<DeleteIcon/>}>
                                    Remove
                                </Button>
                                </TableCell>
                                <TableCell>
                                    <h3>Total:Rs.{cartItem.count*cartItem.current_price}</h3>
                                </TableCell>
                            </TableRow>
                        )})}
             </Table>
            </TableContainer>
            </Paper>
            <table style={{border: "1px grey solid", textAlign: "center", fontFamily: "monospace", fontSize: "x-large", padding: "1rem"}}>
                <tr>
                    <td>Total</td>
                    <td>{totalWithoutDiscount}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td style={{color: "red"}}>{totalDiscount}</td>
                </tr>
                <tr>
                    <td>To Pay</td>
                    <td style={{color: "green"}}>{totalBill}</td>
                </tr>
            </table>
        </div>
    )}
    else{
        return(
            <div>
            <h2 style={{fontSize: "2rem", textAlign: "center", marginTop: "6rem"}}>Cart is empty</h2>
            <h2 style={{textAlign: "center"}}><Link to="/">Home</Link></h2>
            </div>
        )
    }
}

export default Cart;