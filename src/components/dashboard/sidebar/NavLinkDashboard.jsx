"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinkDashboard({ links }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex md:gap-2 flex-col md:flex-row border-b font-medium text-zinc-700 bg-white shadow-md p-2 md:pb-0 md:pt-2 rounded-md">
        {links.map((link) => {
          // Verifica si la ruta coincide exactamente con el path o es una subruta
          const isActive = pathname.startsWith(link.path);

          return (
            <li key={link.path}>
              <Link
                className={`md:pb-1 rounded-t block md:hover:border-b-2 p-2 md:hover:border-blue-500 hover:bg-zinc-200 md:hover:bg-transparent hover:rounded-md md:hover:rounded-none hover:text-blue-500 ${
                  isActive
                    ? "bg-zinc-200 md:bg-transparent rounded-md md:rounded-none md:border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavLinkDashboard;
