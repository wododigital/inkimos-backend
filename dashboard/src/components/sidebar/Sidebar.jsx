import React, { createContext, useState, useEffect} from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../../assets/logo.webp";

export const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false);
      } else {
        setExpanded(true); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSetActiveItem = (item) => {
    setActiveItem(item);
  };

  return (
    <aside
      className={`h-screen transition-all duration-300 sticky top-0 ${
        expanded ? "w-64" : "w-20"
      }`}

    
    >
      <nav className="h-full flex flex-col bg-white border-r  shadow-[0_0_10px_#00000030] relative">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden py-3 ps-3 transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
          />
        </div>
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className={`p-1.5 rounded-lg bg-gray-50 hover:text-green absolute ${
            expanded
              ? "top-4 right-4"
              : "top-4 right-1/2 transform translate-x-1/2"
          }`}
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
        <SidebarContext.Provider
          value={{ expanded, activeItem, setActiveItem: handleSetActiveItem }}
         
        >
          <ul className="flex-1 px-3 mt-6"  onMouseEnter={() => setExpanded(true)}>{children}</ul>
        </SidebarContext.Provider>
        
      </nav>
    </aside>
  );
};

export default Sidebar;
