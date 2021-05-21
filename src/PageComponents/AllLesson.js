import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RAPI from "../API/RequestAPI";

import Greet from "../components/CommonComponents/Greet";
import OldStudyCard from "../components/HomePageComponents/OldStudyCard";
import UpcomigCard from "../components/HomePageComponents/UpcomigCard";
import NewStudyCard from "../components/HomePageComponents/NewStudyCard";
import JoinedGroupList from "../components/HomeComponents/JoinedGroupList";

export default function AllLesson({ groupInformation }) {
  const { groupId } = useParams();
  const [authorised, setAuthorised] = useState(true);
  const [groupInfo, setGroupInfo] = useState();
  const [groupInfoFromStudyGroup, setgroupInfoFromStudyGroup] = useState();

  //pull new lesson
  useEffect(() => {
    (async () => {
      try {
        await RAPI().get(`/lesson/${groupId}/pull`);
      } catch (err) {
        setAuthorised(false);
      }
    })();
  }, [groupId]);

  //pull whole group info from usered copied part
  useEffect(() => {
    if (authorised)
      (async () => {
        let { data } = await RAPI().get(`/lesson/${groupId}?time=all`);
        setGroupInfo(data);
      })();
  }, [groupId, authorised]);

  useEffect(() => {
    if (authorised)
      (async () => {
        let { data } = await RAPI().get(`/group/${groupId}`);
        setgroupInfoFromStudyGroup(data);
      })();
  }, [groupId, authorised]);

  return authorised ? (
    <div
      className={
        "px-5 py-3 md:gap-2 flex h-full md:h-screen  flex-col md:flex-row "
      }
    >
      <div
        className={
          "hidden md:rounded-md md:flex  top-0 left-0 bottom-0 overflow-y-auto scrollbar min-w-max px-3"
        }
      >
        <div> {<JoinedGroupList glist={groupInformation} />}</div>
      </div>

      <div>
        {groupInfoFromStudyGroup && (
          <Greet
            heading="Hey, Ready to Roll !"
            backG="to-rose-500 from-red-400"
            groupName={groupInfoFromStudyGroup.group_name}
          />
        )}

        <div
          className={
            "mt-2 grid gap-3  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-2"
          }
        >
          {groupInfo?.NewLesson && (
            <NewStudyCard
              gid={groupId}
              lesson={groupInfo.NewLesson.allSubjects}
            />
          )}
          {groupInfo?.NewLesson && (
            <UpcomigCard
              gid={groupId}
              lesson={groupInfo.NewLesson.allSubjects}
            />
          )}
          {groupInfo && <OldStudyCard />}
        </div>
      </div>
    </div>
  ) : (
    <div className={"flex h-screen justify-center items-center"}>
      UnAuthorised
    </div>
  );
}
