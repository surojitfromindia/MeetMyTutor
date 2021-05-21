/**
 * List Everything about this group
 */
import { TeacherList } from "./CreateNewGroup";
import CreatedGroupList from "../components/HomeComponents/CreatedGroupList";
import {
  Route,
  Switch,
  useRouteMatch,
  NavLink,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import { useEffect, useState } from "react";
import RAPI from "../API/RequestAPI";

export default function CreatedGroupDetails({
  onDelete,
  onTeacherUpdate,
  ginfoP,
  createdGroupInfomation,
  onCGCOpenClick,
}) {
  const history = useHistory();
  const { path, url, params } = useRouteMatch();
  const [ginfo, setGInfo] = useState(ginfoP);
  const [studenIds, setStudentIds] = useState(ginfoP?.studentsId);
  const [teacherIds, setTeacherIds] = useState(ginfoP?.teachersId);
  const [listOfStudentInfo, setListOfStudentInfo] = useState();

  useEffect(() => {
    (async () => {
      let { data } = await RAPI().get(`/group/${params.gname}/admin`);
      setGInfo(data);
      setStudentIds(data.studentsId);
      setTeacherIds(data.teachersId);
    })();
  }, [params.gname]);

  //get Non-hidden student infos using studeIds
  useEffect(() => {
    let tsinfolist = [];
    if (studenIds)
      studenIds.forEach(async (sId) => {
        let { data } = await RAPI().get(`/user/${ginfo._id}/${sId}`);
        tsinfolist.push(data);
        setListOfStudentInfo([...tsinfolist]);
      });
  }, [studenIds, ginfo]);

  const handleDeleteGroup = () => {
    onDelete(ginfo.group_name);
    setTimeout(() => {
      history.replace("/");
    }, 4500);
  };
  const handleTecherUpdate = async (updatedArray) => {
    onTeacherUpdate(ginfo.group_name, updatedArray);
  };

  return (
    <div className={"px-5 py-4 space-y-3 relative"}>
      {studenIds ? (
        <div
          className={
            "py-3 md:gap-2 flex h-full md:h-screen  flex-col md:flex-row "
          }
        >
          <div
            className={
              "hidden md:rounded-md md:flex  top-0 left-0 bottom-0 overflow-y-auto scrollbar max-w-min px-2"
            }
          >
            <CreatedGroupList
              cglist={createdGroupInfomation}
              onCGCOpenClick={onCGCOpenClick}
            />
          </div>
          <div className={"space-y-3 md:w-full"}>
            <div
              className={
                "text-sm text-gray-300 tracking-wider font-robotoCondensed"
              }
            >
              Group name
              <div
                className={"text-4xl text-gray-100 font-poppin tracking-wide"}
              >
                {params.gname}{" "}
              </div>
            </div>
            <div className={"flex flex-col "}>
              <div
                className={
                  "flex flex-row    rounded-t-md  bg-coolGray-700   px-5 py-2 space-x-4 text-orange-300 font-robotoCondensed"
                }
              >
                <NavLink
                  activeClassName={"text-emerald-300"}
                  to={`${url}/info`}
                >
                  Information
                </NavLink>
                <NavLink
                  activeClassName={"text-emerald-300"}
                  to={`${url}/teachers`}
                >
                  Teacher
                </NavLink>
                <NavLink
                  activeClassName={"text-emerald-300"}
                  to={`${url}/settings`}
                >
                  settings
                </NavLink>
              </div>
              <div
                className={
                  "flex shadow-xl overflow-hidden  rounded-b-md  bg-coolGray-700   "
                }
              >
                <Switch>
                  <Route
                    exact
                    path={`${path}/info`}
                    render={() => (
                      <Information
                        studentlist={listOfStudentInfo}
                        gname={params.gname}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`${path}/teachers`}
                    render={() => (
                      <Teachers
                        teacherIds={teacherIds}
                        onTeacheUpdated={handleTecherUpdate}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`${path}/settings`}
                    render={() => <Settings onDelete={handleDeleteGroup} />}
                  />
                  <Route
                    path={`${path}/`}
                    component={() => <Redirect to={`${url}/info`} />}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            "flex items-center justify-center mt-auto h-screen font-poppin tracking-wider text-xl "
          }
        >
          Group Doesn't Exist
        </div>
      )}
    </div>
  );
}

function Information({ studentlist, gname }) {
  return (
    <div className={"w-full divide-y divide-gray-500 "}>
      <StudentList studentlist={studentlist} />
      <LessonAction gname={gname} />
    </div>
  );
}

function Teachers({ teacherIds, onTeacheUpdated }) {
  return (
    <div className={"w-full lg:w-1/2"}>
      {" "}
      <TeacherList teacherIds={teacherIds} onTeacherAdded={onTeacheUpdated} />
    </div>
  );
}

//all kind of admin functions goes here
function Settings({ onDelete }) {
  return (
    <div className={"flex flex-col w-full"}>
      <span className={"text-lg font-poppin px-5"}>Settings</span>
      <div className={"w-full divide-y divide-gray-500"}>
        <div className={"flex flex-col  justify-between py-2 px-5 space-y-1 "}>
          <span>Change Group Name.</span>
          <button
            className={
              "outline-none w-24 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-2  rounded-md hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
            }
          >
            RENAME
          </button>
        </div>
        <div className={"flex flex-col  justify-between py-2 px-5 space-y-1 "}>
          <span>
            Delete This Group. Caution this operation is not reversable.
          </span>
          <button
            onClick={onDelete}
            className={
              "outline-none w-24 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-2  rounded-md hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentList({ studentlist }) {
  return (
    <div className={"flex flex-col px-5 py-2"}>
      <span className={"text-lg font-poppin "}>Students</span>
      {studentlist && (
        <div>
          {studentlist.map((student) => (
            <div
              key={student.name}
              className={"text-sm font-robotoCondensed py-1"}
            >
              {student.name.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonAction({ gname }) {
  return (
    <div>
      <div className={"flex flex-col  px-5 py-2 "}>
        <span className={"text-lg font-poppin"}>Lesson</span>
        <div className={"flex flex-col  justify-between space-y-1 "}>
          <span>
            Delete This Group. Caution this operation is not reversable.
          </span>
          <Link to={`/lesson/create/${gname}`}>
            <button
              className={
                "outline-none w-20 font-medium text-sm  tracking-wider focus:outline-none  px-3 py-2  rounded-md hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
              }
            >
              Create
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
