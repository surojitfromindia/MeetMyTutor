import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeftIcon as MCI,
  PencilIcon,
  SaveIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";
import Spinner from "../../CommonComponents/Spinner";
import { FaChevronDown as Fdw, FaChevronUp as Fdu } from "react-icons/fa";

export default function CreateALesson({
  lessonDetails,
  onclose,
  show = true,
  onSave,
  ustatus,
}) {
  const [topics, setTopics] = useState(lessonDetails.topic);
  const [questions, setQuestions] = useState(lessonDetails.question);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentOpenTab, setCurrentOpenTab] = useState();
  useEffect(() => {
    switch (tabIndex) {
      case 2:
        setCurrentOpenTab(<div>Quiz</div>);
        break;
      case 0:
        setCurrentOpenTab(
          <QuestionTab
            preQue={questions}
            onQueUpdate={(g) => {
              setQuestions([...g]);
            }}
          />
        );
        break;
      case 1:
        setCurrentOpenTab(
          <TopicTab
            preTopic={topics}
            onTopicUpdate={(g) => {
              setTopics([...g]);
            }}
          />
        );
        break;
      default:
        setCurrentOpenTab(<div>Quiz</div>);
    }
  }, [tabIndex, lessonDetails, topics, questions]);

  const tabs = ["Questions", "Topics", "Quizs", "Notes"];
  const handleTabItemChanged = (index) => {
    setTabIndex(index);
  };

  const handleMegaSave = () => {
    let updatedLessonDetails = lessonDetails;
    //fillter out non-emptytopics
    let nonEmptyTopics = topics.filter(({ des }) => des !== "");
    let nonEmptyQuestions = questions.filter(({ qtext }) => qtext !== "");

    updatedLessonDetails.topic = nonEmptyTopics;
    updatedLessonDetails.question = nonEmptyQuestions;
    onSave(updatedLessonDetails);
  };
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } bg-gray-900 bg-opacity-80 flex flex-col justify-between   shadow-xl  inset-0  `}
    >
      <div
        className={`${
          show ? "fixed" : "hidden"
        } bg-coolGray-700 flex flex-col justify-between   shadow-xl overflow-y-auto bottom-5 top-5 inset-x-2   lg:inset-20 rounded-md`}
      >
        <div className={"overflow-y-auto scrollbar"}>
          <div className={"sticky top-0 bg-coolGray-700 px-3 pt-3 "}>
            <div className={"flex justify-between"}>
              <div className={"flex  items-center gap-2 mb-3"}>
                <button
                  onClick={(ev) => {
                    onclose();
                  }}
                  className={
                    "bg-coolGray-800 rounded-full px-2 py-2 focus:outline-none focus:shadow-2xl hover:shadow-2xl hover:bg-coolGray-500 focus:bg-coolGray-500 "
                  }
                >
                  <MCI className={"h-3 w-3"} />
                </button>

                <div className={"text-xl font-robotoCondensed tracking-widest"}>
                  {lessonDetails?.subName.toUpperCase()}
                </div>
              </div>
            </div>

            <div>
              <Tab children={tabs} onTabItemChanged={handleTabItemChanged} />
            </div>
          </div>
          <div className={"px-3 pb-3"}>{currentOpenTab && currentOpenTab}</div>
        </div>

        <div className={"flex flex-col"}>
          <div className={"flex  transition-all ease-in-out  max-h-16 "}></div>
          <button
            className={
              "outline-none flex-shrink-0 flex flex-row items-center  font-medium text-sm  tracking-wider focus:outline-none    rounded-sm hover:bg-opacity-95 bg-teal-500 bg-opacity-80 text-warmGray-100"
            }
          >
            {!ustatus ? (
              <div
                onClick={handleMegaSave}
                className={"flex gap-1 items-center w-full h-10 px-2.5"}
              >
                <SaveIcon className={"w-4 h-4"} />
                SAVE
              </div>
            ) : (
              <div
                className={
                  "flex h-10  items-center justify-start gap-1 px-2.5 "
                }
              >
                <Spinner size={20} color={"white"} />
                <div className={"tracking-widest"}>Saving...</div>
              </div>
            )}
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

function Tab({
  align = "flex-row",
  onTabItemChanged,
  children = ["Quiz", "Question"],
}) {
  const [current, setcurrent] = useState(0);
  const handleTabChange = (index) => {
    setcurrent(index);
    onTabItemChanged(index);
  };
  return (
    <div>
      <div className={`flex ${align}  font-robotoCondensed`}>
        {children.map((tabItem, index) => (
          <div
            id={index}
            key={index}
            onClick={() => {
              handleTabChange(index);
            }}
            className={` cursor-pointer  px-3 py-1 text-center tracking-wider ${
              index === current
                ? "text-emerald-300 bg-coolGray-800 border-b-2 border-emerald-300"
                : "text-gray-300"
            }`}
          >
            {tabItem}
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicTab({ preTopic, onTopicUpdate }) {
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

function QuestionTab({ preQue, onQueUpdate }) {
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
