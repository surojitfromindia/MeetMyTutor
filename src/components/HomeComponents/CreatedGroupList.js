import moment from "moment";
import { BellIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function CreatedGroupList({ cglist, onCGCOpenClick }) {
  return (
    <div className={"w-full flex flex-col space-y-6 "}>
      <div className={"flex flex-col space-y-3"}>
        <span className={"font-robotoCondensed text-4xl  tracking-wider"}>
          Created
        </span>
        <div
          className={
            "w-full flex flex-col space-y-4 sm:space-y-0 sm:gap-2 sm:flex-row sm:flex-wrap"
          }
        >
          {cglist.length !== 0 &&
            cglist.map((group, index) => (
              <GroupCard
                cginfo={group}
                key={index}
                onOpenClick={onCGCOpenClick}
              />
            ))}
        </div>

        <CreateGroupButton />
      </div>
    </div>
  );
}

const GroupCard = ({ cginfo, onOpenClick }) => {
  const handleOpen = () => {
    onOpenClick(cginfo.group_name);
  };
  return (
    <div
      className={
        "flex flex-col justify-between py-3 px-4 h-44 sm:w-80 overflow-y-auto   rounded-md text-gray-200  bg-violet-500"
      }
    >
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col w-full">
          <div className={"flex flex-row   justify-between "}>
            <span className={"font-robotoCondensed text-2xl"}>
              {cginfo.group_name}
            </span>
            <div className={"flex flex-row items-center gap-2  "}>
              <span
                className={
                  "font-medium underline overflow-x-hidden tracking-wider  overflow-ellipsis text-sm"
                }
              >
                {cginfo.secrateKey}
              </span>
              <span
                className={
                  "font-medium overflow-x-hidden tracking-wider w-20 overflow-ellipsis text-sm"
                }
              >
                {cginfo._id}
              </span>
              <BellIcon className={"h-4 w-4"} />
            </div>
          </div>
          <div className={"flex  flex-row items-center space-x-2"}>
            <div className={"text-violet-200 text-md font-medium"}>
              {cginfo.admin}
            </div>
            <div
              className={
                "text-gray-300 font-poppin font-medium text-xs  py-0.5 px-1.5 rounded-md bg-violet-700"
              }
            >
              Admin
            </div>
          </div>
          <div className={"flex flex-row font-robotoCondensed"}>
            <div className={"flex  flex-row items-baseline space-x-1 pr-2"}>
              <div className={"text-violet-200 text-2xl font-semibold"}>
                {cginfo.teachersId.length}
              </div>
              <div
                className={
                  "text-gray-50 text-base  font-medium tracking-wider "
                }
              >
                teacher(s)
              </div>
            </div>
            <div className={"flex  flex-row items-baseline space-x-1"}>
              <div className={"text-violet-200 text-2xl font-semibold "}>
                {cginfo.studentsId.length}
              </div>
              <div
                className={"text-gray-50 text-sm  font-medium tracking-wider "}
              >
                student(s)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-md justify-between items-center  ">
        <div className={"space-x-1 font-robotoCondensed"}>
          <span className={"text-gray-300"}>Last lesson:</span>
          <span>
            {moment.utc(cginfo?.NewLesson?.lesson_date).format("DD-MM-YYYY")}
          </span>
        </div>

        <button
          onClick={handleOpen}
          className={
            "outline-none  font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1 rounded-md hover:bg-opacity-95 bg-violet-400 bg-opacity-80 text-warmGray-100"
          }
        >
          OPEN
        </button>
      </div>
    </div>
  );
};

const CreateGroupButton = () => {
  return (
    <div>
      <button
        className={
          "outline-none  font-medium text-sm  tracking-wider focus:outline-none  px-3 py-2  rounded-md hover:bg-opacity-95 bg-violet-500 bg-opacity-80 text-warmGray-100"
        }
      >
        <Link to={"/group/new"}>Create Group</Link>
      </button>
    </div>
  );
};
