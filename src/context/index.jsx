//create the context
//provide the state to context
//wrap the context in root component
//consume the context using useContext

import { createContext, useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

// Create the context
export const ShoppingCartContext = createContext(null);

// Create the provider component
export function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetail,setProductDetail] = useState(null);
  const [cartItems,setCartItem] = useState([]);
  const navigate = useNavigate();
  // Fetch list of products from the API
  async function fetchListOfProducts() {
    setLoading(true);  // Start loading
    try {
      const apiResponse = await fetch("https://dummyjson.com/products");
      const result = await apiResponse.json();
      
      if (result) {
        setListOfProducts(result.products)
      } else {
        console.error("Products not found in API response");
      }
    } catch (err) {
      console.log("Error fetching products:", err);
    } finally {
      setLoading(false);  // Stop loading
    }
  }

  useEffect(() => {
    fetchListOfProducts();
    setCartItem(JSON.parse(localStorage.getItem('cartItems')))
  }, []);
  
  function handleAddtoCart(productDetail){
    // console.log(productDetail)
    //check if current item is already added in cart or not 
    let cpycurrentcart = [...cartItems];
    const findcurrentIndex = cpycurrentcart.findIndex(item => item.id === productDetail.id);
    //if findcurretIndex = -1 then the product is not there

    if(findcurrentIndex === -1) {
      cpycurrentcart.push({
        ...productDetail,
        quantity : 1,
        totalPrice : productDetail.price
      })
    }else{
      cpycurrentcart[findcurrentIndex] = {
            ...cpycurrentcart[findcurrentIndex],
            quantity : cpycurrentcart[findcurrentIndex].quantity + 1,
            totalPrice : ((cpycurrentcart[findcurrentIndex].quantity + 1) * cpycurrentcart[findcurrentIndex].price).toFixed(2)
          }
    }

    
    // console.log(cpycurrentcart)
    setCartItem(cpycurrentcart)
    localStorage.setItem("cartItems", JSON.stringify(cpycurrentcart));

    navigate('/cart-items');
  }

  function handleRemoveFromCart(productDetail,removeAll){
    let cpyExistingCart = [...cartItems];
    let productIndex = cpyExistingCart.findIndex(item => item.id === productDetail.id)
    if(removeAll || productDetail.quantity === 1){
      cpyExistingCart.splice(productIndex,1);
    }else{
      cpyExistingCart[productIndex] = {
        ...cpyExistingCart[productIndex],
        quantity : cpyExistingCart[productIndex].quantity - 1,
        totalPrice : ((cpyExistingCart[productIndex].quantity - 1) * cpyExistingCart[productIndex].price).toFixed(2)
      }
    }

    localStorage.setItem("cartItems",JSON.stringify(cpyExistingCart));
    setCartItem(cpyExistingCart);
  }



  return (
    <ShoppingCartContext.Provider value={{ loading, listOfProducts,setLoading,productDetail,setProductDetail,cartItems,setCartItem,handleAddtoCart,handleRemoveFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
