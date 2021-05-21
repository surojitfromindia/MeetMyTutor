import React from "react";
import { useParams } from "react-router-dom";
import NewLessonHome from "../components/LessonCreation/NewLesson/NewLessonHome";

export default function LessonCreationPage({ gnamelist }) {
  const { gname } = useParams();
  return (
    <div className={"px-5 "}>
      <div>
        <NewLessonHome gnamelist={gnamelist} gnameP={gname} />
      </div>
    </div>
  );
}
