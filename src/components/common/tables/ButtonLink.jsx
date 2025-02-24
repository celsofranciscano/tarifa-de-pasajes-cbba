import Link from "next/link";
function ButtonLink({ name, href }) {
  return (
    <Link
      href={href}
      className=" flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      <span> {name}</span>
    </Link>
  );
}

export default ButtonLink;
