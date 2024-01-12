import Cart from "./components/Cart"
import Home from "./components/Home"
import Product from "./components/Product"
import Search from "./components/Search"
import { Route, Routes } from "react-router-dom"
import { Container } from "@mui/material"
import { useEffect } from "react"
import { useAppDispatch } from "./hooks/hooks"
import { initializeCart } from "./store/reducers/cartReducer"
import { initializeitem } from "./store/reducers/itemReducer"
import Navbar from "./components/Navbar"

function App(){
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(initializeCart())
  }, [])

  useEffect(()=>{
    dispatch(initializeitem());
  }, [])

  return (
    <Container sx={{display:"grid", gap: "1rem"}}>

      <Navbar/>
    
      <div>       
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/search/:query" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product" element={<h1>No id specified</h1>}/>
      </Routes>
    </div>

    </Container>
  )
}

export default App
