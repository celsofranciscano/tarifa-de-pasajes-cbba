import { auth } from "@/lib/auth/auth";
import Link from "next/link";
async function Footer() {
  const session = await auth();

  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Agua Potable el Palmar. Todos los
            derechos reservados.
          </p>
          {session ? (
            <div className="mt-4 md:mt-0 text-center">
              <Link href={"/dashboard"}>Apopal</Link>
            </div>
          ) : (
            <div className="mt-4 md:mt-0 text-center">
              <Link href={"/auth/login"}>Apopal</Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
