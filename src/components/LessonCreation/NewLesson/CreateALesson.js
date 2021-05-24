import React, { useState } from "react";
import { MinusCircleIcon as MCI, PencilIcon } from "@heroicons/react/outline";

export default function CreateALesson({ lessonDetails, onclose, show = true }) {
  const [currentOpenTab, setCurrentOpenTab] = useState(
    <TopicTab preTopic={lessonDetails.topic} />
  );
  const tabs = ["Quiz", "Questions", "Topic", "Note"];
  const handleTabItemChanged = (index) => {};

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } px-5 py-3 bg-coolGray-700 shadow-xl inset-4 lg:inset-28 rounded-md`}
    >
      <div>
        <div className={"flex justify-between items-center"}>
          <div className={"text-xl"}>{lessonDetails?.subname}</div>
          <MCI
            onClick={(ev) => {
              onclose();
            }}
            className={"h-7 w-7"}
          />
        </div>
        <div></div>
        <div className={"mt-4"}>
          <Tab children={tabs} onTabItemChanged={handleTabItemChanged} />
        </div>
        <div className={"mt-1 border-t-2 w-full bg-white"}></div>
        <div>{currentOpenTab && currentOpenTab}</div>
      </div>
    </div>
  );
}

function Tab({
  align = "flex-row",
  onTabItemChanged,
  children = ["Quiz", "Question"],
}) {
  const [current, setcurrent] = useState(2);
  const handleTabChange = (index) => {
    setcurrent(index);
    onTabItemChanged(index);
  };
  return (
    <div>
      <div className={`flex ${align} gap-6 font-robotoCondensed`}>
        {children.map((tabItem, index) => (
          <div
            id={index}
            key={index}
            onClick={() => {
              handleTabChange(index);
            }}
            className={`cursor-pointer hover:underline ${
              index === current ? "text-orange-400" : "text-gray-300"
            }`}
          >
            {tabItem}
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicTab({ preTopic }) {
  console.log(preTopic);
  return (
    <div>
      {preTopic && (
        <div>
          {" "}
          {preTopic.map((topic, index) => (
            <TopicCard key={index} topic={topic} />
          ))}{" "}
        </div>
      )}
    </div>
  );
}

function TopicCard({ topic }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={"mt-2"}>
      <div>
        <input
          type="text"
          disabled={!editMode}
          defaultValue={topic?.type?.typeText}
          className={`bg-coolGray-800 px-2 py-1.5 ${
            !editMode ? "bg-coolGray-700" : ""
          }`}
        />
      </div>
      <div>
        {editMode ? (
          <input
            type="text"
            disabled={!editMode}
            defaultValue={topic?.des}
            className={`bg-coolGray-800 px-2 py-1.5 ${
              !editMode ? "bg-coolGray-700" : ""
            } w-96`}
          />
        ) : (
          <div
            className={`bg-coolGray-800 px-2 py-1.5 ${
              !editMode ? "bg-coolGray-700" : ""
            } w-96`}
          >
            {topic?.des}
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
          className={
            "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1.5  rounded-md hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
}
