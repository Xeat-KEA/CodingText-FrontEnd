import { useBase64 } from "@/app/_hooks/useBase64";
import {
  Category,
  Post,
  PostEditorProps,
  PostForm,
} from "@/app/_interfaces/interfaces";
import { useTiptapStore } from "@/app/stores";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LgCheckBoxIcon } from "../Icons";
import TiptapEditor from "../TipTapEditor/TiptapEditor";
import CategoryDropDown from "./CategoryDropDown";
import { Other_Board_Categories } from "@/app/(blog)/_constants/constants";

export default function PostEditor({
  isCodingTest,
  isEditing,
  onCancelClick,
  onBtnClick,
}: PostEditorProps) {
  // Form 데이터 관리
  const { register, handleSubmit, setValue } = useForm<PostForm>();
  const { content } = useTiptapStore();
  const onValid = (data: PostForm) => {
    // 텍스트 저장을 위해 base64로 인코딩
    const newContent = useBase64("encode", content);
    const newPostForm: Post = { ...data, content: newContent };
    onBtnClick(newPostForm);
  };

  // 비밀글 여부 state
  const [isSecret, setIsSecret] = useState(false);

  // 비밀글 여부 변경 감지
  useEffect(() => {
    setValue("password", "");
    setValue("isSecret", isSecret);
  }, [isSecret]);

  // 사용자 게시판 저장
  const [categoryList, setCategoryList] = useState<Category[]>();
  useEffect(() => {
    // 전체, 코딩테스트 풀이 게시판 제외
    setCategoryList(Other_Board_Categories.filter((_, index) => index > 1));
  }, []);

  // 게시판 저장을 위한 state 선언
  const [category, setCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<Category>();
  const [subCategoryList, setSubCategoryList] = useState<Category[]>();
  useEffect(() => {
    // 상위 케시판 변경 시 하위 게시판 초기화
    setSubCategory(undefined);
    if (category) {
      setSubCategoryList(
        category.subCategories?.filter((_, index) => index > 0)
      );
    }

    // 상위 게시판 저장
    setValue("parentCategory", category?.id);
  }, [category]);

  // 하위 게시판 저장
  useEffect(() => {
    setValue("childCategory", subCategory?.id);
  }, [subCategory]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full h-full flex flex-col gap-4"
    >
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
          <CategoryDropDown
            list={categoryList}
            selection={category}
            onSelectionClick={(selected) => setCategory(selected)}
            placeholder="상위 게시판 선택"
          />
          <CategoryDropDown
            list={subCategoryList}
            selection={subCategory}
            onSelectionClick={(selected) => setSubCategory(selected)}
            placeholder="하위 게시판 선택"
          />
        </div>
      )}
      {/* 텍스트 에디터 */}
      <TiptapEditor />
      {/* 하단 버튼 */}
      <div className="division" />
      {/* 하단 버튼 */}
      <div className="flex gap-4 self-end">
        <button type="button" onClick={onCancelClick} className="btn-default">
          취소
        </button>
        <button type="submit" className="btn-primary">
          {!isEditing ? "새 게시글 등록" : "수정"}
        </button>
      </div>
    </form>
  );
}
