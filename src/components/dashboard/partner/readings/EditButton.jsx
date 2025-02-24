import Link from "next/link";
import {UserPen} from "lucide-react"

function EditButton({params}) {
  return (
    <Link
      href={`/dashboard/search/${params.PK_partner}/profile/edit`}
      className="flex  gap-2 items-center justify-between bg-blue-500 px-4 py-2 rounded-md text-white w-full"
    >
      <span>Editar Datos</span>
      <UserPen className="size-5" />
    </Link>
  );
}

export default EditButton;
