import React from "react";

export default function Modal({ show, message, type }) {
  let colorScheme = "bg-lightBlue-600";
  switch (type) {
    case "message":
      colorScheme = "bg-emerald-600";
      break;
    case "warning":
      colorScheme = "bg-orange-600 text-white";
      break;
    case "error":
      colorScheme = "bg-rose-600";
      break;
    default:
      break;
  }
  return (
    <div
      className={`transition-all w-full bg- overflow-hidden flex items-center  justify-center ${
        show ? "max-h-32 " : "max-h-0"
      } h-16 mx-auto ${colorScheme}`}
    >
      <div
        className={"py-3 px-3 font-medium font-robotoCondensed tracking-wider "}
      >
        {message}
      </div>
    </div>
  );
}
