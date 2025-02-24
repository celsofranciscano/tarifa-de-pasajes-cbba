import Link from "next/link";
import {ScanText} from "lucide-react"
function ReadingButton({params}) {
  return (
    <Link
    href={`/dashboard/search/${params.PK_partner}/readings/create`}
      className="flex  gap-2 items-center justify-between bg-blue-500 px-4 py-2 rounded-md text-white w-full"
    >
      <span>Lecturar</span>
      <ScanText className="size-5" />
    </Link>
  );
}

export default ReadingButton;
