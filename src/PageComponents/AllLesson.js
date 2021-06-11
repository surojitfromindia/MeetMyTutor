import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RAPI from "../API/RequestAPI";

import Greet from "../components/CommonComponents/Greet";
import OldStudyCard from "../components/HomePageComponents/OldStudyCard";
import UpcomigCard from "../components/HomePageComponents/UpcomigCard";
import NewStudyCard from "../components/HomePageComponents/NewStudyCard";
import JoinedGroupList from "../components/HomeComponents/JoinedGroupList";
import Spinner from "../components/CommonComponents/Spinner";

export default function AllLesson({ groupInformation }) {
  const { groupId } = useParams();
  const [authorised, setAuthorised] = useState(true);
  const [groupInfo, setGroupInfo] = useState();
  const [groupInfoFromStudyGroup, setgroupInfoFromStudyGroup] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  //pull new lesson
  useEffect(() => {
    (async () => {
      try {
        await RAPI().get(`/lesson/${groupId}/pull`);
      } catch (err) {
        setAuthorised(false);
      }
      setIsLoaded(true);
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

  if (!isLoaded)
    return (
      <div className={"py-3 px-5  flex justify-center items-center"}>
        <div className={"flex space-x-2 items-center justify-center h-screen"}>
          <Spinner />
          <div>Loading...</div>
        </div>
      </div>
    );

  return authorised ? (
    <div
      className={
        "px-5 py-3 md:gap-2 flex h-full md:h-screen  flex-col md:flex-row "
      }
    >
      <div
        className={
          "hidden md:rounded-md md:flex  md:max-w-min md:min-w-min overflow-y-auto scrollbar px-3"
        }
      >
        <div> {<JoinedGroupList glist={groupInformation} />}</div>
      </div>

      <div className={"overflow-y-auto scrollbar"}>
        {groupInfoFromStudyGroup && (
          <Greet
            heading="Hey, Ready to Roll !"
            backG="to-rose-500 from-red-400"
            groupName={groupInfoFromStudyGroup.group_name}
          />
        )}

        <div className={"mt-2  grid  gap-2  lg:grid-cols-2  xl:grid-cols-3 "}>
          {groupInfo?.NewLesson && (
            <NewStudyCard
              gid={groupId}
              lesson={groupInfo.NewLesson.allSubjects}
            />
          )}
          {/*groupInfo?.NewLesson && (
            <UpcomigCard
              gid={groupId}
              lesson={groupInfo.NewLesson.allSubjects}
            />
          )*/}
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
