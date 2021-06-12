import React from "react";

export default function OldStudyCard() {
  return (
    <div
      className={
        "lg:h-48 px-5 py-3 flex flex-col justify-between rounded-md bg-gradient-to-tr  from-indigo-500 via-indigo-600 to-lightBlue-600"
      }
    >
      <div className={"flex flex-col"}>
        <span className={"font-medium tracking-wider text-lg text-gray-100"}>
          PRIVIOUS
        </span>
        <span className={"block leading-4 text-sm   text-lightBlue-200 "}>
          Re-learn old excersises. You excersises will remain as long as you are
          registerd with this study group.
        </span>

        <div className={"block leading-5 text-sm mb-4 mt-1.5"}>
          <span className={"text-xl  text-coolGray-200 font-medium"}>15</span>
          <span className={"text-sm text-coolGray-200 ml-1"}>excersises</span>
        </div>
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
