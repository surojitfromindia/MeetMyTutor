import React from "react";
import Board from "./QuuuizComponents/Board";

export default function Quuuiz() {
  return (
    <div
      className={
        "rounded-md px-5 pt-5 pb-3 bg-gradient-to-tr from-lightBlue-600 to-blue-700"
      }
    >
      <Board />
    </div>
  );
}
