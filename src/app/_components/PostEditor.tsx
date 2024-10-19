import { useEffect, useState } from "react";
import { LgCheckBoxIcon } from "./Icons";
import TiptapEditor from "./TipTapEditor/TiptapEditor";
import { IPost, IPostEditor, IPostForm } from "../_interfaces/interfaces";
import { useForm } from "react-hook-form";
import { useTiptapStore } from "../stores";
import DropDown from "./Dropdown";
import { Other_Board_Categories } from "../(blog)/_constants/constants";
import { useBase64 } from "../_hooks/useBase64";

export default function PostEditor({
  isCodingTest,
  isEditing,
  onCancelClick,
  onBtnClick,
}: IPostEditor) {
  // Form 데이터 관리
  const { register, handleSubmit, setValue } = useForm<IPostForm>();
  const { content } = useTiptapStore();
  const onSubmit = (data: IPostForm) => {
    // 텍스트 저장을 위해 base64로 인코딩
    const newContent = useBase64("encode", content);
    const newPostForm: IPost = { ...data, content: newContent };
    onBtnClick(newPostForm);
  };

  // 비밀글 여부 state
  const [isSecret, setIsSecret] = useState(false);

  // 비밀글 여부 변경 감지
  useEffect(() => {
    setValue("password", "");
    setValue("isSecret", isSecret);
  }, [isSecret]);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  useEffect(() => {
    // 상위 케시판 변경 시 하위 게시판 초기화
    setSubCategory("");

    setValue("parentCategory", category);
  }, [category]);

  useEffect(() => {
    setValue("childCategory", subCategory);
  }, [subCategory]);

  return (
    <form className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-4">
        {/* 제목 입력 */}
        <input
          {...register("title", { required: true })}
          className="grow post-input"
          placeholder="제목을 입력해주세요"
          autoComplete="off"
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
            autoComplete="off"
          />
        </div>
      </div>
      {/* 게시판 선택 드롭다운 */}
      {!isCodingTest && (
        <div className="flex gap-4">
          <DropDown
            placeholder="상위 게시판을 선택해주세요"
            list={Other_Board_Categories.map(
              (el, index) => index !== 0 && index !== 1 && el.title
            ).filter((el) => el !== false)}
            selection={category}
            onSelectionClick={(selected) => setCategory(selected)}
          />
          <DropDown
            placeholder="하위 게시판을 선택해주세요"
            list={
              category
                ? Other_Board_Categories.filter(
                    (el) => el.title === category
                  )[0]
                    .subCategories?.map((el, index) => index !== 0 && el.title)
                    .filter((el) => el !== false)
                : []
            }
            selection={subCategory}
            onSelectionClick={(selected) => setSubCategory(selected)}
            disabled={!category}
          />
        </div>
      )}
      {/* 텍스트 에디터 */}
      <TiptapEditor />
      {/* 하단 버튼 */}
      <div className="division" />
      {/* 하단 버튼 */}
      <div className="flex gap-4 self-end">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onCancelClick();
          }}
          className="btn-default"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="btn-primary"
        >
          {!isEditing ? "새 게시글 등록" : "수정"}
        </button>
      </div>
    </form>
  );
}
