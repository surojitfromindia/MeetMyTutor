import React from "react";

export default function SubjectCard({ name, descriptions }) {
  return (
    <div
      className={
        "rounded-md shadow-lg overflow-hidden  h-52  flex flex-col  bg-gradient-to-tr from-lightBlue-600 to-indigo-400"
      }
    >
      <div className={"h-2/3 bg-gray-50"}></div>
      <div className={"px-2 py-2 h-1/3 "}>
        <h3
          className={
            "block text-sm   font-medium tracking-wide text-lightBlue-100"
          }
        >
          {name}
        </h3>
        {descriptions && (
          <p className={"leading-3 text-xs overflow-hidden text-lightBlue-200"}>
            {descriptions}
          </p>
        )}
      </div>
    </div>
  );
}
