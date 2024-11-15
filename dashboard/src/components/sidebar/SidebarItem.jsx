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

  const isActive2 = (path) => location.pathname === path;
  const isActive3=(path)=>{
    
    const pathArray = location.pathname.split('/');
    if(id===pathArray[1]){
      return true;
    }else{
      return false;
    }
  }

  return (
    <div className="w-full">
      {dropdownItems ? (
        
          <li
            className='items-center w-full py-3 px-3 text-sm font-medium text-gray-900 transition duration-75 rounded-lg group '
            aria-controls="dropdown-example"
            onClick={() => setDropdown(!dropdown)} 
          >
            <button type="button" 
             className={`flex items-center w-full  text-gray-900 transition duration-75 rounded-lg group relative ${
              isActive3(id) ? "text-green" : "hover:text-green"
            }`}
             aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  {icon}
                  <span 
                  
                    className={`transition-all font-noto ${
                      expanded ? "ml-3" : "w-0 overflow-hidden"
                    }`}
                   sidebar-toggle-item={isActive3(id) ? 'true' : 'false'}>
                    {text}
                  </span>
                  {/* <span className=" right-0 pe-10"><DownArrow/></span> */}
            </button>
            
            {/* Conditionally render dropdown menu */}
            <ul className={`${dropdown ? "block" : "hidden"} py-3 space-y-2 font-noto ps-4`}>
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 text-sm ${
                    isActive2(item.path) ? "bg-gradient-to-tr text-green font-noto" : "hover:text-green"
                  }`}
                >
                  <Link to={item.path}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </li>

        
      ) : (
        <Link to={`/${id}`}>
          <li
            className={`relative flex items-center py-3 px-3 my-2 font-medium text-sm rounded-md cursor-pointer transition-colors group ${
              isActive()
                ? "text-green"
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
      )}
    </div>
  );
}
