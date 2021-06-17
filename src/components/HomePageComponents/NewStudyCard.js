import { useState } from "react";

import NewLesson from "../../PageComponents/NewLesson";
import DateSelector from "../CommonComponents/DateSelector";

export default function NewStudyCard({ lesson = [], gid }) {
  const [expanded, setExpanded] = useState(false);
  let val = lesson.reduce((a, sub) => a + sub.topic.length, 0);
  return (
    <div
      className={
        "lg:h-56  overflow-visible px-5 py-3 flex flex-col justify-between rounded-md bg-gradient-to-tr to-green-500  from-emerald-700"
      }
    >
      <div className={"flex flex-col"}>
        <span className={"font-medium tracking-wider text-lg text-gray-100"}>
          NEW
        </span>
        <span className={"block leading-4 text-sm   text-emerald-200 "}>
          Task for today. cover them as soon as possible. You may have some quiz
          to solve.
        </span>

        <div className={"block leading-5 text-sm mb-4 mt-1.5"}>
          <span className={"text-xl  text-coolGray-200 font-medium"}>
            {val}
          </span>
          <span className={"text-sm text-coolGray-200 ml-1"}>
            new excersises
          </span>
        </div>
      </div>
      <div className={"flex flex-col gap-2 "}>
        <div className={"flex items-center  z-20   "}>
          <DateSelector
            backColor={"bg-emerald-500 bg-opacity-90"}
            onDateChanged={() => {}}
          />
        </div>
        <button
          onClick={() => {
            setExpanded((t) => !t);
          }}
          className={
            "outline-none text-sm font-medium tracking-wider focus:outline-none w-24  py-1 rounded-md hover:bg-opacity-95 bg-emerald-500 bg-opacity-80 text-warmGray-100"
          }
        >
          {!expanded ? "Expand" : "Collapse"}
          {/*  {<Link to={`/study/${gid}/new`}>
            
          </Link>} */}
        </button>
      </div>
      <div
        className={` transition-all transform ease-in-out ${
          expanded ? "max-h-96 mt-4" : "max-h-0"
        } lg:hidden overflow-auto scrollbar    `}
      >
        <div className={""}>
          <NewLesson groupIdProp={gid} />
        </div>
      </div>
    </div>
  );
}
