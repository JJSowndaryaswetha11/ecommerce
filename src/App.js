

import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Nav from './Components/Nav'
import Footer from './Components/Footer';
import { useState } from 'react';
import Homeproduct from './Pages/HomeProduct';


function App() {
  const [cart,setCart]= useState([]);
  const [shop,setShop]= useState(Homeproduct);
  const [search,setSearch]=useState('')
  const Filter = (x)=> {
    const catefilter= Homeproduct.filter((product)=> {
      return product.cat === x
    })
    setShop(catefilter)
  }
  const allcatefilter =()=> {
    setShop(Homeproduct)
  }
  const searchlength = (search || []).length === 0
  const searchproduct = () =>
  {
  if(searchlength)
  {
    alert("Please Search Something !")
    setShop(Homeproduct)
  }
  else
  {
    
      const searchfilter = Homeproduct.filter((x) => 
      {
        return x.cat === search
      })
      setShop(searchfilter)
  }
}
//Add To cart
const addtocart = (product) =>
{
  const exist = cart.find((x) => {
    return x.id === product.id
  })
  if(exist)
  {
    alert("This product is already added in cart")
  }
  else
  {
    setCart([...cart, {...product, qty:1}])
    alert("Added To cart")
  }
}
 console.log(cart)

  
  return (
   <BrowserRouter>
   <Navbar search={search} setSearch={setSearch} searchproduct={searchproduct}/>
   
   <Nav shop={shop} Filter={Filter} allcatefilter={allcatefilter}  addtocart={addtocart} cart={cart}setCart={setCart}/>
   <Footer/>
   </BrowserRouter>
  );
}

export default App;
