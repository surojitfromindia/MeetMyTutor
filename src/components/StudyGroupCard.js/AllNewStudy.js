import React from "react";
import MoreDeatilsOnSubject from "./MoreDeatilsOnSubject";
import SubjectStudy from "./SubjectStudy";

export default function AllNewStudy({ AllSubjects, gid }) {
  return (
    <div className={"flex flex-col gap-3"}>
      <div
        className={
          "rounded-md  shadow-xl grid  gap-4 divide-y sm:divide-y-0 divide-green-500 divide-opacity-40 px-5   bg-green-700 "
        }
      >
        {AllSubjects &&
          AllSubjects.map((subject) => (
            <SubjectStudy subjectData={subject} key={subject.subName} />
          ))}
      </div>
      <div className={"text-3xl mt-5 text-gray-100"}>Topics</div>
      <div
        className={"grid   gap-4"}
      >
        {AllSubjects.map((subject) => (
          <MoreDeatilsOnSubject
            subjectData={subject}
            key={subject.subName}
            isDone={subject?.done}
            gid={gid}
          />
        ))}
      </div>
    </div>
  );
}
