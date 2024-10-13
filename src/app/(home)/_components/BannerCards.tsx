import { BANNER_CARD_LIST } from "../_constants/constants";
import BannerCard from "./BannerCard";

export default function BannerCards() {
  return (
    <div className="w-full bg-bg-1 py-16 flex justify-center">
      <div className="w-full flex flex-col items-center">
        {BANNER_CARD_LIST.map((el, index) => (
          <BannerCard
            key={index}
            content={el.content}
            bubble={el.bubble}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
