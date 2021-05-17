import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RAPI from "../API/RequestAPI";
import PrgBar from "../components/CommonComponents/PrgBar";
import AllNewStudy from "../components/StudyGroupCard.js/AllNewStudy";

//A group
export default function NewLesson() {
  const { groupId } = useParams();
  const [pV, setPv] = useState(0);
  const [max, setMax] = useState(100);
  const [groupInfo, setGroupInfo] = useState();

  //pull new lesson
  useEffect(() => {
    (async () => {
      await RAPI().get(`/lesson/${groupId}/pull`);
    })();
  }, [groupId]);

  //pull whole group info
  useEffect(() => {
    (async () => {
      let { data } = await RAPI().get(`/lesson/${groupId}?time=all`);
      setGroupInfo(data);
    })();
  }, [groupId]);

  //update the progress
  useEffect(() => {
    if (groupInfo) {
      let max = groupInfo.NewLesson.allSubjects.reduce(
        (a, x) => a + x.topic.length,
        0
      );
      let val = groupInfo.NewLesson.allSubjects.reduce(
        (a, sub) =>
          a + sub.topic.filter((onetopic) => onetopic.done === true).length,
        0
      );
      setMax(max);
      setTimeout(() => {
        setPv(val);
      }, 400);
    }
  }, [groupInfo]);

  return (
    <div className={"px-5 py-5 mt-3"}>
      <div className={"w-60 sm:w-80  bg-coolGray-800 "}>
        <div>
          <div className={"font-robotoCondensed text-2xl text-red-300"}>
            NEW LESSONS
          </div>
          <div
            className={"text-xl font-medium tracking-wide  mb-1.5 text-red-400"}
          >
            <span className={"text-base"}>Your</span>{" "}
            <span className={"text-sm"}>Proggress</span>
          </div>
          <PrgBar max={max} value={pV} min={0} />
        </div>
      </div>
      <div className={"mt-10"}>
        {groupInfo && (
          <AllNewStudy
            AllSubjects={groupInfo.NewLesson.allSubjects}
            gid={groupId}
          />
        )}
      </div>
    </div>
  );
}
