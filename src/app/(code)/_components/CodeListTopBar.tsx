export default function CodeListTopBar({ isAdmin }: { isAdmin?: boolean }) {
  return (
    <div className="w-full p-2 flex gap-4 justify-between items-center bg-primary-2 border-y border-border-2">
      <div className="w-full flex gap-2">
        <div className="w-[60px] list-topbar-tab">문제 번호</div>
        <div className="w-full grow list-topbar-text">제목</div>
      </div>
      {!isAdmin && (
        <div className="flex gap-8">
          <div className="w-10 list-topbar-tab">난이도</div>
          <div className="w-16 list-topbar-tab">문제 푼 사람</div>
          <div className="w-10 list-topbar-tab">정답률</div>
        </div>
      )}
    </div>
  );
}
