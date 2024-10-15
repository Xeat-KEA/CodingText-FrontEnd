"use client";

import TopBar from "../_components/TopBar";
import SearchBar from "../_components/SearchBar";
import MultiSelectionDropdown from "../_components/MultiSelectionDropdown";
import {
  CODE_FILTER_LIST,
  CODE_SEARCH_FILTER_LIST,
  DUMMY_PROFILE_DATA,
} from "./_constants/constants";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "../_constants/constants";
import DropDown from "../_components/Dropdown";
import Pagination from "../_components/Pagination";
import ProfileCard from "./_components/ProfileCard";
import { useCodeFilterStore } from "../stores";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 문제 필터링 관련 state
  const {
    difficulty,
    setDifficulty,
    algorithm,
    setAlgorithm,
    order,
    setOrder,
  } = useCodeFilterStore();

  // 다중 선택 드롭다운 클릭 handle
  const onMultiSelectionClick = (
    selected: string,
    filteredList: string[],
    setFilteredList: (newList: string[]) => void
  ) => {
    const targetIndex = filteredList.indexOf(selected);
    if (targetIndex === -1) {
      const newList = [...filteredList, selected];
      setFilteredList(newList);
    } else {
      const beforeList = filteredList.slice(0, targetIndex);
      const afterList = filteredList.slice(targetIndex + 1);
      setFilteredList([...beforeList, ...afterList]);
    }
  };

  return (
    <>
      <TopBar />
      <div className="top-container pt-16">
        <div className="max-w-1200 flex py-12">
          {/* 문제 목록 부분 */}
          <div className="w-full pl-12 pr-3 flex flex-col gap-6 border-r border-border-2">
            {/* 문제 검색바 (검색 필터링 Dropdown이 가려지지 않게 z-index 설정) */}
            <div className="z-10">
              <SearchBar searchFilterList={CODE_SEARCH_FILTER_LIST} />
            </div>
            {/* 문제 필터링 */}
            <div className="w-full flex gap-4">
              <MultiSelectionDropdown
                placeholder="난이도"
                list={DIFFICULTY_LIST}
                selectedList={difficulty}
                onSelectionClick={(selected) =>
                  onMultiSelectionClick(selected, difficulty, setDifficulty)
                }
              />
              <MultiSelectionDropdown
                placeholder="알고리즘"
                list={ALGORITHM_LIST}
                selectedList={algorithm}
                onSelectionClick={(selected) =>
                  onMultiSelectionClick(selected, algorithm, setAlgorithm)
                }
              />
              {/* 문제 목록 페이지에서만 렌더링 */}
              {pathname === "/code/list" && (
                <DropDown
                  selection={order ? order : CODE_FILTER_LIST[2].list[0]}
                  list={CODE_FILTER_LIST[2].list}
                  onSelectionClick={(selected) => setOrder(selected)}
                />
              )}
            </div>
            {/* 문제 리스트 */}
            {children}
            <Pagination />
          </div>
          {/* 회원 정보 부분 */}
          <div className="w-[300px] shrink-0 pl-3 pr-12 relative">
            <ProfileCard userData={DUMMY_PROFILE_DATA} />
          </div>
        </div>
      </div>
    </>
  );
}
