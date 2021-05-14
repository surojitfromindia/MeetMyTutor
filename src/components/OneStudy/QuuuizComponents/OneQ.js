import React from "react";
export default function OneQ({ fq, meInd, onOptionSubmit }) {
  const onAnsSub = (ev) => {
    ev.target.classList.add("bg-emerald-400");
    onOptionSubmit(meInd, Number(ev.target.id));
  };
  return (
    <div className={"flex-shrink-0 h-full flex-col rounded-md   text-gray-200"}>
      <ul className={"divide-y divide-lightBlue-600 w-full "}>
        <div
          className={
            "px-3 py-3 text-sm text-gray-50 font-medium bg-opacity-50 rounded-t-md  bg-gray-200 "
          }
        >
          {fq.qv}
        </div>
        {fq.o.map((op, idx) =>
          idx !== fq.o.length - 1 ? (
            <div
              id={idx}
              onClick={onAnsSub}
              key={`o${idx}`}
              className={`px-3 py-2  text-sm hover:bg-opacity-20 cursor-pointer bg-opacity-30 bg-gray-300`}
            >
              {op}
            </div>
          ) : (
            <div
              id={idx}
              onClick={onAnsSub}
              key={`o${idx}`}
              className={`px-3 py-2 rounded-b-md  text-sm hover:bg-opacity-20 cursor-pointer bg-opacity-30 bg-gray-300`}
            >
              {op}
            </div>
          )
        )}
      </ul>
    </div>
  );
}
