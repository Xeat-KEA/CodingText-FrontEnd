export default function HistoryTopBar() {
  return (
    <div className="w-full p-2 flex gap-4 justify-between items-center bg-primary-2 border-y border-border-2">
      <div className="w-full flex gap-2">
        <div className="w-20 list-topbar-tab">날짜</div>
        <div className="w-[60px] list-topbar-tab">문제 번호</div>
        <div className="w-full grow list-topbar-text">제목</div>
      </div>
      <div className="w-12 list-topbar-tab">정답 여부</div>
    </div>
  );
}
