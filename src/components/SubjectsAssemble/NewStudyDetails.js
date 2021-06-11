import {
  Questions,
  Topic,
  TypeLegends,
  Quuuiz,
  Answear,
} from "../OneStudy/OneStudyExp";
import { useState } from "react";

export default function NewStudyDetails({ Subject, onTopicComplete }) {
  const [showAnsModal, setShowModal] = useState(false);
  const [launchingAns, setLaunchingAns] = useState();
  const [id, setid] = useState(0);
  const handleModalOpenAndSet = (idx) => {
    setShowModal(true);
    setLaunchingAns(Subject.question[idx]);
    setid(idx);
  };
  return (
    <div className={"flex items-center justify-center w-full "}>
      <div
        className={`z-10 ${
          showAnsModal ? "fixed" : "hidden"
        } bg-coolGray-800 bg-opacity-90  flex justify-center items-center  top-0 right-0 bottom-0 left-0`}
      >
        <Answear
          onclose={() => {
            setShowModal(false);
          }}
          q={launchingAns}
          qlist={Subject.question}
          laid={id}
        />
      </div>
      <div
        className={
          "flex relative w-full mt-5 space-y-5  flex-col md:w-3/4 lg:w-2/4"
        }
      >
        <span
          className={"text-3xl font-semibold text-opacity-80 text-teal-300 "}
        >
          {Subject.subName}
        </span>

        <div>
          {Subject.topic && (
            <Topic topics={Subject.topic} onTopicComplete={onTopicComplete} />
          )}
        </div>
        <div className={""}>
          {Subject.question.length > 0 && (
            <Questions
              questions={Subject.question}
              onShowAnsClick={handleModalOpenAndSet}
            />
          )}
        </div>
        <div>
          <Quuuiz />
        </div>
        <div>
          <TypeLegends />
        </div>
      </div>
    </div>
  );
}
