import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Dropdown({ children, items }) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <ul className="hidden py-2 space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-xs ${
                isActive(item.path)
                  ? "bg-gradient-to-tr text-green font-noto"
                  : "hover:text-green"
              }`}
            >
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
