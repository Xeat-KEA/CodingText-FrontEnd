import { Category } from "@/app/_interfaces/interfaces";

export let loggedInUserId = 1; // 임시 로그인된 사용자 ID

// // 블로그 페이지 사이드바 메뉴
// export const Blog_Side_BAR_MENU = [];

// 게시판 목록 (공통)
export const Board_Categories: Category[] = [
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
  }
];

// 게시판 목록 (개별)
export const User_Specific_Categories: Category[] = [
  {
    id: 2,
    title: "배운점 정리",
    blogId: 2,
    subCategories: [
      { id: 0, title: "전체" },
      { id: 1, title: "자유" },
      { id: 2, title: "동아리" },
      { id: 3, title: "스터디 그룹" },
    ],
  },
  {
    id: 3,
    title: "공부한 내용",
    blogId: 2,
    subCategories: [
      { id: 0, title: "전체" },
      { id: 1, title: "알고리즘 정리" },
      { id: 2, title: "고급웹프로그래밍" },
      { id: 3, title: "클라우드 네이티브" },
      { id: 4, title: "데이터베이스" },
    ],
  },
  {
    id: 4,
    title: "특별 프로젝트",
    blogId: 3,
    subCategories: [
      { id: 0, title: "전체" },
      { id: 1, title: "AI 프로젝트" },
      { id: 2, title: "웹 애플리케이션" },
      { id: 3, title: "외부 프로젝트" },
    ],
  },
  {
    id: 5,
    title: "연구 결과",
    blogId: 4,
    subCategories: [
      { id: 0, title: "전체" },
      { id: 1, title: "기계학습" },
      { id: 2, title: "데이터 분석" },
    ],
  },
]

// 블로그 프로필
export const Blog_Profile_Data = [
  {
    profileId: 1,
    profileImage: "/profileImg1.png",
    rank: "Freshman",
    name: "developer",
    Intro: "안녕하세요! 개발자를 준비하고 있는 사람입니다. 잘 부탁드립니다~",
    FollowerCount: 4,
  },
  {
    profileId: 2,
    profileImage: "/profileImg2.png",
    rank: "Senior",
    name: "programmer",
    Intro: "반가워요~ 10년차 개발자의 개발일기입니다:)",
    FollowerCount: 13,
  },
  {
    profileId: 3,
    profileImage: "/profileImg3.png",
    rank: "Sophomore",
    name: "감자",
    Intro: "나는 말하는 감자",
    FollowerCount: 28,
  },
  {
    profileId: 4,
    profileImage: "/profileImg4.png",
    rank: "Junior",
    name: "PangyoPeople",
    Intro: "I'm 개발자예요. 데일리 스크럼 가시죠. 린하게 하자요",
    FollowerCount: 529,
  },
]

// 블로그 소개글 
export const Blog_Introduction_Data = [
  {
    profileId: 1,
    blogIntro: `<div>
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
  </div>`
  },
  {
    profileId: 2,
    blogIntro: `<div>
    <h1>반갑습니다!</h1>
    <p><i>이 블로그에서는 소프트웨어 개발과 관련된 다양한 주제를 다룹니다. 개발자로서 겪은 경험과 인사이트를 공유하려고 해요.</i></p>
    <br/>
    <h3>주요 컨텐츠</h3>
    <ul>
      <li>⚙️ 프로젝트 경험: 제가 진행한 다양한 개발 프로젝트와 그 과정에서 배운 점을 소개해요.</li>
      <li>🔧 개발 도구: 효율적인 개발을 위해 사용하는 유용한 도구와 라이브러리를 추천해요.</li>
      <li>📖 기술 블로그: 새로운 기술을 배우고 적용하면서 겪은 문제들과 해결 방법을 기록해요.</li>
      <li>🌍 커뮤니티와 네트워킹: 개발자 커뮤니티에서의 활동과 네트워킹 경험을 공유해요.</li>
    </ul>
    <br/>
    <p>이 블로그에서 여러분과 함께 성장하며 배우고, 다양한 개발 이야기를 나누고 싶습니다!</p>
  </div>`
  },
  {
    profileId: 3,
    blogIntro: `<div>
    <h1>안녕하세요, 여러분!</h1>
    <p><i>이 블로그는 제 프로그래밍 여정을 기록하는 공간입니다. 코드 한 줄, 한 줄에 담긴 이야기를 나누고 싶어요.</i></p>
    <br/>
    <h3>블로그 주요 주제</h3>
    <ul>
      <li>🔍 기술 탐구: 최신 기술과 트렌드에 대한 제 생각과 연구 결과를 공유해요.</li>
      <li>👨‍💻 코드 리뷰: 제가 작성한 코드에 대한 리뷰와 개선 방법을 나눠요.</li>
      <li>💬 팁과 트릭: 프로그래밍 생활에서 유용한 팁과 트릭을 정리해서 올릴게요.</li>
      <li>📈 경력 개발: 제 경력 발전에 관한 이야기와 조언도 함께 나누고 싶어요.</li>
    </ul>
    <br/>
    <p>여러분과 함께 성장하는 블로그가 되길 바라요. 많이 방문해주세요!</p>
  </div>`
  },
  {
    profileId: 4,
    blogIntro: `<div>
    <h1>데일리 스크럼 가시죠~!</h1>
    <p><i>개발 방향은 어느 정도 얼라인 됐구요, 아직 개발팀 리소스 파악 중이라 지라에는 업데이트 못했는데요, 슬랙으로 어제 말씀드렸던 것처럼 듀데잇까지는 완성할 수 있을 것 같습니다.</i></p>
    <br/>
    <h3>근데 너무 늦지 않아요?</h3>
    <ul>
      <li>씨레벨에 보여줄 게 있어야 하잖아요~! 좀 린하게 해서 일정 당길 순 없어요?</li>
      <li>지난달 회고미팅에서 애자일하게 일하겠다는 레슨런 공유해주셨던 거 기억하시죠? 이번에도 그거 잘 써먹어 봅시다~</li>
    </ul>
    <br/>
    <p>이 블로그에서는 판교 개발자의 일상을 린하게, 애자일하게 담아내고 있습니다. 함께 판교사투리 배워보자요~!</p>
  </div>`
  }
]

// 일반 게시물 내용
export const Blog_Post_Data = [
  {
    postId: 1,
    blogId: 1,
    categoryId: 1,
    subCategoryId: 1,
    title: "리액트 1일차",
    content: `
      <h2>리액트를 공부하며 느낀 점</h2>
      <p>리액트를 공부하면서 많은 것을 배웠습니다. 컴포넌트 기반 아키텍처와 상태 관리 방식은 매우 직관적이었으며, 
        특히 재사용 가능한 UI를 만들 수 있다는 점에서 큰 인사이트를 얻었습니다.</p>
      <p>하지만 처음에는 JSX 문법과 상태 관리의 개념을 이해하는 것이 다소 어려웠습니다. 
        하지만 학습을 거듭할수록 리액트의 강력한 기능들을 체험할 수 있었습니다.</p>
      <h3>리액트를 통해 하고 싶은 것</h3>
      <ul>
        <li>재사용 가능한 컴포넌트 라이브러리 제작</li>
        <li>상태 관리 라이브러리 (예: Redux, Zustand) 심화 학습</li>
        <li>프론트엔드 최적화와 성능 개선 연구</li>
        <li>Next.js를 활용한 SSR 및 SEO 최적화된 웹사이트 제작</li>
      </ul>
      <p>앞으로도 리액트에 대한 학습을 지속하며, 개인 프로젝트를 통해 꾸준히 성장할 계획입니다. 
        이를 통해 더 나은 프론트엔드 개발자가 되도록 노력하겠습니다!</p>
`,
    viewCount: 150,
    isSecret: false,
    isBlind: false,
    password: "",
    likeCount: 25,
    reportCount: 0,
    commentCount: 10,
    createdAt: "2024-01-15 10:00",
    modifiedAt: "2024-01-15 12:00",
  },
  {
    postId: 2,
    blogId: 2,
    categoryId: 1,
    subCategoryId: 3,
    title: "두 번째 게시물",
    content: `
      <h2>흥미로운 주제 탐구</h2>
      <p>두 번째 게시물에서는 새로운 주제를 깊이 있게 탐구합니다. 여기에 대한 다양한 시각을 제공하며, 논란이 될 만한 주제도 다루고 있습니다.</p>
      <ul>
        <li>주제 소개 및 배경</li>
        <li>찬반 의견</li>
        <li>결론 및 개인적인 생각</li>
      </ul>
      <p>여러분의 의견도 댓글로 남겨주세요!</p>
    `,
    viewCount: 250,
    isSecret: false,
    isBlind: true,
    password: "secret123",
    likeCount: 30,
    reportCount: 1,
    commentCount: 5,
    createdAt: "2024-02-10 14:30",
    modifiedAt: "2024-02-10 15:00",
  },
  {
    postId: 3,
    blogId: 2,
    categoryId: 3,
    subCategoryId: 4,
    title: "세 번째 게시물",
    content: `
      <h2>비밀 게시물: 숨겨진 이야기</h2>
      <p>이 게시물은 비공개로 작성된 특별한 이야기입니다. 여기서 다루는 내용은 외부에 공개되지 않은 정보로, 오직 제한된 독자들만 볼 수 있습니다.</p>
      <ul>
        <li>비밀스러운 사실 1</li>
        <li>깊이 있는 분석</li>
        <li>예상치 못한 결론</li>
      </ul>
      <p>비밀번호를 아는 사람만 읽을 수 있습니다!</p>
    `,
    viewCount: 75,
    isSecret: true,
    isBlind: false,
    password: "mypassword",
    likeCount: 5,
    reportCount: 0,
    commentCount: 0,
    createdAt: "2024-03-05 09:00",
    modifiedAt: "2024-03-05 09:00",
  },
  {
    postId: 4,
    blogId: 3,
    categoryId: 1,
    subCategoryId: 4,
    title: "네 번째 게시물",
    content: `
      <h2>다양한 주제 논의</h2>
      <p>네 번째 게시물에서는 여러 가지 주제를 논의합니다. 이 글은 다양한 관점을 통해 특정 주제를 깊이 있게 탐구하는 것을 목표로 하고 있습니다.</p>
      <ul>
        <li>첫 번째 주제</li>
        <li>두 번째 주제</li>
        <li>결론 및 제안</li>
      </ul>
      <p>댓글로 여러분의 생각을 공유해주세요!</p>
    `,
    viewCount: 400,
    isSecret: false,
    isBlind: false,
    password: "",
    likeCount: 40,
    reportCount: 2,
    commentCount: 15,
    createdAt: "2024-04-01 11:00",
    modifiedAt: "2024-04-01 11:30",
  },
  {
    postId: 5,
    blogId: 3,
    categoryId: 4,
    subCategoryId: 3,
    title: "다섯 번째 게시물",
    content: `
      <h2>다섯 번째의 매력</h2>
      <p>이 게시물에서는 다섯 번째 주제에 대한 깊이 있는 논의가 펼쳐집니다. 흥미로운 관점을 제공하며, 많은 이들에게 인사이트를 줄 수 있는 내용입니다.</p>
      <ul>
        <li>주제의 배경</li>
        <li>핵심 논의</li>
        <li>미래 전망</li>
      </ul>
      <p>좋아요와 댓글로 소통해주세요!</p>
    `,
    viewCount: 500,
    isSecret: false,
    isBlind: false,
    password: "",
    likeCount: 60,
    reportCount: 0,
    commentCount: 20,
    createdAt: "2024-05-12 08:45",
    modifiedAt: "2024-05-12 09:00",
  },
  {
    postId: 6,
    blogId: 4,
    categoryId: 5,
    subCategoryId: 1,
    title: "냐냐냥",
    content: `
    <h2>흥미로운 내용 소개</h2>
    <p>이 게시물은 매우 <strong>흥미로운 내용</strong>을 포함하고 있습니다. 여기에 당신이 알아야 할 중요한 정보가 담겨 있습니다.</p>
    <h3>주요 포인트:</h3>
    <ul>
      <li>첫 번째 중요한 사실</li>
      <li>두 번째 흥미로운 정보</li>
      <li>마지막으로 주의해야 할 사항</li>
    </ul>
    <blockquote>이 정보는 많은 사람들에게 유용할 것입니다!</blockquote>
    <p><strong>감사합니다.</strong></p>
    `,
    viewCount: 500,
    isSecret: false,
    isBlind: false,
    password: "",
    likeCount: 21,
    reportCount: 0,
    commentCount: 20,
    createdAt: "2024-05-11 03:45",
    modifiedAt: "2024-05-12 09:00",
  },
];

// 코딩 게시물 내용
export const IsCoding_Data = [
  {
    codePostId: 100,
    postId: 1,
    difficulty: '1단계',
    codeId: 1000,
    language: 'javascript',
    codeContent: `
      <h3>문제: 홀수 짝수 구분하기</h3>
      <p>사용자로부터 정수를 입력받아서, 그 숫자가 홀수인지 짝수인지 출력하는 프로그램을 작성하세요.</p>
      <h4>요구 사항:</h4>
      <ul>
        <li>입력: 하나의 정수</li>
        <li>출력: 그 숫자가 "짝수"인지 "홀수"인지 출력</li>
        </ul>
      <h4>예시:</h4>
      <ul>
        <li>입력: 5</li>
        <li>출력: "홀수"</li>
        <li>입력: 10</li>
        <li>출력: "짝수"</li>
      </ul>`,
    writtenCode:
      `function checkOddEven(num) {
      if (num % 2 === 0) {
        return "짝수";
      } else {
        return "홀수";
      }
    }`
  },
  {
    codePostId: 200,
    postId: 2,
    difficulty: '3단계',
    codeId: 2000,
    language: 'python',
    codeContent: `
      <h3>문제: 배열에서 최대값 찾기</h3>
      <p>주어진 배열에서 가장 큰 값을 찾는 함수를 작성하세요.</p>
      <h4>요구 사항:</h4>
      <ul>
        <li>입력: 숫자로 이루어진 배열</li>
        <li>출력: 배열 내 가장 큰 숫자</li>
      </ul>
      <h4>예시:</h4>
      <ul>
        <li>입력: [1, 2, 3, 4, 5]</li>
        <li>출력: 5</li>
      </ul>`,
    writtenCode: `def find_max(arr): return max(arr)`
  },
  {
    codePostId: 300,
    postId: 3,
    difficulty: '2단계',
    codeId: 3000,
    language: 'javascript',
    codeContent: `
      <h3>문제: 이진 탐색 알고리즘 구현</h3>
      <p>정렬된 배열에서 목표 숫자를 찾는 이진 탐색 알고리즘을 구현하세요.</p>
      <h4>요구 사항:</h4>
      <ul>
        <li>입력: 정렬된 숫자 배열, 찾고자 하는 숫자</li>
        <li>출력: 목표 숫자의 인덱스 (없으면 -1 반환)</li>
      </ul>
      <h4>예시:</h4>
      <ul>
        <li>입력: [1, 2, 3, 4, 5], 3</li>
        <li>출력: 2</li>
      </ul>`,
    writtenCode:
      `function binarySearch(arr, target) {
      let left = 0, right = arr.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
      }
      return -1;
    }`
  },
  {
    codePostId: 400,
    postId: 4,
    difficulty: '4단계',
    codeId: 4000,
    language: 'java',
    codeContent: `
      <h3>문제: 이진 탐색 알고리즘 구현</h3>
      <p>정렬된 배열에서 목표 숫자를 찾는 이진 탐색 알고리즘을 구현하세요.</p>
      <h4>요구 사항:</h4>
      <ul>
        <li>입력: 정렬된 숫자 배열, 찾고자 하는 숫자</li>
        <li>출력: 목표 숫자의 인덱스 (없으면 -1 반환)</li>
      </ul>
      <h4>예시:</h4>
      <ul>
        <li>입력: [1, 2, 3, 4, 5], 3</li>
        <li>출력: 2</li>
      </ul>`,
    writtenCode:
      `public class BinarySearch {

      // 이진 탐색 알고리즘 구현
      public static int binarySearch(int[] sortedArray, int target) {
          int left = 0;
          int right = sortedArray.length - 1;
  
          while (left <= right) {
              int mid = left + (right - left) / 2; // 중간 인덱스 계산
  
              // 목표 숫자를 찾았을 경우
              if (sortedArray[mid] == target) {
                  return mid; // 인덱스 반환
              }
  
              // 목표 숫자가 중간 값보다 작으면 왼쪽 부분 탐색
              if (sortedArray[mid] > target) {
                  right = mid - 1;
              } else { // 목표 숫자가 중간 값보다 크면 오른쪽 부분 탐색
                  left = mid + 1;
              }
          }
  
          return -1; // 목표 숫자가 배열에 없을 경우 -1 반환
      }
  
      public static void main(String[] args) {
          int[] sortedArray = {1, 2, 3, 4, 5};
          int target = 3;
  
          int index = binarySearch(sortedArray, target);
          System.out.println("목표 숫자 " + target + "의 인덱스: " + index);
      }
  }`
  },
  {
    codePostId: 500,
    postId: 5,
    difficulty: '5단계',
    codeId: 5000,
    language: 'cpp',
    codeContent: `
      <h3>문제: 문자열 회문 확인</h3>
      <p>주어진 문자열이 회문인지 확인하는 프로그램을 작성하세요.</p>
      <h4>요구 사항:</h4>
      <ul>
        <li>입력: 문자열</li>
        <li>출력: "회문" 또는 "회문이 아님"</li>
      </ul>
      <h4>예시:</h4>
      <ul>
        <li>입력: "racecar"</li>
        <li>출력: "회문"</li>
        <li>입력: "hello"</li>
        <li>출력: "회문이 아님"</li>
      </ul>`,
    writtenCode:
      `#include <iostream>
    #include <string>
    
    using namespace std;
    
    // 문자열이 회문인지 확인하는 함수
    string isPalindrome(const string& str) {
        int left = 0;
        int right = str.length() - 1;
    
        while (left < right) {
            // 양 끝의 문자가 다르면 회문이 아님
            if (str[left] != str[right]) {
                return "회문이 아님";
            }
            left++;
            right--;
        }
        return "회문";
    }
    
    int main() {
        // 예시 입력
        string input1 = "racecar";
        string input2 = "hello";
    
        // 첫 번째 입력에 대한 회문 확인
        cout << "입력: \"" << input1 << "\" -> 출력: " << isPalindrome(input1) << endl;
        
        // 두 번째 입력에 대한 회문 확인
        cout << "입력: \"" << input2 << "\" -> 출력: " << isPalindrome(input2) << endl;
    
        return 0;
    }`
  }
];