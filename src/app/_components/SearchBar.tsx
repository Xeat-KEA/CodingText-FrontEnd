import { ISearchBar } from "../_interfaces/interfaces";
import { LgSearchIcon, SmSearchIcon } from "./Icons";

export default function SearchBar({ isSmall }: ISearchBar) {
  return (
    <form
      className={`flex gap-2 w-full border border-border-2 rounded-full ${
        isSmall ? "px-4 py-2" : "px-6 py-3"
      }`}
    >
      <input className="grow text-xs" placeholder="검색어를 입력해주세요" />
      <button type="submit">
        {isSmall ? <SmSearchIcon /> : <LgSearchIcon />}
      </button>
    </form>
  );
}
