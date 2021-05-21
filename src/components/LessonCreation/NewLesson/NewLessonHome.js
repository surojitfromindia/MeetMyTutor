/**
 * Propmt user to create a new lesson here.
 * Also list all temporary lessons.
 * Will publish them separately
 */
import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function NewLessonHome({ gnameP, gnamelist }) {
  const [gname] = useState(gnameP);
  const [, setSelectedGroupInfo] = useState();

  const handleGroupNameSelect = (groupName) => {
    let selectedGroupInfo = gnamelist.filter(
      (group) => group.group_name === groupName
    )[0];
    setSelectedGroupInfo(selectedGroupInfo);
    console.log(selectedGroupInfo);
  };

  return (
    <div className={"flex flex-col h-screen space-y-3 relative "}>
      <div
        className={` ${
          gname ? "hidden" : "absolute"
        } bg-coolGray-800 bg-opacity-90  flex justify-center py-14 top-0 right-0 bottom-0 left-0`}
      >
        <AskGnameModal gnamelist={gnamelist} onSelect={handleGroupNameSelect} />
      </div>
      <NewLessonCreateButton />
      <CurrentNewLesson />
    </div>
  );
}

function NewLessonCreateButton() {
  return (
    <div>
      <div
        className={
          "h-32 w-full border-dashed border-2 border-gray-400 text-gray-400 rounded-md"
        }
      >
        <div
          className={
            "flex flex-row justify-center items-center h-full cursor-pointer"
          }
        >
          <PlusIcon className={"h-5 w-5"} />
          <span className={""}>Add New Lesson</span>
        </div>
      </div>
    </div>
  );
}

function CurrentNewLesson() {
  return (
    <div>
      <div className={"h-32 w-full  text-gray-400 rounded-md"}>
        <div className={"flex flex-row  h-full "}>
          <span className={""}>Last Published</span>
        </div>
      </div>
    </div>
  );
}

function AskGnameModal({ gnamelist, onSelect }) {
  const handleSelect = (ev) => {
    onSelect(ev.target.value);
  };
  return (
    <div>
      <div
        className={
          "h-36 w-80 px-5 py-4 space-y-2 flex justify-center  flex-col bg-lightBlue-500 rounded-md"
        }
      >
        <span className={"text-2xl font-poppin"}>Select A Group</span>
        <select
          onChange={handleSelect}
          className={"text-gray-600 w-40 px-2 py-1.5 font-robotoCondensed"}
        >
          {gnamelist.map((group) => (
            <option key={group.group_name} value={group.group_name}>
              {group.group_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
