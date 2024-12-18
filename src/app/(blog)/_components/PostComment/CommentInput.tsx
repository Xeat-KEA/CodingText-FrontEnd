import { useForm } from "react-hook-form";
import { CommentInputProps } from "../../_interfaces/interfaces";
import { useBlogStore, useTokenStore } from "@/app/stores";
import { useRouter } from "next/navigation";

export default function CommentInput({
  target,
  mentionId,
  mentionedUserName,
  onSubmit,
  onCancel,
}: CommentInputProps) {
  const { accessToken, isTokenSet } = useTokenStore();

  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  // 댓글
  const onClickSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onClickSubmit)}
      className="flex flex-col w-full justify-between  min-h-[100px] h-auto border border-border-2 rounded-xl px-6 py-4 gap-2">
      <textarea
        className="w-full h-full resize-none"
        readOnly={!accessToken}
        placeholder={
          !accessToken
            ? "로그인 후 댓글을 작성할 수 있습니다"
            : target === "reply"
            ? "답글을 남겨보세요"
            : "댓글을 남겨보세요"
        }
        {...register("comment", { required: "댓글을 입력해주세요." })}
      />
      <div className="flex relative w-full h-[33px] items-center">
        {target === "reply" && (
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-body">
              {mentionedUserName} 님에게 답글
            </p>
            <button
              className="font-semibold text-xs text-red"
              onClick={onCancel}>
              취소
            </button>
          </div>
        )}
        <div className="flex absolute right-0 items-center">
          {accessToken ? (
            <button
              type="submit"
              className="px-4 py-2 bg-primary-1 text-white text-xs text-bold rounded-md">
              작성하기
            </button>
          ) : (
            <button
            type="button"
            onClick={() => router.push("/sign-in")}
            className="px-4 py-2 bg-primary-1 text-white text-xs text-bold rounded-md">
              로그인
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
