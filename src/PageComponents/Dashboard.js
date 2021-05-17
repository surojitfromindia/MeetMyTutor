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
import CreateNewGroup from "./CreateNewGroup";
import Modal from "./Modal";

export default function Dashboard() {
  const [modal, setModal] = useState({
    show: false,
    message: "None",
    type: "message",
  });
  const [showNav, setShowNav] = useState(false);
  const [groupids, setGroupids] = useState([]);
  const [createdGroupids, setCreatedGroupids] = useState([]);
  const [, setsHidden] = useState();
  const [NonHidden, setsNonHidden] = useState();
  const [groupInformations, setGroupInformation] = useState([]);
  const [createdGroupInfomation, setCreatedGroupInformation] = useState([]);
  const handleshowNav = () => {
    setShowNav(!showNav);
  };
  useEffect(() => {
    RAPI()
      .get("/user")
      .then(({ data }) => {
        console.log(data);
        setGroupids(data.groupsId);
        setsHidden(data.realStudentID);
        setCreatedGroupids(data.createdGroupId);
      });
    RAPI()
      .get("/user/self")
      .then(({ data }) => {
        setsNonHidden(data);
      });
  }, []);

  useEffect(() => {
    let TempList = [];
    console.log(groupids);
    if (groupids.length !== 0) {
      groupids.forEach(async (groupid) => {
        let { data } = await RAPI().get(`/group/${groupid}/`);
        TempList.push(data);
        setGroupInformation([...TempList]);
      });
    }
  }, [groupids]);

  useEffect(() => {
    let tempCreateGIDs = [];
    console.log(createdGroupids);
    if (createdGroupids.length !== 0) {
      createdGroupids.forEach(async (groupid) => {
        try {
          let { data } = await RAPI().get(`/group/${groupid.name}/admin`);
          console.log(data);
          tempCreateGIDs.push(data);
          setCreatedGroupInformation([...tempCreateGIDs]);
        } catch (err) {
          console.log({ err });
        }
      });
    }
    console.log(createdGroupids);
  }, [createdGroupids]);

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
  const handleCreateGroup = async (gname, gkey, gsnum, gisP, gtList) => {
    console.log(gname, gkey, gsnum, gisP, gtList);
    let postBody = {
      group_name: gname,
      admin: NonHidden.name,
      private: gisP,
      teachersId: gtList,
      secrateKey: gkey,
    };
    await RAPI()
      .post("/group/new", postBody)
      .then(({ data }) => {
        console.log(data);
        setModal({
          show: !modal.show,
          message: data.message.des,
          type: data.message.type,
        });
        setTimeout(() => {
          setModal({ show: false, message: "" });
        }, 3000);
      });
  };
  return (
    <div className={"flex flex-col"}>
      <Navbar show={showNav} nonHiddenInfo={NonHidden} />
      <Modal show={modal.show} message={modal.message} type={modal.type} />
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route
          exact
          path="/home"
          render={() => (
            <Home
              groupInformation={groupInformations}
              createdGroupInfomation ={createdGroupInfomation}
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
        <Route
          exact
          path="/group/new"
          render={() => <CreateNewGroup onCreate={handleCreateGroup} />}
        />
      </Switch>
      <FloatButton showNav={handleshowNav} visiable={showNav} />
    </div>
  );
}
