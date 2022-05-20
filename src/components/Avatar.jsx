import Image from "next/image";

export default function Avatar({ image }) {
  return (
    <div className="user">
      <Image src={image} alt="" height={56} width={56} />
    </div>
  );
}
