import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { item } from "../types/items";
import { Paper, TableContainer, Table, TableRow, TableCell } from "@mui/material";

const Search = () => {
    const product = useAppSelector(state=>state.item)
    const query = useParams().query?.toLowerCase() || " ";

    const filterFunction = (item:item) => {
            const name = item.item_name.toLowerCase();
            const company = item.company.toLowerCase();
            return company.includes(query) || name.includes(query);
    }

    const filteredProduct = product.filter((item)=>filterFunction(item))
    if(filteredProduct.length>0){
    return(
        <Paper sx={{width: '100%'}}>
            <TableContainer>
            <Table>
            {filteredProduct.map(product=>{
            return(
                    <Link key={product.id} to={`/product/${product.id}`} style={{textDecoration: "none", color: "black"}}>
                    <TableRow sx={{display: 'flex', justifyContent: "space-around", alignItems: "center", border: "1px solid grey"}}>
                        <TableCell>
                            <img src={`../src/${product.image}`} alt={`src/${product.item_name}`} style={{maxWidth: "8vw"}}/>
                        </TableCell>
                        <TableCell>
                            <p>{product.item_name}</p>
                        </TableCell>
                        <TableCell>
                            <p>Rs.{product.current_price}</p>
                        </TableCell>
                        <TableCell>
                        {(product.delivery_date && <p>Get by: {product.delivery_date}</p>) || <p>Out Of Stock</p>}
                        </TableCell>
                    </TableRow>
                    </Link>
                )})}
                </Table>
            </TableContainer>
        </Paper>
    )}
    else{
        return(
            <div style={{display: "grid", placeItems: "center", marginTop: "4rem"}}>
                <h2 style={{color: "red"}}>
                    Couldn't find the product. Make sure to check the spelling.
                </h2>
            </div>
        )
    }
}

export default Search;