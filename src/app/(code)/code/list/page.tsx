"use client";

import SearchBar from "@/app/_components/SearchBar";
import ProfileCard from "../../_components/ProfileCard";
import {
  CODE_FILTER_LIST,
  CODE_SEARCH_FILTER_LIST,
  DUMMY_CODE_LIST,
  DUMMY_PROFILE_DATA,
} from "../../_constants/constants";
import DropDown from "@/app/_components/Dropdown";
import ListTopBar from "../../_components/ListTopBar";
import CodeCard from "../../_components/CodeCard";
import MultiSelectionDropdown from "@/app/_components/MultiSelectionDropdown";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "@/app/_constants/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "@/app/_components/Pagination";
import { usePaginationStore } from "@/app/stores";

export default function CodeList() {
  // 문제 필터링 관련 state
  const [filteredDifficulty, setFilteredDifficulty] = useState<string[]>([]);
  const [filteredAlgorythm, setFilteredAlgorythm] = useState<string[]>([]);
  const [order, setOrder] = useState("");

  // 다중 선택 드롭다운 클릭 handle
  const onMultiSelectionClick = (
    selected: string,
    filteredArray: string[],
    setFilteredArray: Dispatch<SetStateAction<string[]>>
  ) => {
    const targetIndex = filteredArray.indexOf(selected);
    if (targetIndex === -1) {
      setFilteredArray((prev) => [...prev, selected]);
    } else {
      const beforeArray = filteredArray.slice(0, targetIndex);
      const afterArray = filteredArray.slice(targetIndex + 1);
      setFilteredArray([...beforeArray, ...afterArray]);
    }
  };

  const { setPage, setLastPage } = usePaginationStore();
  useEffect(() => {
    setPage(1);
    setLastPage(26);
  }, []);

  return (
    <div className="top-container pt-16">
      <div className="max-w-1200 flex py-12">
        {/* 문제 목록 부분 */}
        <div className="w-full pl-12 pr-3 flex flex-col gap-6 border-r border-border-2">
          {/* 문제 검색바 */}
          <SearchBar searchFilterList={CODE_SEARCH_FILTER_LIST} />
          {/* 문제 필터링 */}
          <div className="w-full flex gap-4">
            <MultiSelectionDropdown
              placeholder="난이도"
              list={DIFFICULTY_LIST}
              selectedList={filteredDifficulty}
              onSelectionClick={(selected) =>
                onMultiSelectionClick(
                  selected,
                  filteredDifficulty,
                  setFilteredDifficulty
                )
              }
            />
            <MultiSelectionDropdown
              placeholder="알고리즘"
              list={ALGORITHM_LIST}
              selectedList={filteredAlgorythm}
              onSelectionClick={(selected) =>
                onMultiSelectionClick(
                  selected,
                  filteredAlgorythm,
                  setFilteredAlgorythm
                )
              }
            />
            <DropDown
              selection={order ? order : CODE_FILTER_LIST[2].list[0]}
              list={CODE_FILTER_LIST[2].list}
              onSelectionClick={(selected) => setOrder(selected)}
            />
          </div>
          {/* 문제 리스트 */}
          <div className="w-full flex flex-col">
            {/* 문제 리스트 상단바 */}
            <ListTopBar />
            {/* 문제 */}
            <div className="w-full flex flex-col divide-y divide-border-1">
              {DUMMY_CODE_LIST.map((el) => {
                return (
                  <CodeCard
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    difficulty={el.difficulty}
                    participants={el.participants}
                    rate={el.rate}
                  />
                );
              })}
            </div>
          </div>
          <Pagination />
        </div>
        {/* 회원 정보 부분 */}
        <div className="w-[300px] shrink-0 pl-3 pr-12 relative">
          <ProfileCard userData={DUMMY_PROFILE_DATA} />
        </div>
      </div>
    </div>
  );
}
