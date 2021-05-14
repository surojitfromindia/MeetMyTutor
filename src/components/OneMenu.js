import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";

export default function OneMenu({ menu, cname, isArrowShow = true }) {
  const [open, setOpen] = useState(false);
  const handleOpen = (ev) => {
    if (ev.target.id === cname) {
      setOpen(!open);
    }
  };
  return (
    <div className={"flex flex-col justify-start"}>
      <div className={"flex flex-row items-center"}>
        {menu.sublinks && (
          <div onClick={handleOpen} className={"flex items-center"}>
            {open ? (
              <ChevronDownIcon id={cname} className={"h-5 w-5"} />
            ) : (
              <ChevronRightIcon id={cname} className={"h-5 w-5"} />
            )}
          </div>
        )}
        {menu.sublinks && <div className={"w-5"}></div>}
        {menu.link && (
          <Link to={menu.link}>
            <div className={`rounded-sm cursor-pointer `}>{menu.name}</div>
          </Link>
        )}
      </div>
      <div
        className={`flex flex-col transition-all ${
          open ? "max-h-96" : "max-h-0"
        } overflow-hidden ml-3`}
      >
        {menu.sublinks && (
          <div className={""}>
            {menu.sublinks.map((submenu) => (
              <OneMenu menu={submenu} key={submenu.name} cname={submenu.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
