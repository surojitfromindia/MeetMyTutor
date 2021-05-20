import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RAPI from "../API/RequestAPI";

import Greet from "../components/CommonComponents/Greet";
import OldStudyCard from "../components/HomePageComponents/OldStudyCard";
import UpcomigCard from "../components/HomePageComponents/UpcomigCard";
import NewStudyCard from "../components/HomePageComponents/NewStudyCard";

export default function AllLesson() {
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
    <div className={"px-5 py-5 mt-3"}>
      {groupInfoFromStudyGroup && (
        <Greet
          heading="Hey, Ready to Roll !"
          backG="to-rose-500 from-red-400"
          groupName={groupInfoFromStudyGroup.group_name}
        />
      )}

      <div
        className={
          "mt-10 grid gap-5  sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4"
        }
      >
        {groupInfo?.NewLesson && (
          <NewStudyCard
            gid={groupId}
            lesson={groupInfo.NewLesson.allSubjects}
          />
        )}
        {groupInfo?.NewLesson && (
          <UpcomigCard gid={groupId} lesson={groupInfo.NewLesson.allSubjects} />
        )}
        {groupInfo && <OldStudyCard />}
      </div>
    </div>
  ) : (
    <div className={"flex h-screen justify-center items-center"}>
      UnAuthorised
    </div>
  );
}
