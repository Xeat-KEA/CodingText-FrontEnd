import Image from "next/image";
import { ProfileImgContainerProps } from "../_interfaces/interfaces";

export default function ProfileImgContainer({
  width,
  height,
  src,
}: ProfileImgContainerProps) {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative border border-border-2 rounded-full flex-center overflow-hidden"
    >
      {src && (
        <Image
          fill
          sizes="100%"
          src={src}
          alt={src}
          priority
          className="object-cover"
        />
      )}
    </div>
  );
}
