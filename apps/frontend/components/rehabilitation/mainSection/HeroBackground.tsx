import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full overflow-hidden rounded-b-[36px]">
      <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundImage: "linear-gradient(178.85deg, #433ca6 19.17%, #8984c8 135.32%)" }} aria-hidden />
      <Image
        className="absolute inset-0 h-[70%] w-[50%] mx-auto scale-110 object-cover opacity-35"
        src="/Grid.svg"
        alt=""
        width={1440}
        height={800}
        priority
        aria-hidden
      />
    </div>
  );
}
