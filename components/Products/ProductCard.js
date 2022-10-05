import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactModal from "react-modal";
import EditModal from "../Modal/EditModal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function ProductCard({
  uid,
  title,
  description,
  image,
  showSuccessNotification,
  showRemovedNotification,
}) {
  const { data: session } = useSession();
  const [removed, setRemoved] = useState(false);
  const router = useRouter();

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

    showRemovedNotification();
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
              className="text-white bg-rose-500 p-1 shadow-lg rounded-md hover:bg-rose-400 absolute top-2 left-2"
            >
              <AiFillDelete className="h-5 w-5 shadow-sm" />
            </button>
            <button
              onClick={() =>
                router.push(`${router.pathname}/?editproduct=${uid}`)
              }
              className="text-white bg-green-500 p-1 shadow-lg px-3 rounded-md hover:bg-green-400 absolute top-2 left-10"
            >
              <AiFillEdit className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      <div className=" px-3 py-2 overflow-y-scroll scrollbar-hide">
        <h1 className="text-lg text-neutral-400">{description}</h1>
      </div>
      <ReactModal
        isOpen={Boolean(router.query.editproduct)}
        onRequestClose={() => router.back()}
        style={{
          content: {
            top: "35%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            backgroundColor: "",
            transform: "translate(-50%, -50%)",
          },
          overlay: {
            backgroundColor: "#334250a7",
          },
        }}
      >
        <EditModal
          showSuccessNotification={showSuccessNotification}
          showRemovedNotification={showRemovedNotification}
          uid={uid}
          title={title}
          description={description}
        />
      </ReactModal>
    </div>
  );
}

export default ProductCard;
