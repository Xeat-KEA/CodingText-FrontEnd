import { ProfileTab } from "@/app/_interfaces/interfaces";

export const ADMIN_TAB_LIST: ProfileTab[] = [
  { content: "사용자 관리", url: "/admin/user" },
  { content: "관리자 관리", url: "/admin/admin" },
  { content: "문제 관리", url: "/admin/code" },
  { content: "신고 내역", url: "/admin/report" },
  { content: "등록 신청 문제 내역", url: "/admin/registered" },
  { content: "알림", url: "/admin/push" },
  { content: "공지사항", url: "/admin/notice" },
  { content: "클라우드 사용량", url: "/admin/billing" },
];

export const REPORT_TAP_LIST = ["블로그", "게시글", "댓글"];

export const ADMIN_MANAGEMENT_TAB = ["관리자", "승인 대기"];
