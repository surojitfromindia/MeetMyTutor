import { RefreshIcon } from "@heroicons/react/solid";
export default function LessonTimeline() {
  return (
    <div className={"overflow-y-auto"}>
      <div className={"rounded-md flex flex-col gap-1 bg-rose-600 px-3 py-4"}>
        <div className={"flex flex-row justify-between"}>
          <span className={"font-poppin text-lg tracking-wide"}>Timeline</span>
          <button
            className={
              "outline-none flex items-center gap-1  font-medium text-sm  tracking-wider focus:outline-none  px-2 py-1.5  rounded-md hover:bg-opacity-95 bg-rose-800 bg-opacity-80 text-warmGray-100"
            }
          >
            <RefreshIcon className={"h-5 w-5"} />
          </button>
        </div>
        <span
          className={
            "font-poppin text-gray-100 max-w-lg  text-xs tracking-wide"
          }
        >
          View lessons you have published.
        </span>
        <div
          className={"flex flex-col  max-h-52 overflow-y-auto mt-3 scrollbar"}
        >
          <div className={"flex flex-col  mt-3 "}>
            <TimelineCard child={"Lesson publish by Surojit Paul [1.15]"} />
            <TimelineCard child={"New Lesson Created Today [11.20]"} />
            <TimelineCard child={"3 Lesson created by Arijit Ghosh"} />
            <TimelineCard
              child={"1 Lesson (Computer Application ) removed by Arijit Ghosh"}
            />
            <TimelineCard isLast={true} />
          </div>
        </div>
        <div className={"flex flex-col space-y-2 mt-2"}>
          <div className={""}></div>
          <div className={"flex flex-row items-center gap-2"}>
            <button
              className={
                "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1.5  rounded-md hover:bg-opacity-95 bg-gray-50 bg-opacity-80 text-rose-600"
              }
            >
              PREV
            </button>
            <button
              className={
                "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1.5  rounded-md hover:bg-opacity-95 bg-rose-700 bg-opacity-80 text-gray-50"
              }
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineCard({
  child = <div>Some Information </div>,
  isLast = false,
}) {
  return (
    <div className={"flex "}>
      <div className={"mt-1  space-y-0.5 flex flex-col items-center relative "}>
        <div className={"flex flex-col  justify-center group"}>
          <div className={"absolute hidden -top-2 left-5 group-hover:block "}>
            <div className={" w-20   bg-gray-700 px-2 py-1.5"}>Hola Boy</div>
          </div>
          <CCirlcle />
        </div>
        {!isLast && (
          <div
            className={"border-l-2  rounded-md h-full border-yellow-300"}
          ></div>
        )}
      </div>
      <div className={"px-3 pb-5 cursor-pointer "}>{child}</div>
    </div>
  );
}

function CCirlcle({ ouC = "border-yellow-300", inC = "bg-yellow-300" }) {
  return (
    <div
      className={`border-2 ${ouC} w-4 h-4 rounded-full flex items-center justify-center`}
    >
      <div className={`p-0.5 w-2 h-2  ${inC} rounded-full`}></div>
    </div>
  );
}


