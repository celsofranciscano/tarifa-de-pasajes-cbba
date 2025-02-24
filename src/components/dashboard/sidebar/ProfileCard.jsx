"use client";
import { useState } from "react";
import LogoutButton from "@/components/common/buttons/LogoutButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

function ProfileCard() {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { data: session } = useSession();

  const toggleCardVisibility = () => {
    setIsCardVisible((prevState) => !prevState);
  };

  return (
    <>
      {/* Mostrar la primera letra del nombre si no hay imagen */}
      <div
        onClick={toggleCardVisibility}
        className="w-9 h-9 text-zinc-700 rounded-full cursor-pointer bg-zinc-200 flex items-center justify-center"
      >
        <h1 className="text-center text-xl">
          {(session?.user?.firstName?.[0] || "").toUpperCase()}
        </h1>
      </div>

      {isCardVisible && (
        <div className="fixed w-fit h-fit bg-white text-zinc-700 text-sm border rounded-b-md top-16 right-4 md:right-10 shadow-md z-10">
          {/* Perfil Expansivo */}
          <div className="flex items-center border-b p-4">
            <div className="w-12 h-12 rounded-full cursor-pointer bg-zinc-200 text-2xl flex items-center justify-center">
              {session?.user?.firstName?.charAt(0)?.toUpperCase() || ""}
            </div>
            <div className="ml-3">
              <p className="text-lg font-medium">
                {session?.user?.firstName} {session?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{session?.privilege}</p>
            </div>
          </div>

          {/* Enlaces del Dashboard */}
          <ul className="grid gap-2 p-4">
            <li>
              <Link
                onClick={toggleCardVisibility}
                href="/dashboard"
                className="flex items-center text-sm text-zinc-600 hover:text-indigo-600"
              >
                <svg
                  className="w-5 h-5 text-current"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                  />
                </svg>

                <span className="ml-2">Dashboard</span>
              </Link>
            </li>

            {/* Mostrar Settings solo para Superadministrador */}
            {session?.privilege === "Superadministrador" && (
              <li>
                <Link
                  onClick={toggleCardVisibility}
                  href="/dashboard/settings"
                  className="flex items-center text-sm text-zinc-600 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5 text-current"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <span className="ml-2">Configuración</span>
                </Link>
              </li>
            )}

            {/* Enlace a perfil */}
            <li>
              <Link
                onClick={toggleCardVisibility}
                href="/dashboard/profile"
                className="flex items-center text-sm text-zinc-600 hover:text-indigo-600"
              >
                <svg
                  className="w-5 h-5 text-current"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="ml-2">Perfil</span>
              </Link>
            </li>
          </ul>

          {/* Botón de logout */}
          <div className="border-t p-4">
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
