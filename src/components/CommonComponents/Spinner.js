import React from "react";
import { CgSpinner as SpinnerI } from "react-icons/cg";
export default function Spinner({ size = 40, color = "#ff4444" }) {
  return (
    <div className={"flex h-full w-full items-center justify-center "}>
      <SpinnerI size={size} color={color} className={"animate-spin "} />
    </div>
  );
}
