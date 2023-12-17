import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Image
        width={512}
        height={512}
        src="/sumbuddylogo.jpeg"
        alt="References for Front Line Workers"
        className="w-48"
      />
      <Link 
        href={process.env.NEXTAUTH_URL || "#"} 
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Employee Site 
      </Link>
=
    </div>
  );
}