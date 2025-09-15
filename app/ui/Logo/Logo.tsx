import Image from "next/image";
import IconLogo from "./IconLogo";

export default function Logo() {
  return (
    <div className="flex flex-row gap-[5]">
      <IconLogo />
      <Image src="/SPORTSEE.svg" alt="Sportsee" width={132.97} height={23.41} />
    </div>
  );
}
