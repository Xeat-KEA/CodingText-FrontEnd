import { KeyboardEvent } from "react";
// input 내에서 Enter가 눌렸을 경우 Submit이 일어나는 것 방지
export const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
