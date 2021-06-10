/**
 * Propmt user to create a new lesson here.
 * Also list all temporary lessons.
 * Will publish them separately
 */
import {
  PlusIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { UploadIcon, ExclamationIcon } from "@heroicons/react/outline";
import { subjectnames } from "../../../utils/subjectlist";
import CreateALesson from "./CreateALesson";
import { useRef } from "react";
import RAPI from "../../../API/RequestAPI";
import LessonTimeline from "../LessonTimeline";
import { Warning, Tips } from "../../CommonComponents/Suggestion";
import Spinner from "../../CommonComponents/Spinner";

export default function NewLessonHome({ gnameP, gnamelist }) {
  const [sBL, setSBL] = useState([]);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState();
  const [createdLessonPreInfo, setCreatedLessonPreInfo] = useState();
  const [updateInfo, setUpdateInfo] = useState("NONE");

  useEffect(() => {
    let groupInfo = gnamelist.filter((group) => group.group_name === gnameP)[0];
    setSelectedGroupInfo(groupInfo);
    if (groupInfo?.TempLesson) setSBL(groupInfo?.TempLesson?.allSubjects);
  }, [gnameP, gnamelist]);

  const [gname, setGname] = useState(gnameP);
  const [showsubjectNamModal, setshowSubjectNameModal] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showConfirmModa, setConfirmModal] = useState(false);
  const [cModalChilds, setCModalChilds] = useState();
  const [isSubjectUpdate, setisSubjectUpdate] = useState(false);
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
      setUpdateInfo(`1 SUBJECT ${subjectName} ADDED. `);
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
    setUpdateInfo(`1 SUBJECT ${subjectName.subName} REMOVED. `);
    let tempA = sBL.filter((s) => s !== subjectName);
    setSBL([...tempA]);
  };

  const handleASubjectUpdate = async (updateSubjectLesson) => {
    setisSubjectUpdate(true);
    //get the index
    let b = sBL.findIndex(
      ({ subName }) => subName === updateSubjectLesson.subName
    );
    let sbLTemp = sBL;
    sbLTemp[b] = updateSubjectLesson;
    setSBL([...sbLTemp]);
    try {
      await RAPI().post(`/lesson/${selectedGroupInfo._id}/temp`, sBL);
      setisSubjectUpdate(false);
    } catch (err) {}
  };

  const handleFinalize = () => {
    setUpdateInfo(`${sBL.length} SUBJECT(S) FINALIZED`);
    RAPI()
      .post(`/lesson/${selectedGroupInfo._id}/temp`, sBL)
      .then((res) => console.log(res.data))
      .catch((err) => {});
  };
  //open the subject
  //open a new link where you can add/create questions/quiz/ explnations
  const handleSubjectOpen = ({ subName }) => {
    let aSubject = sBL.filter((subject) => subject.subName === subName)[0];
    setCreatedLessonPreInfo(aSubject);
    setShowCreateLesson(true);
  };

  const handlePublishConfirm = () => {
    setConfirmModal(false);
    setUpdateInfo(
      <span className={"inline-flex items-center space-x-1"}>
        <span>Publishing</span> <Spinner size={20} color={"white"} />
      </span>
    );
    RAPI()
      .put(`/lesson/${selectedGroupInfo._id}/publish`)
      .then((_) => {
        setUpdateInfo(
          <span className={"inline-flex items-center space-x-1"}>
            <span>Successfully Published</span>
            <CheckCircleIcon className={"h-5 w-5"} />
          </span>
        );
      })
      .catch((_) =>
        setUpdateInfo(
          <span className={"inline-flex items-center space-x-1"}>
            <span>Publish Faild</span>
            <ExclamationIcon className={"ml-1.5 h-5 w-5 text-yellow-400"} />
          </span>
        )
      );
  };

  const handleSubjectPublish = () => {
    setConfirmModal(true);
    setCModalChilds(<PublishConfirm handlePublishOK={handlePublishConfirm} />);
  };
  return (
    <div className={"flex flex-col relative min-h-screen mt-5  "}>
      <div>
        <div
          className={` ${
            gname ? "hidden" : "fixed"
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
          } bg-gray-900 bg-opacity-80  flex justify-center items-center top-0 right-0 bottom-0 left-0`}
        >
          <AskSubjectNameModal
            onClose={(ev) => {
              setshowSubjectNameModal(false);
            }}
            onSelect={handleSubjectSelect}
          />
        </div>
        <div
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setConfirmModal(false);
          }}
          className={`z-10 ${
            showConfirmModa ? "fixed" : "hidden"
          } bg-gray-900 bg-opacity-80  flex justify-center items-center top-0 right-0 bottom-0 left-0`}
        >
          <ConfirmationModal child={cModalChilds} />
        </div>
      </div>
      <div className={"flex flex-col space-y-3"}>
        {selectedGroupInfo && (
          <div className={"text-2xl "}>{selectedGroupInfo.group_name}</div>
        )}
        <NewLessonCreateButton />
        <div>
          <LessonTimeline />
        </div>
        <div>
          <CPanel
            subjects={sBL}
            onAddSubject={handAddSubject}
            onRemoveSubject={handleSubjectRemove}
            onOpenSubject={handleSubjectOpen}
            onFinalUpdate={handleFinalize}
            onPublish={handleSubjectPublish}
            updateMessage={updateInfo}
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
          ustatus={isSubjectUpdate}
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
function CPanel({
  subjects,
  onAddSubject,
  onPublish,
  onRemoveSubject,
  onOpenSubject,
  onFinalUpdate,
  updateMessage = "NONE",
}) {
  return (
    <div className={"overflow-y-auto"}>
      <div className={" rounded-t-md  flex-col gap-3 bg-emerald-700 py-2 "}>
        <span className={"px-3 "}>{updateMessage}</span>
      </div>
      <div
        className={"rounded-b-md flex flex-col gap-3 bg-emerald-800 px-3 py-4"}
      >
        <div className={"flex flex-row justify-between"}>
          <span className={"font-poppin text-lg tracking-wide"}>
            Write Lesson Down.
          </span>
          <button
            onClick={onPublish}
            className={
              "outline-none flex items-center gap-1  font-medium text-sm  tracking-wider focus:outline-none  px-2 py-1.5  rounded-md hover:bg-opacity-95 bg-emerald-700 bg-opacity-80 text-warmGray-100"
            }
          >
            <UploadIcon className={"h-5 w-5"} />
            PUBLISH
          </button>
        </div>
        <div>
          <Tips
            bgc={"bg-emerald-700"}
            tips={
              "To finalize new created subject please confirm by pressing update button. To publish these lessons as new lesson click the publish button"
            }
          />
        </div>

        <span
          className={
            "font-poppin text-gray-300 max-w-lg  text-xs tracking-wide"
          }
        >
          Click 'Add' to create a subject lesson. You can also edit already
          created subjects by clicking edit on corrosponding subjects.
        </span>
        <div className={"flex flex-col space-y-2 mt-2"}>
          <div className={"max-h-[25em] scrollbar overflow-y-auto"}>
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
          <div className={"flex flex-row items-center gap-2"}>
            <button
              onClick={onAddSubject}
              className={
                "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1.5  rounded-md hover:bg-opacity-95 bg-gray-100 bg-opacity-80 text-emerald-600"
              }
            >
              Add
            </button>
            <button
              onClick={onFinalUpdate}
              className={
                "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-1.5  rounded-md hover:bg-opacity-95 bg-yellow-500 bg-opacity-80 text-gray-50"
              }
            >
              Update
            </button>
          </div>
        </div>
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
        " flex-shrink-0 flex flex-col  space-y-3  bg-emerald-700 shadow-md px-4 py-4 rounded"
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
      <div className={"flex flex-row gap-4 text-sm flex-wrap"}>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>TASK(S)</span>
          <span className={"text-gray-300 font-poppin text-sm"}>
            {" "}
            {tempSubjectDetails?.topic.length}{" "}
          </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>QUES(S)</span>
          <span className={"text-gray-300 font-poppin text-sm"}>
            {" "}
            {tempSubjectDetails?.question.length}{" "}
          </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>QUIZ(S)</span>
          <span className={"text-gray-300 font-poppin text-sm"}> 0 </span>
        </div>
        <div className={"flex flex-col space-y"}>
          <span className={"text-gray-200 tracking-wide"}>EXPL(S)</span>
          <span className={"text-gray-300 font-poppin text-sm"}> 0 </span>
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
          " w-80 px-5 py-4 space-y-2 flex justify-center  flex-col bg-emerald-600 rounded-md"
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
                  "font-robotoCondensed cursor-pointer bg-emerald-700 text-sm px-1.5 py-0.5 rounded-md"
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

const ConfirmationModal = ({ child }) => {
  return <div>{child}</div>;
};

const PublishConfirm = ({ handlePublishOK }) => {
  return (
    <div className={"px-5 rounded-md py-4 bg-coolGray-700 mx-10"}>
      <Warning
        warn={
          "This will force these lesson to be published as a new lesson overriding the old lessons. Student's will recived the update as soon as they logged in."
        }
      />

      <button
        onClick={handlePublishOK}
        className={
          "outline-none ml-8 flex items-center gap-1  font-medium text-sm  tracking-wider focus:outline-none  px-2 py-1.5  rounded-md hover:bg-opacity-95 bg-coolGray-800  bg-opacity-80 text-warmGray-100"
        }
      >
        PUBLISH
      </button>
    </div>
  );
};
