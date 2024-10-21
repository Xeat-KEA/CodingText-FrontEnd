import { useForm } from "react-hook-form";
import { ICommentInput } from "../../_interfaces/interfaces";
import { Blog_Profile_Data } from "../../_constants/constants";

export default function CommentInput({ target, mentionId, onSubmit, onCancel }: ICommentInput) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const mentionProfile = Blog_Profile_Data.find((profile) => profile.profileId === mentionId);

    const onClickSubmit = (data: any) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onClickSubmit)} className="flex flex-col w-full justify-between h-36 border border-border-2 rounded-xl px-6 py-4 gap-2">
            <textarea
                className="w-full h-full resize-none"
                placeholder={target === "reply" ? "답글을 남겨보세요" : "댓글을 남겨보세요"}
                {...register("comment", { required: "댓글을 입력해주세요." })}
            />
            <div className="flex relative w-full h-[33px] items-center">
                {target === "reply" && (
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-body">{mentionProfile?.name} 님에게 답글</p>
                        <button className="font-semibold text-xs text-red" onClick={onCancel}>취소</button>
                    </div>
                )}
                <div className="flex absolute right-0 items-center">
                    <button
                        type="submit"
                        className="w-[74px] h-[33px] bg-primary text-white text-xs text-bold rounded-md"
                    >
                        작성하기
                    </button>
                </div>
            </div>
        </form>
    )
}