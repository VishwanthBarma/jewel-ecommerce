import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ProductCard({ uid, title, description, image, showNotification }) {
  const { data: session } = useSession();
  const [removed, setRemoved] = useState(false);

  const handleRemove = async (e) => {
    e.preventDefault();

    await fetch("/api/removeproduct", {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setRemoved(true);

    showNotification();
  };

  return (
    <div
      className={` ${
        removed && "opacity-25"
      } flex flex-col transition-all ease-in-out hover:scale-105 h-[480px] w-[380px] shadow-lg shadow-slate-600 bg-black my-4 md:m-2 lg:m-5 rounded-xl`}
    >
      <div className="w-full h-64 relative">
        <img
          className="object-cover h-64 w-full rounded-t-xl"
          src={image}
        ></img>
        <h1 className="text-white shadow-xl card-content py-3 w-full text-center bg-opacity-60 absolute bottom-0 font-semibold text-2xl px-1">
          {title}
        </h1>
        {session && !removed && (
          <>
            <button
              onClick={(e) => handleRemove(e)}
              className="text-white bg-rose-500 p-1 shadow-lg rounded-md hover:bg-rose-400 absolute top-1 left-1"
            >
              Remove
            </button>
            <button className="text-white bg-sky-500 p-1 shadow-lg px-3 rounded-md hover:bg-sky-400 absolute top-1 left-20">
              Edit
            </button>
          </>
        )}
      </div>
      <div className=" px-3 py-2 overflow-y-scroll scrollbar-hide">
        <h1 className="text-lg text-neutral-400">{description}</h1>
      </div>
    </div>
  );
}

export default ProductCard;
