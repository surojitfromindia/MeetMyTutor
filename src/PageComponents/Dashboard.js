import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FloatButton from "../components/FloatButton";
import RAPI from "../API/RequestAPI";
import { Redirect, Route, Switch, useHistory } from "react-router";
import Home from "./Home";
import Group from "./NewLesson";
import AllLesson from "./AllLesson";
import NewLesson from "./NewLesson";
import PerSubject from "./PerSubject";
import CreateNewGroup from "./CreateNewGroup";
import Modal from "./Modal";
import CreatedGroupDetails from "./CreatedGroupDetails";
import LessonCreationPage from "./LessonCreationPage";

export default function Dashboard() {
  const history = useHistory();
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
  const [createdGrop, setCreatedGroup] = useState();
  const handleshowNav = () => {
    setShowNav(!showNav);
  };
  useEffect(() => {
    Refresh();
  }, []);

  const Refresh = () => {
    RAPI()
      .get("/user")
      .then(({ data }) => {
        setGroupids(data.groupsId);
        setsHidden(data.realStudentID);
        setCreatedGroupids(data.createdGroupId);
      });
    RAPI()
      .get("/user/self")
      .then(({ data }) => {
        setsNonHidden(data);
      });
  };

  /*Get all group infomatios that the user is registered with */
  useEffect(() => {
    let TempList = [];
    if (groupids.length !== 0) {
      groupids.forEach(async (groupid) => {
        let { data } = await RAPI().get(`/group/${groupid}`);
        TempList.push(data);
        setGroupInformation([...TempList]);
      });
    }
  }, [groupids]);

  /*Get all groups information that is created by user  */
  useEffect(() => {
    let tempCreateGIDs = [];
    if (createdGroupids.length !== 0) {
      createdGroupids.forEach(async (groupid) => {
        try {
          let { data } = await RAPI().get(`/group/${groupid.name}/admin`);

          tempCreateGIDs.push(data);
          setCreatedGroupInformation([...tempCreateGIDs]);
        } catch (err) {
          console.log({ err });
        }
      });
    }
  }, [createdGroupids]);

  /*Join A Group */
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

  /*Create A Group */
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
        Refresh();
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
  /*Delete A Group */
  const handleDeleteGroup = async (gname) => {
    try {
      let { data } = await RAPI().delete(`/group/${gname}/delete`);
      setModal({ message: data.message.des, type: "error", show: true });
      Refresh();
      setTimeout(() => {
        setModal({ show: false });
      }, 4500);
      //delete then refresh
    } catch (err) {}
  };
  /*Open a group*/
  const handleCGIOpen = (cgname) => {
    //get info from groupInformations
    let fil = createdGroupInfomation.filter(
      (ginfo) => ginfo.group_name === cgname
    )[0];
    setCreatedGroup(fil);
    history.push(`/mygroup/${cgname}`);
  };
  /*Update teachers of a group */
  const handleTeacherUpdate = async (gname, updatedArray) => {
    try {
      let { data } = await RAPI().post(
        `/group/${gname}/update/teacher`,
        updatedArray
      );
      setModal({ message: data.message.des, type: "message", show: true });
      setTimeout(() => {
        setModal({ show: false });
      }, 4500);
      //delete then refresh
    } catch (err) {}
  };
  return (
    <div className={"flex flex-col  lg:items-center "}>
      <div className={"w-full"}>
        <Navbar show={showNav} nonHiddenInfo={NonHidden} />
        <Modal show={modal.show} message={modal.message} type={modal.type} />
      </div>
      <div className={"flex flex-col w-full"}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/home"
            render={() => (
              <Home
                groupInformation={groupInformations}
                createdGroupInfomation={createdGroupInfomation}
                onJoin={handleJoinGroup}
                onCGCOpenClick={handleCGIOpen}
              />
            )}
          />
          <Route
            exact
            path="/study/:groupId/all"
            render={() => <AllLesson groupInformation={groupInformations} />}
          />
          <Route
            exact
            path="/study/:groupId/new"
            render={() => <NewLesson />}
          />
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
          <Route exact path="/study/:groupId/up" component={Group} />
          <Route
            exact
            path="/group/new"
            render={() => <CreateNewGroup onCreate={handleCreateGroup} />}
          />
          <Route
            path="/mygroup/:gname"
            render={() => (
              <CreatedGroupDetails
                onDelete={handleDeleteGroup}
                onTeacherUpdate={handleTeacherUpdate}
                ginfoP={createdGrop}
                createdGroupInfomation={createdGroupInfomation}
                onCGCOpenClick={handleCGIOpen}
              />
            )}
          />
          <Route
            exact
            path="/lesson/create/:gname"
            render={() => (
              <LessonCreationPage gnamelist={createdGroupInfomation} />
            )}
          />
          <Route
            path="/lesson/create/"
            render={() => (
              <LessonCreationPage gnamelist={createdGroupInfomation} />
            )}
          />
        </Switch>
      </div>
      <FloatButton showNav={handleshowNav} visiable={showNav} />
    </div>
  );
}
