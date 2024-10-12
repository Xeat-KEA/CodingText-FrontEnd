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

// 블로그 소개글 
export const blog_Introduction_Data = `
  <div>
    <h1>안녕하세요!</h1>
    <p><i>환영합니다! 이곳은 코딩 테스트 문제를 풀며 쌓은 경험과 학습을 공유하는 블로그입니다.</i></p>
    <br/>
    <h3>블로그에서 다룰 내용들</h3>
    <ul>
      <li>💻 코딩 테스트: 다양한 문제를 해결하면서 얻은 팁과 풀이 방법을 공유해요.</li>
      <li>📚 공부한 내용: 알고리즘, 자료구조 등 제가 배운 내용을 정리하고 기록해요.</li>
      <li>📝 느낀 점: 문제를 풀면서 겪은 어려움과 배운 교훈을 나누고 싶어요.</li>
      <li>🤝 커뮤니티: 함께 공부하는 분들과의 소통과 피드백을 통해 서로 성장해요.</li>
    </ul>
    <br/>
    <p>정기적으로 업데이트되는 이 공간에서 코딩에 대한 이야기를 나누고, 함께 성장해나가요!</p>
  </div>
`;