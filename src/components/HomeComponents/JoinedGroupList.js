import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { BellIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

//list all group card
export default function JoinedGroupList({ glist, onJoin }) {
  const [groupList, setGroupList] = useState(glist);

  useEffect(() => {
    setGroupList(glist);
  }, [glist]);

  return (
    <div className={"w-full flex flex-col space-y-6 "}>
      <div className={"flex flex-col space-y-2"}>
        <span className={"font-robotoCondensed text-4xl  tracking-wider"}>
          Joined
        </span>
        <div
          className={
            "w-full flex flex-col   space-y-3 sm:space-y-0 sm:space-x-2 sm:flex-row"
          }
        >
          <JoinGroup onJoin={onJoin} />
        </div>
      </div>

      <div
        className={
          "w-full flex flex-col   space-y-4 sm:space-y-0 sm:space-x-3 sm:flex-row "
        }
      >
        {groupList.length !== 0 &&
          groupList.map((group, index) => (
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
        "shadow-2xl flex flex-col justify-between py-3 px-4 h-44  overflow-y-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-md text-gray-200  bg-lightBlue-600 "
      }
    >
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <div className={"font-robotoCondensed text-2xl"}>
            {ginfo.group_name}
          </div>
          <div className={"flex  flex-row items-center space-x-2"}>
            <div className={"text-lightBlue-200 text-md font-medium"}>
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
              <div className={"text-lightBlue-200 text-2xl font-semibold"}>
                {ginfo.teachersId.length}
              </div>
              <div
                className={
                  "text-gray-300 text-base  font-medium tracking-wider "
                }
              >
                teacher(s)
              </div>
            </div>
            <div className={"flex  flex-row items-baseline space-x-1"}>
              <div className={"text-lightBlue-200 text-2xl font-semibold "}>
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
      <div className="flex flex-row text-md justify-between items-center  ">
        <div className={"space-x-1 font-robotoCondensed"}>
          <span className={"text-gray-300"}>Last lesson:</span>
          <span>
            {moment.utc(ginfo?.NewLesson?.lesson_date).format("DD-MM-YYYY")}
          </span>
        </div>
        <Link to={`/study/${ginfo._id}/all`}>
          <button
            className={
              "outline-none  font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1 rounded-md hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
            }
          >
            OPEN
          </button>
        </Link>
      </div>
    </div>
  );
};

const JoinGroup = ({ onJoin }) => {
  const gRef = useRef();
  const keyRef = useRef();
  const hadleJoinClick = () => {
    onJoin(gRef.current.value, keyRef.current.value);
  };
  return (
    <div className={"h-8"}>
      <input
        type={"text"}
        ref={gRef}
        className={
          "px-3 py-2 border-0 focus:ring-0 outline-none  rounded-none text-sm rounded-l-md bg-coolGray-700  border-collapse focus:border-b-2 focus:border-lightBlue-500"
        }
        placeholder={"Group ID"}
      />
      <input
        ref={keyRef}
        type={"text"}
        className={
          "px-3 py-2  border-0 outline-none focus:ring-0 text-sm bg-coolGray-700 rounded-none w-20 border-collapse focus:border-b-2 focus:border-lightBlue-500  "
        }
        placeholder={"KEY"}
      />

      <button
        onClick={hadleJoinClick}
        className={
          "outline-none  font-medium text-sm  tracking-wider focus:outline-none w-16 px-3 py-2  rounded-r-md hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
        }
      >
        JOIN
      </button>
    </div>
  );
};
