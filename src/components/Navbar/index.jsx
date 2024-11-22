import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartContext } from '../../context';
import { useContext } from 'react';
const Navbar = () => {
    const { cartItems } = useContext(ShoppingCartContext);
    const cartSize = cartItems.length || 0;
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        <a href="/" className="text-2xl font-bold">ShopKaro</a>

        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/product-list" className="hover:text-gray-400">Products</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">About Us</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </li>
        </ul>

        {/* Cart Icon */}
        <div className="relative">
          <a href="/cart-items" className="text-xl">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">
              {cartSize} 
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
