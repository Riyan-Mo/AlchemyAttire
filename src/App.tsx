import Cart from "./components/Cart"
import Home from "./components/Home"
import Product from "./components/Product"
import Search from "./components/Search"
import Wishlist from "./components/Wishlist"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>       
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
    </div>
  )
}

export default App
