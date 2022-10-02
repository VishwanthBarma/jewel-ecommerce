import React from "react";

function ProductCard() {
  return (
    <div className="flex flex-col h-[480px] w-[380px] shadow-lg shadow-slate-600 bg-black m-2 lg:m-5 rounded-xl">
      <div className="w-full h-64 relative">
        <img
          className="object-cover h-64 w-full rounded-t-xl"
          src="https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"
        ></img>
        <h1 className="text-white shadow-xl card-content py-3 w-full text-center bg-opacity-60 absolute bottom-0 font-semibold text-2xl px-1">
          Product Name
        </h1>
      </div>
      <div className=" px-3 py-2 overflow-y-scroll">
        <h1 className="text-lg text-neutral-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </h1>
      </div>
    </div>
  );
}

export default ProductCard;
