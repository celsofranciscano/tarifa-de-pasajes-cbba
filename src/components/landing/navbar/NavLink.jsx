"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  name,
  href,
  sublinks,
  children,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const normalizePath = (path) => path.replace(/\/$/, "");
  const isActive =
    normalizePath(pathname) === normalizePath(href) ||
    (sublinks &&
      sublinks.some(
        (sublink) => normalizePath(pathname) === normalizePath(sublink.href)
      ));

  const handleClick = (e) => {
    if (sublinks) {
      e.preventDefault();
      setOpen((prev) => !prev);
    } else {
      if (isSidebarOpen) setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        return;
      }
      const isCurrentMenu =
        normalizePath(pathname) === normalizePath(href) ||
        (sublinks &&
          sublinks.some(
            (sublink) => normalizePath(pathname) === normalizePath(sublink.href)
          ));
      if (!isCurrentMenu && open) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open, pathname, href, sublinks]);

  return (
    <li ref={containerRef} className="relative">
      <Link
        href={href}
        onClick={handleClick}
        className={`hover:bg-yellow-400 rounded-md flex justify-between gap-2 items-center py-1.5 px-4 font-medium hover:text-black ${
          isActive ? "text-black bg-yellow-400" : "text-zinc-400"
        }`}
      >
        <div className="flex items-center gap-2">
          {children}
          <span>{name}</span>
        </div>
        {sublinks && (
          <svg
            className={`w-5 h-5 text-current transition-transform ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="m19 9-7 7-7-7"
            />
          </svg>
        )}
      </Link>

      {sublinks && open && (
        <ul className=" grid grid-cols-1 gap-1 rounded-md w-full py-2 pl-8  ">
          {sublinks.map((sublink, index) => {
            const isSubActive =
              normalizePath(pathname) === normalizePath(sublink.href);
            return (
              <li key={index} className="">
                <Link
                  onClick={() => {
                    if (isSidebarOpen) setIsSidebarOpen(false);
                  }}
                  href={sublink.href}
                  className={`hover:white  rounded-md py-1 px-4 block w-full ${
                    isSubActive ? "text-black bg-yellow-400" : "text-zinc-400"
                  } hover:text-black hover:bg-yellow-400`}
                >
                  {sublink.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default NavLink;
