import Image from "next/image";
import { useState } from "react";
import { ProfileImgSelectionProps } from "../_interfaces/interfaces";
import { PROFILE_IMG_LIST } from "../_constants/constants";

export default function ProfileImgSelection({
  seletedImg,
  onSelectionClick,
  isDisabled,
  isError,
}: ProfileImgSelectionProps) {
  const [profileImg, setProfileImg] = useState(seletedImg);

  return (
    <div
      className={`relative w-full px-4 py-6 grid grid-cols-3 place-items-center gap-4 border border-border-2 rounded-lg overflow-hidden  ${
        isError && "!border-red"
      }`}
    >
      {isDisabled && (
        <div className="absolute w-full h-full bg-black opacity-20" />
      )}
      {PROFILE_IMG_LIST.map((el) => (
        <div
          key={el}
          className={`flex-center w-16 h-16 rounded-full overflow-hidden ${
            !isDisabled && "cursor-pointer"
          } ${
            el === profileImg
              ? "border-2 border-primary-1"
              : "border border-border-2 "
          }`}
          onClick={() => {
            if (!isDisabled) {
              onSelectionClick(el);
              setProfileImg(el);
            }
          }}
        >
          <Image width="60" height="60" src={el} alt={el} />
        </div>
      ))}
    </div>
  );
}
