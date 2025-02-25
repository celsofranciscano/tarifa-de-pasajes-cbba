"use client";
import { useState } from "react";
import NavLink from "@/components/landing/navbar/NavLink";
import { useSession } from "next-auth/react";
import ProfileCard from "./ProfileCard";

function DashboardSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session } = useSession();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <header
        className={`bg-zinc-900 shadow-md z-20 h-16 fixed w-full flex items-center justify-between px-4  text-white`}
      >
        <a className="flex gap-1 items-center" href="/">
          {/* <img className="w-12" src="/logo-idiomify.png" alt="logo idiomify" /> */}
          <span className="text-2xl font-bold  text-gold ">TARIFA</span>
        </a>

        <div className="flex items-center justify-center gap-4">
          <ProfileCard />

          <button
            onClick={toggleSidebar}
            className="md:hidden bg-zinc-200 text-zinc-700 rounded-full p-0.5"
          >
            <svg
              className="w-6 h-6 text-current"
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
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        onClick={toggleSidebar}
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        }   md:hidden bg-zinc-400 h-screen top-16 fixed w-full dark:opacity-60 opacity-30`}
      ></div>

      <aside
        style={{ scrollbarWidth: "none" }}
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        }   md:block bg-zinc-900 shadow-md overflow-auto z-50 w-72 md:w-60  border-r dark:border-none h-screen    fixed top-16  px-4 py-2 `}
      >
        <nav className="">
          <ul className="grid gap-0.5 pt-2 pb-28">
            <NavLink
              name={"Inicio"}
              href={"/dashboard"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
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
                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                />
              </svg>
            </NavLink>

            <NavLink
              name={"Tarifas"}
              href={"/dashboard/tarifas"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              <svg
                class="w-5 h-5 text-current "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
            </NavLink>

            <NavLink
              name={"Estados"}
              href={"/dashboard/estados"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              sublinks={[
                { name: "Ultimos", href: "/dashboard/estados/ultimos" },
                { name: "Reportes", href: "/dashboard/estados/reportes" },
                { name: "Nuevo", href: "/dashboard/estados/nuevo" },
                { name: "Lista", href: "/dashboard/estados/lista" },
              ]}
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                />
              </svg>
            </NavLink>

            <NavLink
              name={"Transportes"}
              href={"/dashboard/transportes"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              sublinks={[
                { name: "Ultimos", href: "/dashboard/transportes/reports" },
                { name: "Reportes", href: "/dashboard/transportes/consumption" },
                { name: "Nuevo", href: "/dashboard/transportes/fines" },
                { name: "Aportes", href: "/dashboard/transportes/extras" },
                { name: "Lista", href: "/dashboard/transportes/lista" },
              ]}
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
                  d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                />
              </svg>
            </NavLink>
            <NavLink
              name={"Pasajeros"}
              href={"/dashboard/pasajeros"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              sublinks={[
                { name: "Ultimos", href: "/dashboard/expenses/reports" },
                { name: "Reportes", href: "/dashboard/expenses/operational" },
                { name: "Lista", href: "/dashboard/pasajeros/lista" },
              ]}
            >
              <svg
                class="w-5 h-5 text-current "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
            </NavLink>
            <NavLink
              name={"Denuncias"}
              href={"/dashboard/denuncias"}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              sublinks={[
                { name: "Ultimos", href: "/dashboard/denuncias/reports" },
                { name: "Reportes", href: "/dashboard/denuncias/operational" },
                { name: "Lista", href: "/dashboard/denuncias/lista" },
              ]}
            >
              <svg
                class="w-5 h-5 text-current"
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
                  d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
                />
              </svg>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideBar;
