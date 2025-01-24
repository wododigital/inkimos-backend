import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

export function SidebarItem({ icon, text, id, dropdownItems }) {
  const { expanded } = useContext(SidebarContext);

  const [dropdown,setDropdown]=useState(false);
  const location = useLocation();

  const isActive = () => {
    // console.log(location.pathname);
    if (
      location.pathname === `/${id}` ||
      (location.pathname === "/" && id === "dashboard")
    ) {
      return true;
    }
    
    if (dropdownItems) {
      return dropdownItems.some((item) => location.pathname === item.path);
    }
    return false;
  };

  return (
    <div className="w-full">
        <Link to={`/${id}`}>
          <li
            className={`relative flex items-center py-3 px-3 my-2 text-sm rounded-md cursor-pointer transition-colors group ${
              isActive()
                ? "text-iblue"
                : "hover:text-green"
            }`}
          >
            {icon}
            <span
              className={`overflow-hidden transition-all font-noto  ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
          </li>
        </Link>
    </div>
  );
}
