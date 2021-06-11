import React, { useRef, useState } from "react";
import { PencilIcon, SaveIcon, PlusSmIcon } from "@heroicons/react/outline";

export default function TopicTab({ preTopic, onTopicUpdate }) {
  const [preTopics, setPreTopics] = useState(preTopic);
  const handleAdd = () => {
    let blackTopic = {
      type: { typeText: "" },
      des: "",
    };
    setPreTopics([...preTopics, blackTopic]);
    onTopicUpdate(preTopics);
  };
  const hadleSaveAndUpdate = (index, ttype, tdes) => {
    let tempT = preTopics;
    tempT[index] = {
      type: { typeText: ttype },
      des: tdes,
    };
    setPreTopics([...tempT]);
    onTopicUpdate(preTopics);
  };
  return (
    <div className={"mt-4 flex flex-col gap-2  "}>
      {preTopics && (
        <div className={"flex flex-col gap-2"}>
          {preTopics.map((topic, index) => (
            <TopicCard
              key={index}
              topic={topic}
              onSave={(ttype, tdes) => hadleSaveAndUpdate(index, ttype, tdes)}
            />
          ))}{" "}
        </div>
      )}
      <div className={"flex  md:justify-end   md:mr-3 "}>
        <button
          onClick={handleAdd}
          className={
            "outline-none flex flex-row gap-1 items-center py-1.5 w-20   font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
          }
        >
          <PlusSmIcon className={"w-4 h-4"} />
          ADD
        </button>
      </div>
    </div>
  );
}

function TopicCard({ topic, onSave }) {
  const [editMode, setEditMode] = useState(topic?.des ? false : true);
  const typeRef = useRef();
  const desRef = useRef();
  return (
    <div
      className={`flex flex-col  ${
        editMode ? "gap-2 " : "gap-0"
      }   md:flex-row w-full bg-coolGray-800 px-3 py-2 rounded-md text-sm uppercase`}
    >
      <div className={"flex  md:w-1/6 "}>
        {editMode ? (
          <input
            ref={typeRef}
            type="text"
            placeholder={"Type"}
            disabled={!editMode}
            defaultValue={topic?.type?.typeText.toUpperCase()}
            className={`uppercase rounded-sm border focus:outline-none bg-coolGray-800 px-2 py-1.5  w-full`}
          />
        ) : (
          <div className={`bg-transparent  mt-1.5 mb-1.5   w-full`}>
            {topic?.type?.typeText.toUpperCase()}
          </div>
        )}
      </div>
      <div className={"flex md:w-full "}>
        {editMode ? (
          <input
            ref={desRef}
            type="text"
            placeholder={"Description"}
            disabled={!editMode}
            defaultValue={topic?.des}
            className={`rounded-sm border focus:outline-none bg-coolGray-800 m-0 px-2 py-1.5   w-full`}
          />
        ) : (
          <div className={`bg-transparent mt-1 mb-1.5   w-full `}>
            {topic?.des}
          </div>
        )}
      </div>
      <div className={`${!editMode ? "mt-2" : ""} md:mt-0`}>
        {!editMode ? (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={
              "outline-none flex flex-row gap-1 items-center py-1.5 md:h-10 w-20  font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
            }
          >
            <PencilIcon className={"w-4 h-4"} />
            EDIT
          </button>
        ) : (
          <button
            onClick={() => {
              if (typeRef.current.value !== "" && desRef.current.value !== "") {
                setEditMode(!editMode);
                onSave(typeRef.current.value, desRef.current.value);
              }
            }}
            className={
              "outline-none flex flex-row gap-1 items-center py-1.5 md:h-10  w-20  font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-teal-500 bg-opacity-80 text-warmGray-100"
            }
          >
            <SaveIcon className={"w-4 h-4"} />
            SAVE
          </button>
        )}
      </div>
    </div>
  );
}
