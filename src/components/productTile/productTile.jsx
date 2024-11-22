import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductTile({ product }) {
  const navigate = useNavigate();
  const {handleAddtoCart,cartItems} = useContext(ShoppingCartContext)
  function handleClickDetail(id) {
    navigate(`/product-details/${id}`);
  }
  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex items-start justify-between mt-4">
        <div className="text-left font-bold text-gray-900 text-sm md:text-base w-[75%]">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {product?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 md:text-sm">
            ${product?.price}
          </p>
        </div>
      </div>
      <div className="flex justify-evenly gap-3">
      <button
        onClick={() => handleClickDetail(product?.id)}
        className="px-4 mt-5 w-full py-1  bg-blue text-white font-bold text-sm bg-gray-700  rounded-none hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        View Details
      </button>
      <button
        onClick={() => handleAddtoCart(product)}
        disabled ={cartItems.findIndex(item => item.id === product.id) > -1 }
        className="px-4 mt-5 w-full py-1  bg-blue text-white font-bold text-sm bg-[#ff9f00]  rounded-none hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        
      >
      {cartItems.findIndex(item => item.id === product.id) > -1  ? "Added to cart" : "Add to Cart"}
      </button>
      </div>
      
    </div>
  );
}

export default ProductTile;
