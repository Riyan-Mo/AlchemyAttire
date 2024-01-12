import { useAppSelector } from "../hooks/hooks";
import "../styles/index.css";
import ProductCard from "./ProductCard";

const Home = () => {
    const items = useAppSelector(state=>state.item);
    
    return(
        <div className="productDisplay">
            {items.map(item=><ProductCard item={item} key={item.id}/>)}
        </div>
    )
}

export default Home;