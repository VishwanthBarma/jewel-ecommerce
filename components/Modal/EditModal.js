import React, { useState } from "react";

function EditModal({ title, description, showSuccessNotification, uid }) {
  const [changeImage, setChangeImage] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = e.target?.image?.files[0];
    let newImage = "";
    if (fileInput) {
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

      newImage = data?.secure_url;
    }

    await fetch("/api/updateproduct", {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
        title: newTitle,
        description: newDescription,
        image: newImage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    showSuccessNotification();
  };

  return (
    <div className="bg-white flex flex-col p-3 rounded-xl shadow-2xl shadow-sky-500">
      <h1 className="text-center font-semibold m-2 text-xl">Edit Product</h1>
      <div className="flex justify-center mb-5">
        <h1 className="text-center text-sky-500 border-2 px-2 border-sky-500 rounded-3xl">
          {uid}
        </h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="bg-slate-200 p-2 m-1 rounded-xl text-neutral-900"
          placeholder="Title"
        ></input>
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="bg-slate-200 p-2 m-1 rounded-xl text-neutral-900"
          placeholder="Description"
        ></input>
        {!changeImage ? (
          <button
            onClick={() => setChangeImage(true)}
            className="bg-rose-500 text-white font-semibold p-1 m-1 rounded-xl"
          >
            Change Image
          </button>
        ) : (
          <input
            name="image"
            className="m-1"
            type="file"
            accept="image/*"
          ></input>
        )}
        <button
          type="submit"
          className="m-1 bg-sky-500 p-2 rounded-xl text-white font-semibold"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditModal;
