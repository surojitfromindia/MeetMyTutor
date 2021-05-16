import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FloatButton from "../components/FloatButton";
import RAPI from "../API/RequestAPI";
import { Redirect, Route, Switch } from "react-router";
import Home from "./Home";
import Group from "./NewLesson";
import AllLesson from "./AllLesson";
import NewLesson from "./NewLesson";
import PerSubject from "./PerSubject";

export default function Dashboard() {
  const [showNav, setShowNav] = useState(false);
  const [groupids, setGroupids] = useState([]);
  const [, setsHidden] = useState();
  const [NonHidden, setsNonHidden] = useState();
  const [groupInformations, setGroupInformation] = useState([]);
  const handleshowNav = () => {
    setShowNav(!showNav);
  };
  useEffect(() => {
    RAPI()
      .get("/user")
      .then(({ data }) => {
        setGroupids(data.groupsId);
        setsHidden(data.realStudentID);
      });
    RAPI()
      .get("/user/self")
      .then(({ data }) => {
        setsNonHidden(data);
      });
  }, []);

  useEffect(() => {
    let TempList = [];
    if (groupids.length !== 0) {
      groupids.forEach(async (groupid) => {
        let { data } = await RAPI().get(`/group/${groupid}/`);
        TempList.push(data);
        setGroupInformation([...TempList]);
      });
    }
  }, [groupids]);

  const handleJoinGroup = async (groupid, sekey) => {
    try {
      await RAPI().post(`/user/register/${groupid}?skey=${sekey}`);
      await RAPI()
        .get("/user")
        .then(({ data }) => {
          setGroupids(data.groupsId);
          setsHidden(data.realStudentID);
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Navbar show={showNav} nonHiddenInfo={NonHidden} />
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route
          exact
          path="/home"
          render={() => (
            <Home
              groupInformation={groupInformations}
              onJoin={handleJoinGroup}
            />
          )}
        />
        <Route exact path="/study/:groupId/all" render={() => <AllLesson />} />
        <Route exact path="/study/:groupId/new" render={() => <NewLesson />} />
        <Route
          exact
          path="/study/:groupId/new/:subject"
          render={() => <PerSubject />}
        />
        <Route
          exact
          path="/study/:groupId/old/:subject"
          render={() => <PerSubject />}
        />
        <Route exact path="/study/:groupId/up" render={() => <Group />} />
      </Switch>
      <FloatButton showNav={handleshowNav} visiable={showNav} />
    </div>
  );
}
