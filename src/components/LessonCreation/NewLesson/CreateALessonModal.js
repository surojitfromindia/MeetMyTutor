import React, { useState, useEffect } from "react";
import { ChevronLeftIcon as MCI, SaveIcon } from "@heroicons/react/outline";
import Spinner from "../../CommonComponents/Spinner";
import Tab from "./Components/Tab";
import TopicTab from "./Components/TopicTab";
import QuestionTab from "./Components/QuestionTab";

export default function CreateANewLessonModal({
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
              "outline-none flex-shrink-0 flex flex-row items-center  font-medium text-sm  tracking-wider focus:outline-none    rounded-sm hover:bg-opacity-95 bg-emerald-600  text-warmGray-100"
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
