import React, { useRef, useState } from "react";
import { PencilIcon, SaveIcon, PlusSmIcon } from "@heroicons/react/outline";
import { FaChevronDown as Fdw, FaChevronUp as Fdu } from "react-icons/fa";



export default function QuestionTab({ preQue, onQueUpdate }) {
  const [preQues, setPreQues] = useState(preQue);
  const handleAdd = () => {
    let blankQue = {
      type: { typeText: "" },
      qtext: "",
    };
    setPreQues([...preQues, blankQue]);
    // onQueUpdate(preQues);
  };
  const hadleSaveAndUpdate = (index, ttype, tqn, tref, tan) => {
    let tempT = preQues;
    tempT[index] = {
      type: { typeText: ttype },
      qtext: tqn,
      reference: tref,
      ans: tan,
    };
    setPreQues([...tempT]);
    onQueUpdate(preQues);
  };
  return (
    <div className={"mt-4 flex flex-col gap-2  "}>
      {preQues && (
        <div className={"flex flex-col gap-2"}>
          {preQues.map((q, index) => (
            <QuestionCard
              key={index}
              Qn={q}
              onSave={(ttype, tqn, tref, tan) =>
                hadleSaveAndUpdate(index, ttype, tqn, tref, tan)
              }
            />
          ))}{" "}
        </div>
      )}
      <div className={"flex justify-center  md:justify-end   md:mr-3 "}>
        <button
          onClick={handleAdd}
          className={
            "outline-none flex flex-row gap-1 items-center py-1.5 w-20    font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
          }
        >
          <PlusSmIcon className={"w-4 h-4"} />
          ADD
        </button>
      </div>
    </div>
  );
}

function QuestionCard({ Qn, onSave }) {
  const [editMode, setEditMode] = useState(Qn?.qtext ? false : true);
  const typeRef = useRef();
  const qtxRef = useRef();
  const rRef = useRef();
  const aRef = useRef();
  const [collapse, setCollapse] = useState(Qn?.qtext);
  return (
    <div
      className={`flex flex-col  ${
        editMode ? "gap-2 " : "gap-0"
      }   md:flex-row w-full bg-coolGray-800 px-3 py-2 rounded-md text-sm`}
    >
      <div className={"flex lg:hidden w-full justify-end "}>
        {collapse ? (
          <Fdw
            onClick={() => {
              setCollapse(!collapse);
            }}
          />
        ) : (
          <Fdu
            onClick={() => {
              setCollapse(!collapse);
            }}
          />
        )}
      </div>
      <div className={`flex  md:w-1/6 ${collapse ? "hidden lg:flex" : ""} `}>
        {editMode ? (
          <input
            ref={typeRef}
            type="text"
            placeholder={"Type"}
            disabled={!editMode}
            defaultValue={Qn?.type?.typeText.toUpperCase()}
            className={`uppercase rounded-sm border focus:outline-none bg-coolGray-800 px-2 py-1.5  w-full`}
          />
        ) : (
          <div className={`bg-transparent  mt-1 mb-1   w-full`}>
            <div className={"text-gray-400 text-sm"}>TYPE</div>
            {Qn?.type?.typeText.toUpperCase()}
          </div>
        )}
      </div>
      <div className={`flex md:w-full `}>
        {editMode ? (
          <input
            ref={qtxRef}
            type="text"
            placeholder={"Question"}
            disabled={!editMode}
            defaultValue={Qn?.qtext}
            className={`rounded-sm border focus:outline-none bg-coolGray-800 m-0 px-2 py-1.5   w-full`}
          />
        ) : (
          <div className={`bg-transparent mt-1 mb-1   w-full `}>
            <div className={"text-gray-400 text-sm"}>Question</div>
            {Qn?.qtext}
          </div>
        )}
      </div>
      <div className={`flex  md:w-1/6 ${collapse ? "hidden lg:flex" : ""} `}>
        {editMode ? (
          <input
            ref={rRef}
            type="text"
            placeholder={"Reference"}
            disabled={!editMode}
            defaultValue={Qn?.reference?.toUpperCase()}
            className={`uppercase rounded-sm border focus:outline-none bg-coolGray-800 px-2 py-1.5  w-full`}
          />
        ) : (
          <div className={`bg-transparent  mt-1 mb-1   w-full`}>
            <div className={"text-gray-400 text-sm"}>REF</div>
            {Qn?.reference?.toUpperCase()}
          </div>
        )}
      </div>
      <div className={`flex  md:w-full ${collapse ? "hidden lg:flex" : ""}`}>
        {editMode ? (
          <input
            ref={aRef}
            type="text"
            placeholder={"Ans"}
            disabled={!editMode}
            defaultValue={Qn?.ans}
            className={`rounded-sm border focus:outline-none bg-coolGray-800 px-2 py-1.5  w-full`}
          />
        ) : (
          <div className={`bg-transparent  mt-1 mb-1  w-full`}>
            <div className={"text-gray-400 text-sm"}>ANS</div>
            {Qn?.ans}
          </div>
        )}
      </div>
      <div
        className={`${!editMode ? "mt-2" : ""} md:mt-0 ${
          collapse ? "hidden lg:flex" : ""
        }`}
      >
        {!editMode ? (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={
              "outline-none flex flex-row gap-1 items-center py-1.5 md:h-10  w-20  font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-rose-500 bg-opacity-80 text-warmGray-100"
            }
          >
            <PencilIcon className={"w-4 h-4"} />
            EDIT
          </button>
        ) : (
          <button
            onClick={() => {
              if (typeRef.current.value !== "" && qtxRef.current.value !== "") {
                setEditMode(!editMode);
                onSave(
                  typeRef.current.value,
                  qtxRef.current.value,
                  rRef.current.value,
                  aRef.current.value
                );
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
