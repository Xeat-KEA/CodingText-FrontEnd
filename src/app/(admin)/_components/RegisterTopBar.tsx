export default function RegisterTopBar() {
  return (
    <div className="w-full p-2 flex items-center bg-bg-1 border-y border-border-2">
      <div className="w-[80px] list-topbar-tab">건의일</div>
      <div className="w-[100px] list-topbar-tab">건의자</div>
      <div className="w-full grow list-topbar-text">문제 제목</div>
    </div>
  );
}
