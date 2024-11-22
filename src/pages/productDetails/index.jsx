import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetails() {
  const { id } = useParams();
  const { productDetail, setProductDetail, handleAddtoCart,cartItems} = useContext(ShoppingCartContext);

  // Fetch product details from API
  async function fetchDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();
    if (result) setProductDetail(result);
  }

  useEffect(() => {
    // Disable scrolling on page load
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling on component unmount
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const changeImage = (src) => {
    document.getElementById("mainImage").src = src;
  };

  // Conditional rendering in case productDetail is not loaded yet
  if (!productDetail) {
    return <div>Loading...</div>;
  }

  let newPrice = (
    (productDetail.price * (100 + productDetail.discountPercentage)) /
    100
  ).toFixed(2);

  return (
    <div className="bg-gray-100 w-full overflow-hidden">
      <div className="w-full px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={productDetail.thumbnail}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <img
                src={productDetail.images[0]}
                alt="Thumbnail 1"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() => changeImage(productDetail.images[0])}
              />
              <img
                src={productDetail.images[1]}
                alt="Thumbnail 2"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() => changeImage(productDetail.images[1])}
              />
              <img
                src={productDetail.images[2]}
                alt="Thumbnail 3"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() => changeImage(productDetail.images[2])}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-black text-3xl font-bold mb-2">
              {productDetail.title}
            </h2>
            <p className="text-gray-600 mb-4">SKU: {productDetail.sku}</p>
            <div className="mb-4">
              <span className="text-black text-2xl font-bold mr-2">
                ${productDetail.price}
              </span>
              <span className="text-gray-500 line-through">${newPrice}</span>
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                {productDetail.rating} (120 reviews)
              </span>
            </div>
            <p className="text-gray-700 mb-6">{productDetail.description}</p>

            <div className="mb-6">
              <button
                onClick={() => handleAddtoCart(productDetail)}
                disabled ={cartItems.findIndex(item => item.id === productDetail.id) > -1 }
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-65"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;