import React from "react";

//user can save legendes
const leg = [
  {
    type: "Q",
    des: "Questions that you must study.",
  },
  {
    type: "Ans",
    des: "The answear of given question is in answear section.",
  },
  {
    type: "Write",
    des: "A Home work problem.",
  },
  {
    type: "Quiz",
    des: "Take the quiz at the end of this list.",
  },
  {
    type: "Read",
    des: "Read the topic mention in the excecise.",
  },
];

export default function TypeLegends({ typelegendes }) {
  return (
    <div
      className={`px-5 py-3  bg-gradient-to-tl  from-pink-600 to-red-700 rounded-md  `}
    >
    <div className={"text-2xl font-medium text-red-200 mb-2.5"}>
      What is what ?
    </div>
      <ul className={"flex flex-col  divide-y divide-pink-600"}>
        {leg.map((ln) => (
          <li key={ln.type}>
            <div className={"flex flex-col py-1 "}>
              <span className={"font-semibold  text-red-200 text-sm"}>
                {ln.type}
              </span>
              <span className={"text-pink-300 text-sm"}>{ln.des}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
