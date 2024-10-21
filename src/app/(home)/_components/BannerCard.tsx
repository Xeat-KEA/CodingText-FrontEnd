import { BannerCardProps } from "../_interfaces/interfaces";

export default function BannerCard({
  content,
  bubble,
  index,
}: BannerCardProps) {
  return (
    <div
      className={`max-w-1000 h-[480px] flex justify-between items-center ${
        index === 1 ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <span className="whitespace-pre-wrap text-2xl font-semibold text-black">
        {content}
      </span>
      {bubble}
    </div>
  );
}
