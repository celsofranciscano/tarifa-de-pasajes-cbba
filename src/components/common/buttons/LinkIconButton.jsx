import Link from "next/link";
function LinkIconButton({ name, href, position, children }) {
  return (
  
      <Link
        href={href}
        className="p-2  rounded-md bg-blue-500  text-white w-fit"
      >
        {children} {name}
      </Link>

  );
}

export default LinkIconButton;
