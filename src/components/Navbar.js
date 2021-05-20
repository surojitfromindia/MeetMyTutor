import { links } from "../utils/links";
import { Link } from "react-router-dom";
import LoginAvater from "./CommonComponents/LoginAvater";
import OneMenu from "./OneMenu";

export default function Navbar({ show, nonHiddenInfo }) {
  return (
    <div
      className={
        "group bg-gradient-to-tr from-lightBlue-600 to-indigo-400 px-5 py-5   text-gray-100"
      }
    >
      <div
        className={`transition-all ease-in-out transform  ${
          show ? "sm:max-h-0 " : "sm:max-h-72 "
        } overflow-hidden flex justify-between items-center`}
      >
        <h1 className={`text-xl font-medium font-poppin `}>
          <Link to={"/"}>Do This !</Link>
        </h1>
        <div>
          <LoginAvater username={nonHiddenInfo?.name} />
        </div>
      </div>

      <div
        className={`hidden sm:flex flex-col transition-all delay-100 ease-in-out transform   justify-center  ${
          show ? "max-h-96 py-1.5" : "max-h-0 my-0"
        } overflow-hidden text-sm group-hover:max-h-96   gap-1 font-medium text-gray-200`}
      >
        <OneMenu menu={links[0]} cname={"Home"} isArrowShow={false} />
        <OneMenu menu={links[1]} cname={"New Group"} isArrowShow={false} />
        
      </div>
    </div>
  );
}
