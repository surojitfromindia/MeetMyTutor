export default function Greet({
  heading = "",
  body = "",
  sub = "",
  emoji = "",
  backG = "from-lightBlue-400 via-lightBlue-300 to-lightBlue-200 ",
  groupName = "",
}) {
  return (
    <div className={"flex  flex-col items-start"}>
      <div className={"text-4xl"}>
        <span
          className={` font-bold  bg-gradient-to-r w-max bg-clip-text text-transparent
         ${backG}`}
        >
          {heading}
        </span>{" "}
        <span>{emoji}</span>
      </div>
      <span
        className={
          "tracking-wide text-sm w-auto mt-4 px-3 py-1 bg-gray-700 rounded-xl  text-coolGray-300"
        }
      >
        Continue with{" "}
        <span className={"text-orange-300 font-semibold"}>{groupName}</span>
      </span>
      <span className={"block tracking-wider mt-3 text-lg text-trueGray-200"}>
        {body}
      </span>
      <span className={"tracking-wide block text-sm text-trueGray-400"}>
        {sub}
      </span>
    </div>
  );
}
