import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RAPI from "../API/RequestAPI";
import NewStudyDetails from "../components/SubjectsAssemble/NewStudyDetails";
import Spinner from "../components/CommonComponents/Spinner";
export default function PerSubject() {
  const { groupId, subject } = useParams();
  const [LessonInfo, setLessonInfo] = useState();
  const [subjectInfo, setSubjectInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { data } = await RAPI().get(`/lesson/${groupId}?time=new`);
      setLessonInfo(data);
    })();
  }, [groupId]);
  //fillter only the subject
  useEffect(() => {
    if (LessonInfo) {
      let fs = LessonInfo.allSubjects.filter((s) => s.subName === subject)[0];
      setSubjectInfo(fs);
      setIsLoading(false);
    }
  }, [LessonInfo, subject]);

  const handleTopicCheck = async (updateTopic) => {
    await RAPI().post(`/lesson/${groupId}/update/${subject}`, updateTopic);
  };

  return (
    <div className={"py-3 px-5  flex justify-center items-center"}>
      {isLoading ? (
        <div className={"flex space-x-2 items-center justify-center h-screen"}>
          <Spinner />
          <div>Loading...</div>
        </div>
      ) : (
        subjectInfo && (
          <NewStudyDetails
            Subject={subjectInfo}
            onTopicComplete={handleTopicCheck}
          />
        )
      )}
    </div>
  );
}
