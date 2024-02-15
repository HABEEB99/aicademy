import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <div className="flex items-center justify-center space-x-1">
          <Image src="/logo.png" alt="App Logo" width={25} height={25} />
          <h4 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-btn font-bold to-pink-500">
            AIcademy
          </h4>
        </div>
      </Link>
    </>
  );
};
