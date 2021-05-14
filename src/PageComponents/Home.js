import GroupList from "../components/DashBoardComponents/GroupList";

export default function Home({ groupInformation }) {
  return (
    <div>
      <div className={"flex py-3 px-5"}>
        {groupInformation.length !== 0 && (
          <GroupList glist={groupInformation} />
        )}
      </div>
    </div>
  );
}
