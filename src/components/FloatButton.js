import NavBarWithButton from "./NavBarWithButton";
import { HomeIcon } from "@heroicons/react/solid";
export default function FloatButton({ showNav, visiable }) {
  return (
    <div
      className={
        " flex flex-col   items-end gap-4 justify-center fixed  bottom-10 right-5  "
      }
    >
      <div
        className={
          "w-40 -mr-2 bg-gradient-to-tr from-lightBlue-600 to-indigo-400 rounded-md sm:hidden"
        }
      >
        <NavBarWithButton show={visiable} />
      </div>

      <div
        onClick={showNav}
        style={{ width: "52px", height: "52px" }}
        className={
          "justify-center items-center flex rounded-full bg-gradient-to-tr from-lightBlue-700 to-indigo-800 "
        }
      >
        <HomeIcon className={"w-6 h-6 text-gray-50 "} />
      </div>
    </div>
  );
}
