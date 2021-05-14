import React from "react";
import moment from "moment";
import { BellIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

//list all group card
export default function GroupList({ glist }) {
  return (
    <div className={"w-full flex flex-col space-y-2 "}>
      <div className={"font-robotoCondensed text-2xl tracking-wider"}>
        Joined
      </div>
      <div
        className={
          "w-full flex flex-col   space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row "
        }
      >
        {glist.map((group, index) => (
          <GroupCard ginfo={group} key={index} />
        ))}
      </div>
    </div>
  );
}

const GroupCard = ({ ginfo }) => {
  return (
    <div
      className={
        "flex flex-col justify-between py-2.5 px-3 h-36 fon overflow-y-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-md text-gray-200  bg-lightBlue-600 "
      }
    >
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <div className={"font-robotoCondensed text-lg"}>
            {ginfo.group_name}
          </div>
          <div className={"flex  flex-row items-center space-x-2"}>
            <div className={"text-lightBlue-200 text-sm font-medium"}>
              {ginfo.admin}
            </div>
            <div
              className={
                "text-gray-300 font-poppin font-medium text-xs  py-0.5 px-1.5 rounded-md bg-lightBlue-700"
              }
            >
              Admin
            </div>
          </div>
          <div className={"flex flex-row font-robotoCondensed"}>
            <div className={"flex  flex-row items-baseline space-x-1 pr-2"}>
              <div className={"text-lightBlue-200 text-lg font-semibold"}>
                {ginfo.teachersId.length}
              </div>
              <div
                className={"text-gray-300 text-sm  font-medium tracking-wider "}
              >
                teacher(s)
              </div>
            </div>
            <div className={"flex  flex-row items-baseline space-x-1"}>
              <div className={"text-lightBlue-200 text-lg font-semibold "}>
                {ginfo.studentsId.length}
              </div>
              <div
                className={"text-gray-300 text-sm  font-medium tracking-wider "}
              >
                student(s)
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={"flex flex-row"}>
            <BellIcon className={"h-4 w-4"} />
          </div>
        </div>
      </div>
      <div className="flex flex-row text-sm justify-between items-center  ">
        <div className={"space-x-1 font-robotoCondensed"}>
          <span className={"text-gray-300"}>Last lesson:</span>
          <span>
            {moment.utc(ginfo?.NewLesson?.lesson_date).format("DD-MM-YYYY")}
          </span>
        </div>
        <Link to={`/study/${ginfo._id}/all`}>
          <button
            className={
              "outline-none text-sm font-medium  tracking-wider focus:outline-none w-16 px-3 py-1 rounded-md hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
            }
          >
            open
          </button>
        </Link>
      </div>
    </div>
  );
};
