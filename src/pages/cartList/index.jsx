import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import CartTile from "../../components/cartTile/cartTile";
import { useNavigate } from "react-router-dom";

function CartList() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  // Calculate the total price (rounded to 2 decimal places)
  const totalPrice = cartItems.reduce((sum, item) => {
    // Ensure each totalPrice is rounded to 2 decimal places
    const roundedPrice = Math.round(item.totalPrice * 100) / 100;
    return sum + roundedPrice;
  }, 0) + 6;

  const formattedTotalPrice = totalPrice.toFixed(2); // Format the final result to 2 decimal places

  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">My Cart</h1>

      <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Cart Items Section */}
          <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
            <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
            <hr className="border-gray-300 mt-4 mb-8" />

            <div className="space-y-4">
              {cartItems?.length ? (
                cartItems.map((singleCartItem) => (
                  <CartTile
                    key={singleCartItem.id}
                    singleCartItem={singleCartItem}
                  />
                ))
              ) : (
                <h1 className="text-center mt-44">
                  No items available in cart! Please add some items
                </h1>
              )}
            </div>
          </div>

          {/* Promo and Summary Section */}
          <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Order Summary</h2>
            <div className="flex border border-blue-600 overflow-hidden rounded-md">
              <input
                type="text"
                placeholder="Promo code"
                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
              />
              <button
                type="button"
                className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
              >
                Apply
              </button>
            </div>
            {
              formattedTotalPrice > 6 ?
                <ul className="text-gray-800 mt-8 space-y-4">
              <li className="flex flex-wrap gap-4 text-base">
                Discount Total <span className="ml-auto font-bold">$0.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-base">
                Shipping <span className="ml-auto font-bold">$2.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-base">
                Tax <span className="ml-auto font-bold">$4.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-base font-bold">
                Total <span className="ml-auto">{formattedTotalPrice}</span>
              </li>
            </ul>
              : null
            }
            

            <div className="mt-8 space-y-2">
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Checkout
              </button>
              <button
                onClick={() => navigate("/product-list")}
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartList;
