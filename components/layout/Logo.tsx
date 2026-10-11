import Image from "next/image";

const LOGO = { src: "/images/logo/lavishcars.png", width: 397, height: 154 };

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <Image src={LOGO.src} alt="LavishCars" width={LOGO.width} height={LOGO.height} className={className} />;
}
