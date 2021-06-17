import React from "react";
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
export default function Questions({ questions, onShowAnsClick }) {
  const handleQclick = (idx) => {
    onShowAnsClick(idx);
  };

  return (
    <div
      className={`px-5 py-3   divide-y divide-teal-600  bg-teal-700  rounded-md  `}
    >
      <span className={"text-2xl  font-medium text-teal-100"}>Questions</span>

      <div className={"my-3"}>
        <ul className={"max-w-md"}>
          {questions.map(({ type, qtext, reference, ans }, idx) => (
            <li className={"my-2 cursor-default"} key={idx}>
              <div className={"flex "}>
                <div
                  className={`w-5 h-5 rounded-full mr-2 mt-[0.27rem] flex items-center justify-center flex-shrink-0 text-sm font-medium text-gray-200  bg-emerald-400 bg-opacity-50`}
                >
                  {idx + 1}
                </div>
                <span className={"text-gray-100 "}>
                  {type && (
                    <span
                      className={
                        "text-orange-100 font-poppin text-sm  font-medium mr-0.5  "
                      }
                    >{`[${type.typeText.toUpperCase()}]${
                      reference ? `[${reference}]` : ""
                    }`}</span>
                  )}
                  <span onClick={() => handleQclick(idx)}> {qtext}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={"flex flex-col gap-0.5"}>
        {leg.map(({ des, type }) => (
          <div className={"flex space-x-1 items-center flex-wrap"}>
            <span className={"text-sm text-orange-200 w-10 "}>{type}</span>
            <span className={"text-xs text-gray-200"}>{des}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
