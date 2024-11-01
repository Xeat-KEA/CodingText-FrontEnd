import SmCheckBoxBtn from "@/app/_components/SmCheckBoxBtn";
import SearchUserBar from "./SearchUserBar";
import { ManageReceiverProps } from "../_interfaces/interfaces";

export default function ManageReceiver({
  isAll,
  onAllClick,
  onDelete,
  onAddUser,
  receivers,
}: ManageReceiverProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="edit-container">
        <span className="edit-title">알림 수신자 추가</span>
        <SmCheckBoxBtn isActive={isAll} onClick={onAllClick} />
      </div>
      {/* 사용자 추가 입력칸 */}
      <div className="flex flex-col gap-2">
        {/* 사용자 검색 바 */}
        <SearchUserBar
          onAddUser={(nickName) => onAddUser(nickName)}
          isDisabled={isAll}
        />
        {/* 수신자 목록 */}
        <div
          className={`w-full max-w-[240px] h-[160px] px-6 py-4 flex flex-col gap-2 border border-border-2 rounded-lg overflow-y-auto ${
            isAll ? "bg-bg-1" : "bg-white"
          }`}
        >
          {receivers.map((el) => (
            <div key={el} className="flex w-full justify-between items-center">
              <span className="text-black">{el}</span>
              <button
                className="edit-btn-red"
                onClick={() => onDelete(el)}
                disabled={isAll}
              >
                취소
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
