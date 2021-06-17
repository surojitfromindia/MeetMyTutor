import { FaCheckCircle as Chk } from "react-icons/fa";
import { useState } from "react";
export default function Topic({
  topics,
  onTopicComplete,
  isTopicTrackingEditable = true,
}) {
  const [topicList, setTopicList] = useState(topics); //change the checkmark to green if it is a done task

  let isAllDone = topics.reduce((x, a) => x && a.done, true);

  const handleCheck = (ev) => {
    if (isTopicTrackingEditable) {
      ev.preventDefault();
      ev.stopPropagation();
      let k = topicList;
      k[ev.target.id].done = !k[ev.target.id].done;
      setTopicList([...k]);
      onTopicComplete(topicList);
    }
  };
  return (
    <div
      className={` px-5 py-3  bg-gradient-to-tl  from-lightBlue-500 to-indigo-600 rounded-md ${
        isAllDone ? "to-teal-600" : ""
      } `}
    >
      {isAllDone && (
        <span className={"text-2xl font-medium text-teal-100"}>
          Good! You Are Ready !
        </span>
      )}
      <div className={"my-5"}>
        <ul className={"max-w-md space-y-3"}>
          {topicList.map(({ type, des, done }, idx) => (
            <li className={"my-2 cursor-pointer"} key={idx}>
              <div className={"flex"}>
                <Chk
                  className={`w-5 h-5 mr-1.5 mt-[0.140rem] flex-shrink-0 ${
                    done ? "text-green-300" : ""
                  } text-gray-200`}
                />
                <span
                  className={"text-gray-100 "}
                  id={idx}
                  onClick={handleCheck}
                >
                  {type && (
                    <span
                      id={idx}
                      className={"text-orange-100 font-medium"}
                    >{`[${type.typeText.toUpperCase()}]`}</span>
                  )}{" "}
                  {des}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
