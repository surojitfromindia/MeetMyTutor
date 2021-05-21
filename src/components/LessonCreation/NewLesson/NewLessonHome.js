/**
 * Propmt user to create a new lesson here.
 * Also list all temporary lessons.
 * Will publish them separately
 */
import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { MinusCircleIcon } from "@heroicons/react/outline";
import { subjectnames } from "../../../utils/subjectlist";

export default function NewLessonHome({ gnameP, gnamelist }) {
  const [gname] = useState(gnameP);
  const [showsubjectNamModal, setshowSubjectNameModal] = useState(false);
  const [, setSelectedGroupInfo] = useState();
  const [sBL, setSBL] = useState([]);

  const handleGroupNameSelect = (groupName) => {
    let selectedGroupInfo = gnamelist.filter(
      (group) => group.group_name === groupName
    )[0];
    setSelectedGroupInfo(selectedGroupInfo);
    console.log(selectedGroupInfo);
  };
  const handleSubjectSelect = (subjectName) => {
    if (sBL.includes(subjectName)) {
      alert("Already Exist");
    } else {
      setshowSubjectNameModal(false);
      let tempA = sBL;
      tempA.push(subjectName);
      setSBL([...tempA]);
    }
  };

  const handAddSubject = () => {
    setshowSubjectNameModal(true);
  };

  return (
    <div className={"flex flex-col  space-y-3 relative "}>
      <div
        className={` ${
          gname ? "hidden" : "absolute"
        } bg-coolGray-800 bg-opacity-90  flex justify-center items-center  top-0 right-0 bottom-0 left-0`}
      >
        <AskGnameModal gnamelist={gnamelist} onSelect={handleGroupNameSelect} />
      </div>
      <div
        className={` ${
          showsubjectNamModal ? "absolute" : "hidden"
        } bg-coolGray-800 bg-opacity-90  flex justify-center items-center top-0 right-0 bottom-0 left-0`}
      >
        <AskSubjectNameModal
          onClose={(ev) => {
            setshowSubjectNameModal(false);
          }}
          onSelect={handleSubjectSelect}
        />
      </div>
      <NewLessonCreateButton />
      <div>
        <CPanel subjects={sBL} onAddSubject={handAddSubject} />
      </div>
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

//will hold subject panel with edit button
//this will open a dialog with a question which subject name to be added.
function CPanel({ subjects, onAddSubject }) {
  return (
    <div className={"rounded-md flex flex-col bg-coolGray-600 px-5 py-2"}>
      <span className={"font-poppin text-lg tracking-wide"}>
        Write Lesson Down.
      </span>
      <span
        className={"font-poppin text-gray-300 max-w-lg  text-sm tracking-wide"}
      >
        Click 'Add' to create a subject lesson. You can also edit already
        created subjects by clicking edit on corrosponding subjects.
      </span>
      <div className={"flex flex-col space-y-2 mt-5"}>
        <div className={""}>
          {subjects && (
            <div className={"flex flex-col gap-2 md:flex-row md:flex-wrap"}>
              {subjects.map((s) => (
                <SubjectCard key={s} tempSubjectDetails={s} />
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onAddSubject}
          className={
            "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1.5  rounded-md hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}

function SubjectCard({ tempSubjectDetails }) {
  return (
    <div
      className={
        "md:w-1/3 flex-shrink-0 flex flex-col  space-y-3  bg-coolGray-700 px-4 py-4 rounded"
      }
    >
      <div className={"flex flex-row justify-between"}>
        <div className={"text-xl tracking-wider text-orange-300"}>
          {tempSubjectDetails}
        </div>
        <div>
          <MinusCircleIcon className={"h-5 w-5"} />
        </div>
      </div>
      <div className={"flex flex-row gap-2 text-sm flex-wrap"}>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>TASK(S)</span>
          <span className={"text-gray-300 font-poppin text-lg"}> 4 </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>QUESTION(S)</span>
          <span className={"text-gray-300 font-poppin text-lg"}> 10 </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>QUIZ(S)</span>
          <span className={"text-gray-300 font-poppin text-lg"}> 20 </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>EXPLANATION(S)</span>
          <span className={"text-gray-300 font-poppin text-lg"}> 4 </span>
        </div>
      </div>
      <div className={"flex flex-row gap-2 flex-wrap text-sm"}>
        <div className={""}>
          <span className={"tracking-wider"}>CREATED</span> :{" "}
          <span className={"text-orange-300"}> A Author</span>
        </div>
        <div>
          <span className={"tracking-wide"}>LAST EDIT</span> :{" "}
          <span className={"text-orange-300 "}> B Author</span>
        </div>
      </div>
    </div>
  );
}

function AskSubjectNameModal({ onSelect, onClose }) {
  const [prefSubjects, setPrefSubject] = useState(getPreSubjects());
  const handleSelect = (ev) => {
    onSelect(ev.target.value);
    pushPrefSubject(ev.target.value);
    setPrefSubject(getPreSubjects());
  };
  const handleSelectFromPref = (ev) => {
    onSelect(ev.target.id);
    console.log(ev.target.id);
  };
  return (
    <div>
      <div
        className={
          " w-80 px-5 py-4 space-y-2 flex justify-center  flex-col bg-lightBlue-500 rounded-md"
        }
      >
        <span className={"text-xl  font-poppin"}>Select A subject</span>
        <select
          onChange={handleSelect}
          className={"text-gray-600 w-56 px-2 py-1.5 font-robotoCondensed"}
        >
          {subjectnames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div>
          <span>Recent Added</span>
          <div className={"flex flex-wrap gap-2"}>
            {prefSubjects.map((sub, idx) => (
              <div
                id={sub}
                key={idx}
                onClick={handleSelectFromPref}
                className={
                  "font-robotoCondensed cursor-pointer bg-lightBlue-600 text-sm px-1.5 py-0.5 rounded-md"
                }
              >
                {sub}
              </div>
            ))}
          </div>
        </div>

        <MinusCircleIcon onClick={onClose} className={"h-6  w-6"} />
      </div>
    </div>
  );
}

//check if length is 10, then shift one time from arry.

function pushPrefSubject(subjectToAdd) {
  let recentlyAdd = localStorage.getItem("recentSubject");
  if (recentlyAdd !== null) {
    let sArr = JSON.parse(recentlyAdd);
    if (!sArr.includes(subjectToAdd))
      if (sArr.length > 10) {
        sArr.shift();
        sArr.push(subjectToAdd);
      } else {
        sArr.push(subjectToAdd);
      }
    localStorage.setItem("recentSubject", JSON.stringify(sArr));
  } else localStorage.setItem("recentSubject", JSON.stringify([subjectToAdd]));
}

function getPreSubjects() {
  let recentlyAdd = localStorage.getItem("recentSubject");
  let rA = [];
  if (recentlyAdd !== null) {
    rA = JSON.parse(recentlyAdd);
  }
  return rA;
}
