import JoinedGroupList from "../components/HomeComponents/JoinedGroupList";

export default function Home({ groupInformation, onJoin }) {
  return (
    <div>
      <div className={"flex py-3 px-5"}>
        {groupInformation.length !== 0 && (
          <JoinedGroupList glist={groupInformation} onJoin={onJoin} />
        )}
      </div>
    </div>
  );
}
