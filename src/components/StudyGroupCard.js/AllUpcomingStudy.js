import React from "react";
import SubjectStudy from "./SubjectStudy";

export default function AllUpcomingStudy({ lesson }) {
 
  
  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"text-3xl mt-5 text-gray-100"}>Soon...</div>
      <div
        className={
          "rounded-md shadow-xl flex gap-3 flex-wrap divide-y sm:divide-y-0 divide-red-400 px-5  bg-gradient-to-br from-rose-500  to-red-400"
        }
      >
        {lesson.map((subject) => (
          <SubjectStudy subjectData={subject} key={subject.subName} />
        ))}
      </div>
    </div>
  );
}
