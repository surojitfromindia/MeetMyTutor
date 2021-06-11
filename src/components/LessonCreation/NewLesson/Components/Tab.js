import { useState } from "react";


export default function Tab({
  align = "flex-row",
  onTabItemChanged,
  children = ["Quiz", "Question"],
}) {
  const [current, setcurrent] = useState(0);
  const handleTabChange = (index) => {
    setcurrent(index);
    onTabItemChanged(index);
  };
  return (
    <div>
      <div className={`flex ${align}  font-robotoCondensed`}>
        {children.map((tabItem, index) => (
          <div
            id={index}
            key={index}
            onClick={() => {
              handleTabChange(index);
            }}
            className={` cursor-pointer  px-3 py-1 text-center tracking-wider ${
              index === current
                ? "text-emerald-300 bg-coolGray-800 border-b-2 border-emerald-300"
                : "text-gray-300"
            }`}
          >
            {tabItem}
          </div>
        ))}
      </div>
    </div>
  );
}
