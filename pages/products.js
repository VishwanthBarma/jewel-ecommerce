import Image from "next/image";
import React from "react";
import ProductCard from "../components/Products/ProductCard";

function Products() {
  return (
    <div className="px-10 z-0">
      <h1 className="mt-5 font-semibold text-3xl mb-5">Products</h1>
      <div className="flex flex-wrap justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default Products;
