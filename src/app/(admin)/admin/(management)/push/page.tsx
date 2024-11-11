"use client";

import ManageReceiver from "@/app/(admin)/_components/ManageReceiver";
import PushFormContainer from "@/app/(admin)/_components/PushFormContainer";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import { useState } from "react";

export default function PushPage() {
  // 전체 공지 여부
  const [isAll, setIsAll] = useState(false);
  const onAllClick = () => setIsAll((prev) => !prev);

  // 수신자 목록 저장 state
  const [receivers, setReceivers] = useState<string[]>([]);
  // 수신자 목록에 유저 추가
  const onAddUser = (nickName: string) => {
    if (receivers.indexOf(nickName) === -1) {
      setReceivers((prev) => [...prev, nickName]);
    } else {
      // 닉네임 중복 시 에러 Dialog 출력
      setIsError("sameNickname");
    }
  };
  // 수신자 목록에서 특정 유저 삭제
  const onDelete = (nickName: string) => {
    const targetIndex = receivers.indexOf(nickName);
    const before = receivers.slice(0, targetIndex);
    const after = receivers.slice(targetIndex + 1);
    const newReceivers = [...before, ...after];
    setReceivers(newReceivers);
  };

  const [isError, setIsError] = useState("");
  const [isDone, setIsDone] = useState(false);

  // 알림 전달
  const onSubmit = (nickName: string) => {
    if (!isAll && receivers.length === 0) {
      setIsError("emptyReceiver");
    } else {
      // API로 알림 POST 필요

      // 완료 state 설정
      setIsDone((prev) => !prev);

      // 상태값 초기화
      setIsAll(false);
      setReceivers([]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 pt-2">
        <ManageReceiver
          isAll={isAll}
          onAllClick={onAllClick}
          onDelete={onDelete}
          onAddUser={onAddUser}
          receivers={receivers}
        />
        {/* 알림 입력칸 */}
        <PushFormContainer onSubmit={onSubmit} isDone={isDone} />
      </div>
      {isError === "sameNickname" && (
        <Dialog
          icon={<DialogXIcon />}
          title="중복된 닉네임이에요"
          backBtn="확인"
          onBackBtnClick={() => setIsError("")}
        />
      )}
      {isError === "emptyReceiver" && (
        <Dialog
          icon={<DialogXIcon />}
          title="수신자가 비어 있어요"
          backBtn="확인"
          onBackBtnClick={() => setIsError("")}
        />
      )}
      {isDone && (
        <Dialog
          icon={<DialogCheckIcon />}
          title="공지가 발송되었어요"
          backBtn="확인"
          onBackBtnClick={() => setIsDone((prev) => !prev)}
        />
      )}
    </>
  );
}
