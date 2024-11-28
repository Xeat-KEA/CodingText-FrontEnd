import { Post, BlogProfile, ProfileTab } from "@/app/_interfaces/interfaces";
import { Report } from "../_interfaces/interfaces";
import {CommentProps} from "../../(blog)/_interfaces/interfaces"

export const ADMIN_TAB_LIST: ProfileTab[] = [
  { content: "사용자 관리", url: "/admin/user" },
  { content: "관리자 관리", url: "/admin/admin" },
  { content: "문제 관리", url: "/admin/code" },
  { content: "신고 내역", url: "/admin/report" },
  { content: "등록 신청 문제 내역", url: "/admin/registered" },
  { content: "알림", url: "/admin/push" },
  { content: "공지사항", url: "/admin/notice"},
  { content: "클라우드 사용량", url: "/admin/billing" },
];

export const REPORT_TAP_LIST = ["게시글", "댓글"];

export const Report_Dummy_Data: Report[] = [
  {
    reportId: 1,
    reportUserId: 101, // 신고자 아이디
    reportedBlogId: 101, // 신고된 게시글 유저 아이디
    reportedPostId: 1,
    reportedAt: "2024.10.30",
    reportReason: "직접 입력",
    directReason: "욕설이 포함된 게시글입니다"
  },
  {
    reportId: 2,
    reportUserId: 101,
    reportedBlogId: 101,
    reportedPostId: 1,
    reportedAt: "2024.10.29",
    reportedCommentId: 1,
    reportedCommentUserID: 1,
    reportReason: "부적절한 내용",
  },
  {
    reportId: 3,
    reportUserId: 101,
    reportedBlogId: 101,
    reportedPostId: 1,
    reportedAt: "2024.10.28",
    reportedCommentId: 2,
    reportedCommentUserID: 1,
    reportReason: "허위 사실 유포",
  },
]

export const Profile_Dummy_Data: BlogProfile[] = [
  {
    blogId: 101,
    profileUrl: "/profileImg1.png",
    userName: "개발자",
    tier: "sophomore",
    profileMessage: "안녕하세요, 개발자입니다",
    followCount: 3,
    followCheck: false,
  }
]

export const Post_Dummy_Data = [
  {
    postId: 1,
    blogId: 101,
    categoryId: 1,
    subCategoryId: 2,
    title: "일반 게시글",
    content: "7J6E7IucIOqyjOyLnOusvOyeheuLiOuLpC4K6rCc67Cc7J6Q7J6F64uI64ukLgrrsJjqsJHsirXri4jri6Qu",
    viewCount: 75,
    isSecret: true,
    isBlind: true,
    password: "mypassword",
    likeCount: 5,
    reportCount: 0,
    commentCount: 0,
    createdAt: "2024-03-05 09:00",
    modifiedAt: "2024-03-05 09:00",
  },
  {
    postId: 2,
    blogId: 101,
    categoryId: 1,
    subCategoryId: 2,
    title: "코딩 게시글",
    content: "7J6E7IucIOqyjOyLnOusvOyeheuLiOuLpC4K6rCc67Cc7J6Q7J6F64uI64ukLgrrsJjqsJHsirXri4jri6Qu",
    viewCount: 75,
    isSecret: false,
    isBlind: false,
    password: "",
    likeCount: 5,
    reportCount: 0,
    commentCount: 0,
    createdAt: "2024-03-05 09:00",
    modifiedAt: "2024-03-05 09:00",
  }
]

export const Code_Post_Dummy_Data = [
  {
    codePostId: 100,
    postId: 1,
    difficulty: '1단계',
    codeId: 1000,
    language: 'javascript',
    codeContent: "PGgzPuusuOygnDog7ZmA7IiYIOynneyImCDqtazrtoTtlZjquLA8L2gzPg==",
    writtenCode: "SGVsbG8gV29ybGQ="
  }
]

export const Comment_Dummy_Data = [
  {
    replyId: 1,
    postId: 1,
    userId: 101,
    mentionId: null,
    parentReplyId: null,
    content: "첫 번째 게시물에 대한 첫 번째 댓글입니다.",
    createdAt: "2024-10-19 14:32:00",
    modifiedAt: "2024-10-19 14:32:00"
  },
  {
    replyId: 2,
    postId: 1,
    userId: 101,
    mentionId: 101,
    parentReplyId: 1,
    content: "첫 번째 댓글에 동의합니다! 정말 좋은 의견이에요.",
    createdAt: "2024-10-19 16:30:00",
    modifiedAt: "2024-10-19 16:30:00"
  },
]
export const ADMIN_MANAGEMENT_TAB = ["관리자", "승인 대기"];
