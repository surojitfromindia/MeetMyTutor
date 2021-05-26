import { Link } from "react-router-dom";

export default function NewStudyCard({ lesson = [], gid }) {
  let val = lesson.reduce((a, sub) => a + sub.topic.length, 0);
  return (
    <div
      className={
        "h-44 px-5 py-3 flex flex-col justify-between rounded-md bg-gradient-to-tr to-orange-400 via-orange-600 from-red-500"
      }
    >
      <div className={"flex flex-col"}>
        <span className={"font-medium tracking-wider text-lg text-gray-100"}>
          NEW
        </span>
        <span className={"block leading-4 text-sm   text-red-200 "}>
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
      <div className={"flex justify-start"}>
        <Link to={`/study/${gid}/new`}>
          <button
            className={
              "outline-none text-sm font-medium tracking-wider focus:outline-none w-16 px-3 py-1 rounded-md hover:bg-opacity-95 bg-orange-500 bg-opacity-80 text-warmGray-100"
            }
          >
            Start
          </button>
        </Link>
      </div>
    </div>
  );
}
