export default function UserListTopBar() {
  return (
    <div className="w-full p-2 flex gap-4 justify-between items-center bg-bg-1 border-y border-border-2">
      <div className="w-full flex gap-2">
        <div className="w-[100px] list-topbar-tab">닉네임</div>
        <div className="w-full grow list-topbar-text">이메일</div>
      </div>
      <div className="flex gap-8">
        <div className="w-[80px] list-topbar-tab">등급</div>
        <div className="w-[80px] list-topbar-tab">가입일</div>
      </div>
    </div>
  );
}
