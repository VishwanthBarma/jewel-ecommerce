import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Addproduct() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Adding New Product!");

    const fileInput = e.target?.image.files[0];

    const formData = new FormData();

    formData.append("file", fileInput);
    formData.append("upload_preset", "my_uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dlelnzfxb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    await fetch("/api/addproduct", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        image: data?.secure_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    toast.success("Product Added Successfully!", {
      id: notification,
    });

    setTitle("");
    setDescription("");
    e.target.value = null;
  };

  return (
    <div className="mt-5 p-5">
      <Link href="/products">
        <a>
          <button className="text-sky-500 font-bold">Back</button>
        </a>
      </Link>
      <h1 className="font-bold text-2xl">Add new product</h1>
      <Toaster />
      {session ? (
        <div className="mt-10">
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border-2 border-sky-500 p-2 rounded-lg m-2"
              placeholder="Product Title"
              required
            ></input>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-sky-500 p-2 rounded-lg m-2"
              type="text"
              required
              placeholder="Product Description"
            ></input>
            <input
              name="image"
              required
              className="m-2"
              type="file"
              accept="image/*"
              placeholder="Select Image"
            ></input>
            <button
              type="submit"
              className="m-2 disabled:bg-slate-300 bg-sky-500 font-bold text-white hover:bg-sky-400 rounded-lg p-2"
            >
              Add
            </button>
          </form>
        </div>
      ) : (
        <div className="relative flex justify-between">
          <h1 className="text-red-500 font-semibold text-xl">
            Only Admin can add new products.
          </h1>
          <Image
            className="-rotate-45"
            src={"/arrow.png"}
            height={250}
            width={250}
            objectFit="cover"
          ></Image>
        </div>
      )}
    </div>
  );
}

export default Addproduct;
