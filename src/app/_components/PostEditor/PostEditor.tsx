import { useBase64 } from "@/app/_hooks/useBase64";
import {
  Category,
  PostEditorProps,
  PostForm,
} from "@/app/_interfaces/interfaces";
import {
  useCategoryStore,
  useCodingTestStore,
  useTiptapStore,
} from "@/app/stores";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LgCheckBoxIcon } from "../Icons";
import TiptapEditor from "../TipTapEditor/TiptapEditor";
import CategoryDropDown from "./CategoryDropDown";

export default function PostEditor({
  initialData,
  isCodingTest,
  isEditing,
  onCancelClick,
  onBtnClick,
}: PostEditorProps) {
  // 전역 변수
  const { boardCategories } = useCategoryStore();
  const {
    title,
    setTitle,
    isSecret: isCodingTestSecret,
    setIsSecret: setIsCodingTestSecret,
    password,
    setPassword,
  } = useCodingTestStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [initialContent, setInitialContent] = useState("");
  const [firstRendering, setFirstRendering] = useState(true);

  // Form 데이터 관리
  const { register, handleSubmit, setValue, watch } = useForm<PostForm>({
    defaultValues:
      initialData && isEditing
        ? {
            title: initialData.title,
            password: initialData.password,
            isSecret: initialData.isSecret,
            parentCategoryId: initialData.parentCategoryId,
            childCategoryId: initialData.childCategoryId,
            originalImageList: initialData.originalImageList,
          }
        : {},
  });

  const { content, setContent } = useTiptapStore();

  const onValid = (data: PostForm) => {
    const { ...rest } = data;

    const newPostForm: PostForm = {
      ...rest,
      content,
      ...(initialData?.parentCategoryId === 1 && {
        childCategoryId: initialData?.childCategoryId,
      }),
    };
    onBtnClick(newPostForm);
  };

  // 비밀글 여부 state
  const [isSecret, setIsSecret] = useState(false);

  // 비밀글 여부 변경 감지
  useEffect(() => {
    setValue("password", "");
    setPassword("");
    setValue("isSecret", isSecret);
    setIsCodingTestSecret(false);
  }, [isSecret]);

  // 비밀글 여부에 따라 password validation 처리
  useEffect(() => {
    if (isSecret) {
      register("password", { required: "비밀번호를 입력해주세요" });
    } else {
      setValue("password", "");
      register("password", { required: false });
    }
  }, [isSecret, setValue, register]);

  // 사용자 게시판 저장
  const [categoryList, setCategoryList] = useState<Category[]>();
  useEffect(() => {
    if (boardCategories) {
      // 전체, 코딩테스트 풀이 게시판 제외
      setCategoryList(boardCategories?.filter((_, index) => index > 0));
    }
  }, [boardCategories]);

  // 게시판 저장을 위한 state 선언
  const [category, setCategory] = useState<Category>();
  const [childCategory, setChildCategory] = useState<Category>();
  const [childCategoryList, setChildCategoryList] = useState<Category[]>();

  useEffect(() => {
    if (isEditing) {
      if (initialData && categoryList) {
        setIsSecret(Boolean(initialData.isSecret));

        const selectedCategory = categoryList.find(
          (cat) => cat.id === initialData.parentCategoryId
        );
        setCategory(selectedCategory); // 상위 게시판 설정

        const selectedchildCategory = selectedCategory?.childCategories?.find(
          (subCat) => subCat.id === initialData.childCategoryId
        );
        setChildCategory(selectedchildCategory); // 하위 게시판 설정

        const decodedContent = useBase64("decode", initialData.content);
        setInitialContent(decodedContent); // 초기값 설정
        setContent(decodedContent); // Tiptap 에디터의 내용 설정
      }
    } else {
      // 새 게시글 작성 시 content 초기화
      setContent(""); // Tiptap 에디터의 내용 초기화
    }
    setIsLoaded(true);
  }, [isEditing, initialData, categoryList, setValue]);

  useEffect(() => {
    // 상위 게시판 변경 시 하위 게시판 초기화
    if (!firstRendering) {
      setChildCategory(undefined);
    }

    if (category) {
      setChildCategoryList(category.childCategories);
    }

    // 상위 게시판 저장
    setValue("parentCategoryId", category?.id);
  }, [category]);

  // 하위 게시판 저장
  useEffect(() => {
    setValue("childCategoryId", childCategory?.id);
  }, [childCategory]);

  useEffect(() => {
    setTitle(watch("title"));
  }, [watch("title")]);
  useEffect(() => {
    setIsCodingTestSecret(watch("isSecret") || false);
  }, [watch("isSecret")]);
  useEffect(() => {
    setPassword(watch("password") || "");
  }, [watch("password")]);

  // 초기값 설정
  useEffect(() => {
    if (title) {
      setValue("title", title);
    }
    if (isCodingTestSecret) {
      setValue("isSecret", isCodingTestSecret);
    }
    if (password) {
      setValue("password", password);
    }
  }, []);

  return (
    <>
      {isLoaded && (
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
                onClick={() => setValue("isSecret", !watch("isSecret"))}
                className="flex gap-2 items-center cursor-pointer"
              >
                <LgCheckBoxIcon isActive={watch("isSecret")} />
                <span className="text-sm text-black whitespace-nowrap">
                  비밀글
                </span>
              </div>
              <input
                {...register("password")}
                type="password"
                className="grow w-full post-input"
                placeholder="비밀번호를 입력해주세요"
                disabled={!watch("isSecret")}
                autoComplete="off"
              />
            </div>
          </div>
          {/* 게시판 선택 드롭다운 */}
          {!isCodingTest && (
            <div className="flex gap-4">
              {initialData?.parentCategoryId === 1 ? (
                <>
                  <div className="relative flex items-center w-full px-4 py-2 border border-border-2 rounded-lg bg-white">
                    <span
                      className={`grow flex justify-center text-xs text-black whitespace-nowrap `}
                    >
                      코딩 테스트 풀이
                    </span>
                  </div>
                  <div className="flex items-center w-full px-4 py-2 border border-border-2 rounded-lg bg-white">
                    <span
                      className={`grow flex justify-center text-xs text-black whitespace-nowrap `}
                    >
                      {initialData.childName}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <CategoryDropDown
                    list={categoryList}
                    selection={category}
                    onSelectionClick={(selected) => {
                      setCategory(selected);
                      setFirstRendering(false);
                    }}
                    placeholder="상위 게시판 선택"
                  />
                  <CategoryDropDown
                    list={childCategoryList}
                    selection={childCategory}
                    onSelectionClick={(selected) => {
                      setChildCategory(selected);
                      setFirstRendering(false);
                    }}
                    placeholder="하위 게시판 선택"
                  />
                </>
              )}
            </div>
          )}
          {/* 텍스트 에디터 */}
          {<TiptapEditor key={initialContent} />}
          {/* 하단 버튼 */}
          <div className="division" />
          {/* 하단 버튼 */}
          <div className="flex gap-4 self-end">
            <button
              type="button"
              onClick={onCancelClick}
              className="btn-default"
            >
              취소
            </button>
            <button type="submit" className="btn-primary">
              {!isEditing ? "새 게시글 등록" : "수정"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
