import Image from "next/image";
import { useState } from "react";
import { IProfileImgSelection } from "../_interfaces/interfaces";
import { PROFILE_IMG_LIST } from "../_constants/constants";

export default function ProfileImgSelection({
  seletedImg,
  onSelectionClick,
}: IProfileImgSelection) {
  const [profileImg, setProfileImg] = useState(seletedImg);

  return (
    <div className="w-full px-4 py-6 grid grid-cols-3 place-items-center gap-4 border border-border-2 rounded-lg">
      {PROFILE_IMG_LIST.map((el) => (
        <div
          key={el}
          className={`flex justify-center items-center w-16 h-16 rounded-full overflow-hidden cursor-pointer ${
            el === profileImg
              ? "border-2 border-primary"
              : "border border-border-2 "
          }`}
          onClick={() => {
            onSelectionClick(el);
            setProfileImg(el);
          }}
        >
          <Image
            width="60"
            height="45"
            style={{ width: "60px", height: "45px" }}
            src={el}
            alt={el}
          />
        </div>
      ))}
    </div>
  );
}