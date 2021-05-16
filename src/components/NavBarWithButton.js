import React from "react";
import OneMenu from "./OneMenu";
import { links } from "../utils/links";
export default function NavBarWithButton({ show }) {
  return (
    <div
      className={`px-2 py-2 transition-all delay-100 ease-in-out transform  flex   ${
        show ? "max-h-96 px-2 py-2" : "max-h-0 px-0 py-0"
      } overflow-hidden text-sm group-hover:max-h-96 flex flex-col gap-1 font-medium text-gray-200`}
    >
      <OneMenu menu={links[0]} isArrowShow={false} />
    </div>
  );
}
