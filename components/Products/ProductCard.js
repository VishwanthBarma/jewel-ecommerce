import { useSession } from "next-auth/react";
import React from "react";

function ProductCard({ uid, title, description, image }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col transition-all ease-in-out hover:scale-105 h-[480px] w-[380px] shadow-lg shadow-slate-600 bg-black my-4 md:m-2 lg:m-5 rounded-xl">
      <div className="w-full h-64 relative">
        <img
          className="object-cover h-64 w-full rounded-t-xl"
          src={image}
        ></img>
        <h1 className="text-white shadow-xl card-content py-3 w-full text-center bg-opacity-60 absolute bottom-0 font-semibold text-2xl px-1">
          {title}
        </h1>
        {session && (
          <button className="text-white bg-rose-500 p-1 rounded-md hover:bg-rose-400 absolute top-1 left-1">
            Remove
          </button>
        )}
      </div>
      <div className=" px-3 py-2 overflow-y-scroll scrollbar-hide">
        <h1 className="text-lg text-neutral-400">{description}</h1>
      </div>
    </div>
  );
}

export default ProductCard;
