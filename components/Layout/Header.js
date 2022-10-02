import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

function Header() {
  return (
    <div className="sticky z-50 top-0 h-16 flex justify-center items-center border-b-2 bg-white">
      <button
        title="Admin Login"
        className="absolute right-10 bg-slate-100 rounded-lg p-2 hover:bg-slate-200 font-semibold"
      >
        <IoPersonCircleOutline className="h-7 w-7 text-slate-600" />
      </button>
      <h1 className="font-bold text-2xl">Shop Name</h1>
    </div>
  );
}

export default Header;
