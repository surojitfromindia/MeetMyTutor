/**
 * List Everything about this group
 */

import {
  Route,
  Switch,
  useRouteMatch,
  NavLink,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import RAPI from "../API/RequestAPI";

export default function CreatedGroupDetails() {
  const { path, url, params } = useRouteMatch();
  const [ginfo, setGInfo] = useState();
  const [studenIds, setStudentIds] = useState([]);
  const [listOfStudentInfo, setListOfStudentInfo] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await RAPI().get(`/group/${params.gname}/admin`);
      setGInfo(data);
      setStudentIds(data.studentsId);
      console.log(data);
    })();
  }, [params.gname]);

  //get Non-hidden student infos using studeIds
  useEffect(() => {
    let tsinfolist = [];
    studenIds.forEach(async (sId) => {
      let { data } = await RAPI().get(`/user/${ginfo._id}/${sId}`);
      tsinfolist.push(data);
      setListOfStudentInfo([...tsinfolist]);
    });
  }, [studenIds, ginfo]);

  return (
    <div className={"px-5 py-4 space-y-3"}>
      <div
        className={"text-sm text-gray-300 tracking-wider font-robotoCondensed"}
      >
        Group name
        <div className={"text-4xl text-gray-100 font-poppin tracking-wide"}>
          {params.gname}{" "}
        </div>
      </div>
      <div className={"flex flex-col "}>
        <div
          className={
            "flex   rounded-t-md bg-coolGray-700  px-5 py-2 space-x-4 text-orange-300 font-robotoCondensed"
          }
        >
          <NavLink activeClassName={"text-emerald-300"} to={`${url}/info`}>
            Information
          </NavLink>
          <NavLink activeClassName={"text-emerald-300"} to={`${url}/teachers`}>
            Teacher
          </NavLink>
          <NavLink activeClassName={"text-emerald-300"} to={`${url}/settings`}>
            settings
          </NavLink>
        </div>
        <div
          className={"flex shadow-xl  rounded-b-md bg-coolGray-700  px-5 py-2 "}
        >
          <Switch>
            <Route
              exact
              path={`${path}/info`}
              render={() => <Information studentlist={listOfStudentInfo} />}
            />
            <Route exact path={`${path}/teachers`} component={Teachers} />
            <Route exact path={`${path}/settings`} component={Settings} />
            <Route
              path={`${path}/`}
              component={() => <Redirect to={`${url}/info`} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

function Information({ studentlist }) {
  console.log(studentlist);
  return (
    <div>
      <StudentList studentlist={studentlist} />
    </div>
  );
}

function Teachers() {
  return <diV>Teachers</diV>;
}

function Settings() {
  return <div>Settings</div>;
}

function StudentList({ studentlist }) {
  return (
    <div className={"flex flex-col"}>
      <span className={"text-lg font-poppin "}>Students</span>
      {studentlist && (
        <div>
          {" "}
          {studentlist.map((student) => (
            <div className={"text-sm font-robotoCondensed py-1"}>
              {student.name.toUpperCase()}
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
}
