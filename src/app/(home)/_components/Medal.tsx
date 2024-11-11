import { useEffect, useState } from "react";

export default function Medal({ ranking }: { ranking: 1 | 2 | 3 }) {
  const color =
    ranking === 1 ? "#FFD700" : ranking === 2 ? "#C0C0C0" : "#CD7F32";

  return (
    <div className="absolute -right-2 -top-2">
      <span className="absolute top-[7px] left-1/2 -translate-x-1/2 text-white text-xl font-bold">
        {ranking}
      </span>
      <svg
        width="40"
        height="64"
        viewBox="0 0 40 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4V55.6775C40 59.0315 36.1203 60.8962 33.5012 58.801L22.4988 49.999C21.0379 48.8303 18.9621 48.8303 17.5012 49.999L6.49878 58.801C3.87973 60.8962 0 59.0315 0 55.6775V4Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
