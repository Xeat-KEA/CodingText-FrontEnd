import { BoardCategory } from "../_interfaces/interfaces";

// 블로그 페이지 사이드바 메뉴
export const Blog_Side_BAR_MENU = [];

// 게시판 목록
export const Board_Categories:BoardCategory[] = [
    {
        id: 0,
        title: "전체",
    },
    {
        id: 1,
        title: "코딩테스트 풀이",
        subCategories: [
            { id: 0, title: "전체" },
            { id: 1, title: "1단계" },
            { id: 2, title: "2단계" },
            { id: 3, title: "3단계" },
            { id: 4, title: "4단계" },
            { id: 5, title: "5단계" },
        ],
    },
    {
        id: 2,
        title: "배운점 정리",
        subCategories: [
            { id: 0, title: "전체" },
            { id: 1, title: "자유" },
            { id: 2, title: "알고리즘 정리" },
        ],
    },
];

// 블로그 프로필
export const Blog_Profile_Data = [{
    profileId: 1,
    profileImage: "/profile.png",
    rank: "Junior",
    name: "developer",
    Intro: "안녕하세요! 개발자를 준비하고 있는 사람입니다. 잘 부탁드립니다~",
    FollowerCount: 4,
}]


export let loggedInUserId = 'user'; // 로그인 사용자 ID
export let blogOwnerId = 'user'; // 블로그 소유자 ID

export const Dummy_Data = "<div> 안녕하세요 </div><h1>안녕</h1><h2>반가워요</h2>"