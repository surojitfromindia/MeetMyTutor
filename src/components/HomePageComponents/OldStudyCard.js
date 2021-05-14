import React from "react";

export default function OldStudyCard() {
  return (
    <div
      className={
        "transition-all hover:-mx-1 px-5 py-3 rounded-md bg-gradient-to-tr  from-indigo-500 via-indigo-600 to-lightBlue-600"
      }
    >
      <span className={"font-medium tracking-wider text-lg text-gray-100"}>
        PRIVIOUS
      </span>
      <span className={"block leading-4 text-sm   text-lightBlue-200 "}>
        view upcoming lessions in advance. topics will be coverd in next classes
      </span>

      <div className={"block leading-5 text-sm mb-4 mt-1.5"}>
        <span className={"text-xl  text-coolGray-200 font-medium"}>5</span>
        <span className={"text-sm text-coolGray-200 ml-1"}>new excersise</span>
      </div>
      <div className={"flex justify-start"}>
        <button
          className={
            "outline-none text-sm font-medium tracking-wider focus:outline-none  px-3 py-1 rounded-md hover:bg-opacity-95 bg-indigo-400 bg-opacity-80 text-warmGray-100"
          }
        >
          Do again
        </button>
      </div>
    </div>
  );
}
