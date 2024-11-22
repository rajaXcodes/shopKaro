import { Fragment } from 'react'
import {Routes,Route, useRoutes} from 'react-router-dom'
import ProductList from './pages/productList'
import CartList from './pages/cartList'
import ProductDetails from './pages/productDetails'
import Home from './pages/home'
import Navbar from '../src/components/Navbar/index.jsx'
function Customroutes(){
  const element = useRoutes([
    {
      path : '',
      element : <Home/>
    },
    {
      path : 'product-list',
      element : <ProductList/>
    },
    {
      path : 'product-details/:id',
      element : <ProductDetails/>
    },
    {
      path : 'cart-items',
      element : <CartList/>
    },

  ]);
  return element

}
function App() {

  return <Fragment>
    <Navbar />
    {/* <Routes>
    <Route path='product-list' element={<ProductList/>} />
    <Route path='product-list' element={</>} />
    <Route path='product-list' element={<ProductList/>} />
    </Routes> */}
    
    <Customroutes/>
  </Fragment>
}

export default App
