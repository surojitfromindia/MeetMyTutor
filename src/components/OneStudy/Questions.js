import React from "react";

export default function Questions({ questions }) {
  return (
    <div
      className={`px-5 py-3  bg-gradient-to-tl divide-y divide-teal-600  from-teal-600 to-emerald-700 rounded-md  `}
    >
      <span className={"text-2xl  font-medium text-teal-100"}>Questions</span>

      <div className={"my-3"}>
        <ul className={"max-w-md"}>
          {questions.map(({ type, qtext, reference }, idx) => (
            <li className={"my-2"} key={idx}>
              <div className={"flex "}>
                <div
                  className={`w-5 h-5 rounded-full mr-2 mt-[0.27rem] flex items-center justify-center flex-shrink-0 text-sm font-medium text-gray-200  bg-emerald-400 bg-opacity-50`}
                >
                  {idx + 1}
                </div>
                <span className={"text-gray-100 flex  "}>
                  {type && (
                    <span
                      className={"text-orange-100 font-medium mr-0.5"}
                    >{`[${type.typeText.toUpperCase()}]`}</span>
                  )}
                  {qtext}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
