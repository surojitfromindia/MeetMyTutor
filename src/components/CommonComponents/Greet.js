
export default function Greet({
  heading = "",
  body = "",
  sub = "",
  emoji = "",
  backG = "from-lightBlue-400 via-lightBlue-300 to-lightBlue-200 ",
}) {
  return (
    <div>
      <div className={"block text-4xl"}>
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
          "tracking-wide text-sm w-max block px-1.5 py-1 bg-gray-700 rounded-xl mt-2 text-coolGray-300"
        }
      >
        Continue with 19854.25.12
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
