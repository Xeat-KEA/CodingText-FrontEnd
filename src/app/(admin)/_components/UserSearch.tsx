import SmSearchBar from "@/app/_components/SmSearchBar";

export default function UserSearch() {
  return (
    <div className="edit-container">
      <span className="edit-title">사용자 조회</span>
      <SmSearchBar
        baseURL="/admin/user"
        placeholder="닉네임 또는 이메일을 입력해주세요"
      />
    </div>
  );
}
