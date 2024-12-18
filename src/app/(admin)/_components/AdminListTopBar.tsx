export default function AdminListTopBar({ tab }: { tab: string }) {
  return (
    <div className="w-full p-2 -m-[1px] gap-4 flex justify-between items-center bg-primary-2 border-y border-border-2">
      <div className="w-full grow list-topbar-text">이메일</div>
      {tab === "관리자" && (
        <div className="flex gap-2">
          <div className="w-[60px] list-topbar-tab">구분</div>
          <div className="w-[45px]"></div>
        </div>
      )}
    </div>
  );
}
