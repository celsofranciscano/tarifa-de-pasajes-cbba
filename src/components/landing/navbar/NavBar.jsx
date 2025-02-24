"use client";

import ProfileCard from "@/components/dashboard/sidebar/ProfileCard";

import { useSession } from "next-auth/react";
import LinkButton from "@/components/common/buttons/LinkButton";

function NavBar() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <header
        className={` z-20 h-16 bg-blue-700 fixed w-full flex items-center text-white justify-between px-4 md:px-16`}
      >
        <a className="flex gap-1 items-center" href="/">
          {/* <img className="w-12" src="/logo-idiomify.png" alt="logo idiomify" /> */}
          <span className="text-2xl font-bold text-current  ">APOPAL</span>
        </a>

        <div className="flex items-center justify-center gap-4">
          {session?.user && <ProfileCard />}
          {session?.user && (
            <LinkButton name={"Volver a cuenta"} href={"/dashboard"} />
          )}
        </div>
      </header>
    </>
  );
}

export default NavBar;
