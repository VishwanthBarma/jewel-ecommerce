import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import ProductCard from "../components/Products/ProductCard";
import Product from "../modals/ProductModal";
import db from "../utils/db";

function Products({ products }) {
  const { data: session } = useSession();
  return (
    <div className="px-10 z-0">
      <div className="flex items-center space-x-3">
        <h1 className="mt-5 font-semibold text-3xl mb-5">Products</h1>
        {session && (
          <button className="text-sky-500 hover:bg-sky-500 hover:text-white font-semibold border-2 border-sky-500 p-1 rounded-lg">
            Add Product
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            title={product.title}
            description={product.description}
            image={product.image}
            key={product._id}
            uid={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
