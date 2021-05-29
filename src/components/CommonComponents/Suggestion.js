import { FaLightbulb, FaExclamationTriangle } from "react-icons/fa";

export default function Tips({ tips, bgc = "bg-coolGray-700" }) {
  return (
    <div
      className={`px-3 py-4 rounded-md ${bgc}  sm:max-w-lg flex flex-col  space-y-1`}
    >
      <div className={"flex  items-center"}>
        <div className={"w-6"}>
          <FaLightbulb />
        </div>
        <div className={"text-base text-red-50  font-medium tracking-widest"}>
          TIPS
        </div>
      </div>
      <div className={"flex flex-col flex-shrin-0 pl-6 "}>
        <div className={"font-robotoCondensed text-sm tracking-wider leading-6  "}>
          {tips}
        </div>
      </div>
    </div>
  );
}

function Warning({ warn, bgc = "bg-coolGray-700" }) {
  return (
    <div
      className={`px-3 py-4 rounded-md ${bgc} sm:max-w-lg flex flex-col  space-y-1`}
    >
      <div className={"flex  items-center"}>
        <div className={"w-6"}>
          <FaExclamationTriangle color={"#abcc22"} />
        </div>
        <div className={"text-base text-red-50  font-medium tracking-widest"}>
          WARNING
        </div>
      </div>
      <div className={"flex flex-col flex-shrin-0 pl-6 "}>
        <div className={"font-robotoCondensed tracking-wide "}>{warn}</div>
      </div>
    </div>
  );
}

export { Tips, Warning };
