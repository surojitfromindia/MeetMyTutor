import JoinedGroupList from "../components/HomeComponents/JoinedGroupList";
import CreatedGroupList from "../components/HomeComponents/CreatedGroupList";

export default function Home({
  groupInformation,
  createdGroupInfomation,
  onJoin,
}) {
  return (
    <div className={"flex flex-col py-3 px-5 space-y-6"}>
      <div>{<JoinedGroupList glist={groupInformation} onJoin={onJoin} />}</div>
      <div>
        <CreatedGroupList cglist={createdGroupInfomation} />
      </div>
    </div>
  );
}
