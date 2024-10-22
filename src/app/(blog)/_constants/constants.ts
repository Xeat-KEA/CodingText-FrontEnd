import { Category, Selection } from "@/app/_interfaces/interfaces";
import { CommentForm } from "../_interfaces/interfaces";

export let loggedInUserId = 1; // 임시 로그인된 사용자 ID

// // 블로그 페이지 사이드바 메뉴
// export const Blog_Side_BAR_MENU = [];

export const REPORT_REASONS: Selection[] = [
  { content: "스팸 및 광고", selection: "spam" },
  { content: "부적절한 내용", selection: "inappropriate" },
  { content: "개인 정보 침해", selection: "privacy" },
  { content: "허위 사실 유포", selection: "false-info" },
  { content: "직접 입력", selection: "" },
];

// 게시판 목록 (본인)
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
  },
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
];

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
];

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
  </div>`,
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
  </div>`,
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
  </div>`,
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
  </div>`,
  },
];
export const DUMMY_BLOG_POST_DATA = [
  {
    category: "하위 게시판1",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목1",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판1",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목2",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판2",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목3",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판2",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목4",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판1",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목5",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판4",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목6",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판1",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목7",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판3",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목8",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판3",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목9",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
  {
    category: "하위 게시판2",
    createdAt: "2024-10-14T21:59:16.6362039",
    title: "게시글 제목10",
    content: "게시글 내용 게시글 내용",
    likes: 123,
    comments: 123,
    views: 1234,
  },
];
// 일반 게시물 내용
export const Blog_Post_Data = [
  {
    postId: 1,
    blogId: 1,
    categoryId: 1,
    subCategoryId: 1,
    title: "홀수 짝수 구분하기 자바스크립트로 풀어보기!",
    content: `
      <div>    
    <p>이번 문제는 사용자로부터 입력받은 정수가 홀수인지 짝수인지 구분하는 프로그램을 작성하는 것이었습니다. 자바스크립트를 사용하여 간단하게 해결할 수 있었고, 다음과 같은 배운 점이 있습니다.</p>

    <h3>배운 점:</h3>
    <ul>
        <li><strong>조건문 사용하기</strong>: 문제를 해결하기 위해 <code>if</code> 문을 사용했습니다. 주어진 숫자가 2로 나누어 떨어지는지 확인하여 짝수와 홀수를 구분했습니다. 이 과정에서 조건문이 어떻게 작동하는지에 대한 이해를 깊이 있게 할 수 있었습니다.</li>
        <li><strong>모듈러 연산자</strong>: <code>num % 2</code>를 사용하여 나머지를 구하는 방법을 익혔습니다. 이 연산자는 주어진 숫자가 짝수인지 홀수인지 판단하는 데 매우 유용합니다. 짝수는 나머지가 0, 홀수는 나머리가 1이기 때문에 이 원리를 적용하여 프로그램을 구성했습니다.</li>
        <li><strong>함수의 재사용성</strong>: <code>checkOddEven</code>이라는 함수를 작성하여 코드의 재사용성을 높였습니다. 이 함수는 다양한 입력값에 대해 호출될 수 있으며, 프로그램의 모듈화에 기여했습니다.</li>
    </ul>

    <h3>함수:</h3><pre><code>function checkOddEven(num)</code></pre>

    <p><strong>함수 정의</strong>: <code>checkOddEven</code> 함수는 하나의 매개변수 <code>num</code>을 받습니다.</p>
    <p><strong>조건문</strong>: <code>if</code> 문을 사용하여 <code>num</code>이 2로 나누어 떨어지는지 확인합니다.</p>
    <ul>
        <li><strong>짝수</strong>: <code>num % 2 === 0</code>이 참인 경우 "짝수"를 반환합니다.</li>
        <li><strong>홀수</strong>: 그렇지 않으면 "홀수"를 반환합니다.</li>
    </ul>

    <h3>예제 실행:</h3>
    <p>입력값으로 5와 10을 넣었을 때의 결과는 다음과 같습니다.</p>
    <ul>
        <li>입력: <code>5</code> → 출력: "홀수"</li>
        <li>입력: <code>10</code> → 출력: "짝수"</li>
    </ul>

    <p>이러한 간단한 프로그램을 통해 자바스크립트의 기초적인 문법과 프로그래밍의 논리를 이해하는 데 큰 도움이 되었습니다. 앞으로도 다양한 문제를 통해 코딩 실력을 더욱 향상시키고 싶습니다!</p>
</div>
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
    difficulty: "1단계",
    codeId: 1000,
    language: "javascript",
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
    writtenCode: `function checkOddEven(num) {
      if (num % 2 === 0) {
        return "짝수";
      } else {
        return "홀수";
      }
    }`,
  },
  {
    codePostId: 200,
    postId: 2,
    difficulty: "3단계",
    codeId: 2000,
    language: "python",
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
    writtenCode: `def find_max(arr): return max(arr)`,
  },
  {
    codePostId: 300,
    postId: 3,
    difficulty: "2단계",
    codeId: 3000,
    language: "javascript",
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
    writtenCode: `function binarySearch(arr, target) {
      let left = 0, right = arr.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
      }
      return -1;
    }`,
  },
  {
    codePostId: 400,
    postId: 4,
    difficulty: "4단계",
    codeId: 4000,
    language: "java",
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
    writtenCode: `public class BinarySearch {

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
  }`,
  },
  {
    codePostId: 500,
    postId: 5,
    difficulty: "5단계",
    codeId: 5000,
    language: "cpp",
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
    writtenCode: `#include <iostream>
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
    }`,
  },
];

export const Comment_Data: CommentForm[] = [
  {
    replyId: 1,
    postId: 1,
    userId: 3,
    mentionId: null,
    parentReplyId: null,
    content: "첫 번째 게시물에 대한 첫 번째 댓글입니다.",
    createdAt: "2024-10-19 14:32:00",
    modifiedAt: "2024-10-19 14:32:00",
  },
  {
    replyId: 2,
    postId: 1,
    userId: 1,
    mentionId: null,
    parentReplyId: null,
    content: "정말 좋은 글이에요! 잘 읽었습니다.",
    createdAt: "2024-10-19 15:10:00",
    modifiedAt: "2024-10-19 15:12:00",
  },
  {
    replyId: 3,
    postId: 1,
    userId: 4,
    mentionId: null,
    parentReplyId: null,
    content: "이 주제에 대해 궁금한 점이 있어요.",
    createdAt: "2024-10-19 15:45:00",
    modifiedAt: "2024-10-19 15:45:00",
  },
  {
    replyId: 4,
    postId: 1,
    userId: 2,
    mentionId: 1,
    parentReplyId: 1,
    content: "유익한 내용을 공유해주셔서 감사합니다.",
    createdAt: "2024-10-19 16:00:00",
    modifiedAt: "2024-10-19 16:00:00",
  },
  {
    replyId: 5,
    postId: 1,
    userId: 4,
    mentionId: 1,
    parentReplyId: 1,
    content: "첫 번째 댓글에 동의합니다! 정말 좋은 의견이에요.",
    createdAt: "2024-10-19 16:30:00",
    modifiedAt: "2024-10-19 16:30:00",
  },
  {
    replyId: 6,
    postId: 2,
    userId: 3,
    mentionId: null,
    parentReplyId: null,
    content: "이 글에서 많은 도움을 받았어요. 감사합니다!",
    createdAt: "2024-10-19 17:00:00",
    modifiedAt: "2024-10-19 17:00:00",
  },
  {
    replyId: 7,
    postId: 3,
    userId: 1,
    mentionId: null,
    parentReplyId: null,
    content: "이 주제에 대한 추가 정보가 필요해요.",
    createdAt: "2024-10-19 17:30:00",
    modifiedAt: "2024-10-19 17:30:00",
  },
  {
    replyId: 8,
    postId: 4,
    userId: 2,
    mentionId: null,
    parentReplyId: null,
    content: "정말 잘 쓰신 글이에요! 덕분에 많은 것을 배웠습니다.",
    createdAt: "2024-10-19 18:00:00",
    modifiedAt: "2024-10-19 18:00:00",
  },
  {
    replyId: 9,
    postId: 1,
    userId: 1,
    mentionId: 2,
    parentReplyId: 2,
    content: "이 부분은 좀 더 설명이 필요할 것 같아요.",
    createdAt: "2024-10-19 18:30:00",
    modifiedAt: "2024-10-19 18:30:00",
  },
  {
    replyId: 10,
    postId: 3,
    userId: 4,
    mentionId: null,
    parentReplyId: null,
    content: "이 글을 통해 많은 것을 생각하게 되었어요.",
    createdAt: "2024-10-19 19:00:00",
    modifiedAt: "2024-10-19 19:00:00",
  },
];
