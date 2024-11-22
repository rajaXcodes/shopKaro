import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile/productTile";

function ProductList() {
  const { listOfProducts, loading } = useContext(ShoppingCartContext);
  if (loading)
    return (
      <div className="flex items-center justify-center max-w-full max-h-full">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((product) => <ProductTile product={product} />)
          ) : (
            <h3>No Products Found</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
