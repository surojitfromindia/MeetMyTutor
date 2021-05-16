import { BadgeCheckIcon } from "@heroicons/react/solid";

export default function SubjectStudy({ subjectData }) {
  return (
    <div className={"py-2"}>
      <span className={"text-xl text-orange-100"}>{subjectData.subName}</span>
      <div>
        <ul className={"my-2 max-w-md"}>
          {subjectData.topic.map(({ type, des, done }, idx) => (
            <li className={"my-2"} key={idx}>
              <div className={"flex"}>
                <BadgeCheckIcon
                  className={`w-5 h-5 mr-1.5 flex-shrink-0 ${
                    done ? "text-yellow-300" : ""
                  } text-gray-200`}
                />
                <span className={"text-gray-50 font-poppin text-sm "}>
                  {type && (
                    <span className={"text-orange-100"}>[{type.typeText}]</span>
                  )}{" "}
                  {des}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
