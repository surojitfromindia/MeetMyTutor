import React from "react";

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
    </div>
  );
}
