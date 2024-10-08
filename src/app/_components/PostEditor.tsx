import { useEffect, useState } from "react";
import { LgCheckBoxIcon } from "./Icons";
import TiptapEditor from "./TipTapEditor/TiptapEditor";
import { IPostEditor } from "../_interfaces/interfaces";
import { useForm } from "react-hook-form";
import { useTiptapStore } from "../stores";

export default function PostEditor({
  isCodingTest,
  isEditing,
  onCancelClick,
  onBtnClick,
}: IPostEditor) {
  // Form 데이터 관리
  const { register, handleSubmit, setValue } = useForm();
  const { content } = useTiptapStore();
  const onSubmit = (data: any) => {
    const newPostForm = { ...data, content: content };
    onBtnClick(newPostForm);
  };

  // 비밀글 여부 state
  const [isSecret, setIsSecret] = useState(false);

  // 비밀글 여부 변경 감지
  useEffect(() => {
    setValue("password", "");
    setValue("isSecret", isSecret);
  }, [isSecret]);

  return (
    <form className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-4">
        {/* 제목 입력 */}
        <input
          {...register("title", { required: true })}
          className="grow post-input"
          placeholder="제목을 입력해주세요"
        />
        {/* 비밀글 여부 설정 */}
        <div className="flex w-[256px] items-center gap-4">
          <div
            onClick={() => setIsSecret((prev) => !prev)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <LgCheckBoxIcon isActive={isSecret} />
            <span className="text-sm text-black whitespace-nowrap">비밀글</span>
          </div>
          <input
            {...register("password")}
            type="password"
            className="grow w-full post-input"
            placeholder="비밀번호를 입력해주세요"
            disabled={!isSecret}
          />
        </div>
      </div>
      {/* 게시판 선택 드롭다운 추가 필요 */}
      {!isCodingTest && <></>}
      {/* 텍스트 에디터 */}
      <TiptapEditor />
      {/* 하단 버튼 */}
      <div className="division" />
      {/* 하단 버튼 */}
      <div className="flex gap-4 self-end">
        <button onClick={onCancelClick} className="btn-default">
          취소
        </button>
        <button onClick={handleSubmit(onSubmit)} className="btn-primary">
          {!isEditing ? "새 게시글 등록" : "수정"}
        </button>
      </div>
    </form>
  );
}
