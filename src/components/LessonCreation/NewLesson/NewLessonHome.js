/**
 * Propmt user to create a new lesson here.
 * Also list all temporary lessons.
 * Will publish them separately
 */
import { PlusIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { MinusCircleIcon } from "@heroicons/react/outline";
import { subjectnames } from "../../../utils/subjectlist";
import CreateALesson from "./CreateALesson";
import { useRef } from "react";
import RAPI from "../../../API/RequestAPI";

/* var sD = {
  subname: "English",
  topic: [
    {
      type: { typeText: "READ" },
      des: "Read about sand storm from internet. It is an important topic. Just open a wikipedia page and read first few lines then open page 25 of your book.",
    },
  ],
}; */

export default function NewLessonHome({ gnameP, gnamelist }) {
  const [sBL, setSBL] = useState([]);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState();
  const [createdLessonPreInfo, setCreatedLessonPreInfo] = useState();

  useEffect(() => {
    // localStorage.removeItem("recentSubject");
    let groupInfo = gnamelist.filter((group) => group.group_name === gnameP)[0];
    setSelectedGroupInfo(groupInfo);
    if (groupInfo?.TempLesson) setSBL(groupInfo?.TempLesson?.allSubjects);
  }, [gnameP, gnamelist]);

  const [gname, setGname] = useState(gnameP);
  const [showsubjectNamModal, setshowSubjectNameModal] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);

  const handleGroupNameSelect = (groupName) => {
    let selectedGroupInfo = gnamelist.filter(
      (group) => group.group_name === groupName
    )[0];
    setSelectedGroupInfo(selectedGroupInfo);
    setGname(selectedGroupInfo.group_name);
    setSBL(selectedGroupInfo?.NewLesson?.allSubjects);
  };

  //open subject select dialog
  const handAddSubject = () => {
    setshowSubjectNameModal(true);
  };

  //when choosem from dialog
  //add them.
  const handleSubjectSelect = (subjectName) => {
    //check if a subject is already exist/created with this name
    //if not push the subject to the array
    let InSL = sBL.find(({ subName }) => subName === subjectName);
    if (InSL) {
      alert("Already Exist");
    } else {
      setshowSubjectNameModal(false);
      let tempA = sBL;
      tempA.push({
        subName: subjectName,
        topic: [],
        question: [],
      });
      setSBL([...tempA]);
      console.log(selectedGroupInfo._id);
      RAPI()
        .post(`/lesson/${selectedGroupInfo._id}/temp`, sBL)
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //Remove subject from list
  //also from tempdb
  const handleSubjectRemove = (subjectName) => {
    let tempA = sBL.filter((s) => s !== subjectName);
    setSBL([...tempA]);
  };

  const handleASubjectUpdate = (updateSubjectLesson) => {
    //get the index
    let b = sBL.findIndex(
      ({ subName }) => subName === updateSubjectLesson.subName
    );
    let sbLTemp = sBL;
    sbLTemp[b] = updateSubjectLesson;
    setSBL([...sbLTemp]);
    RAPI()
      .post(`/lesson/${selectedGroupInfo._id}/temp`, sBL)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  //open the subject
  //open a new link where you can add/create questions/quiz/ explnations
  const handleSubjectOpen = ({ subName }) => {
    let aSubject = sBL.filter((subject) => subject.subName === subName)[0];
    setCreatedLessonPreInfo(aSubject);
    setShowCreateLesson(true);
  };

  return (
    <div className={"flex flex-col relative min-h-screen mt-5  "}>
      <div>
        <div
          className={` ${
            gname ? "hidden" : "absolute"
          } bg-coolGray-800 bg-opacity-90  flex justify-center items-center  top-0 right-0 bottom-0 left-0`}
        >
          <AskGnameModal
            gnamelist={gnamelist}
            onSelect={handleGroupNameSelect}
          />
        </div>
        <div
          className={` ${
            showsubjectNamModal ? "fixed" : "hidden"
          } bg-coolGray-800 bg-opacity-90  flex justify-center items-center top-0 right-0 bottom-0 left-0`}
        >
          <AskSubjectNameModal
            onClose={(ev) => {
              setshowSubjectNameModal(false);
            }}
            onSelect={handleSubjectSelect}
          />
        </div>
      </div>
      <div className={"flex flex-col space-y-3"}>
        {selectedGroupInfo && <div>{selectedGroupInfo.group_name}</div>}
        <NewLessonCreateButton />
        <div>
          <CPanel
            subjects={sBL}
            onAddSubject={handAddSubject}
            onRemoveSubject={handleSubjectRemove}
            onOpenSubject={handleSubjectOpen}
          />
        </div>
        <CurrentNewLesson />
      </div>
      {createdLessonPreInfo && (
        <CreateALesson
          show={showCreateLesson}
          onSave={handleASubjectUpdate}
          onclose={() => {
            setShowCreateLesson(false);
            setCreatedLessonPreInfo(undefined);
          }}
          lessonDetails={createdLessonPreInfo}
        />
      )}
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
  const selectRef = useRef();
  useEffect(() => {
    selectRef.current.selectedIndex = -1;
  }, [gnamelist]);
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
          ref={selectRef}
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
function CPanel({ subjects, onAddSubject, onRemoveSubject, onOpenSubject }) {
  return (
    <div className={"rounded-md flex flex-col gap-3 bg-coolGray-600 px-3 py-4"}>
      <span className={"font-poppin text-lg tracking-wide"}>
        Write Lesson Down.
      </span>
      <span
        className={"font-poppin text-gray-300 max-w-lg  text-xs tracking-wide"}
      >
        Click 'Add' to create a subject lesson. You can also edit already
        created subjects by clicking edit on corrosponding subjects.
      </span>
      <div className={"flex flex-col space-y-2 mt-2"}>
        <div className={""}>
          {subjects && (
            <div className={"flex flex-col gap-2 md:flex-row md:flex-wrap"}>
              {subjects.map((s) => (
                <SubjectCard
                  key={s.subName}
                  tempSubjectDetails={s}
                  onRemove={() => {
                    onRemoveSubject(s);
                  }}
                  onOpen={() => {
                    onOpenSubject(s);
                  }}
                />
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

function SubjectCard({ tempSubjectDetails, onRemove, onOpen }) {
  const handleSubjectCardClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onOpen();
  };
  const handleRemove = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onRemove();
  };
  return (
    <div
      onClick={handleSubjectCardClick}
      className={
        " flex-shrink-0 flex flex-col  space-y-3  bg-coolGray-700 px-4 py-4 rounded"
      }
    >
      <div className={"flex flex-row justify-between"}>
        <div className={"text-xl tracking-wider text-orange-300"}>
          {tempSubjectDetails?.subName}
        </div>
        <div onClick={handleRemove} className={"cursor-pointer"}>
          <MinusCircleIcon className={"h-5 w-5"} />
        </div>
      </div>
      <div className={"flex flex-row gap-2 text-sm flex-wrap"}>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>TASK(S)</span>
          <span className={"text-gray-300 font-poppin text-lg"}>
            {" "}
            {tempSubjectDetails?.topic.length}{" "}
          </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>QUESTION(S)</span>
          <span className={"text-gray-300 font-poppin text-lg"}>
            {" "}
            {tempSubjectDetails?.question.length}{" "}
          </span>
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
    if (ev.target.value !== "") {
      onSelect(ev.target.value);
      pushPrefSubject(ev.target.value);
      setPrefSubject(getPreSubjects());
    }
  };
  const handleSelectFromPref = (ev) => {
    if (ev.target.value !== "") onSelect(ev.target.id);
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
          <option value=" ">--Subject--</option>
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
