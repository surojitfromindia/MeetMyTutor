import { Questions, Topic, TypeLegends, Quuuiz } from "../OneStudy/OneStudyExp";

export default function NewStudyDetails({ Subject, onTopicComplete }) {
  return (
    <div className={"flex w-full mt-5 space-y-5  flex-col md:w-3/4 lg:w-2/4 "}>
      <span className={"text-3xl font-semibold text-opacity-80 text-teal-300 "}>
        {Subject.subName}
      </span>

      <div>
        {Subject.topic && (
          <Topic topics={Subject.topic} onTopicComplete={onTopicComplete} />
        )}
      </div>
      <div className={""}>
        {Subject.question.length > 0 && (
          <Questions questions={Subject.question} />
        )}
      </div>
      <div>
        <Quuuiz />
      </div>
      <div>
        <TypeLegends />
      </div>
    </div>
  );
}
