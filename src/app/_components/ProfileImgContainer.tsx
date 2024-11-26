import Image from "next/image";
import { ProfileImgContainerProps } from "../_interfaces/interfaces";

export default function ProfileImgContainer({
  width,
  height,
  src,
}: ProfileImgContainerProps) {
  // 정규식을 사용하여 이미지 링크의 공백으로 인해 생기는 오류 방지
  const filteredSrc = src?.trim().replace(/\s+/g, "") || "";

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative border border-border-2 rounded-full flex-center overflow-hidden"
    >
      {src && (
        <Image
          fill
          sizes="100%"
          src={filteredSrc}
          alt={filteredSrc}
          priority
          className="object-cover"
        />
      )}
    </div>
  );
}
