// 코딩 페이지 탭 전환 바
export const CODING_TAB_BAR_MENU = ["컴파일러", "메모장"];

// 코딩 페이지 하단 버튼 목록
export const CODING_BUTTONS = [
  { content: "글 쓰기", url: "/" },
  { content: "다른 사람 풀이 보기", url: "/" },
  { content: "코드 실행", url: "/" },
  { content: "코드 제출", url: "/" },
];

export const POSTING_TAB_BAR_MENU = ["코드 뷰어", "메모장"];

// 채팅 더미 데이터
export const DUMMY_CHATS = [
  {
    role: "gpt",
    content: `<h3>문제 : 최단 거리 구하기</h3>
<p>두 노드 간의 최단 거리를 구하세요.</p>
<ul>
  <li><p>조건 1 : 노드는 0부터 N-1까지의 번호를 가집니다.</p></li>
  <li><p>조건 2 : 간선은 방향성이 없으며, 양방향으로 이동 가능합니다.</p></li>
  <li><p>조건 3 : 특정 노드에서 출발하여 다른 모든 노드로 가는 최단 거리를 구하세요.</p></li>
  <li><p>조건 4 : 간선은 가중치가 1입니다.</p></li>
</ul>
<p>예시</p>
<pre><code>const graph = [
  [0, 1, 0, 0, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 1, 0, 0, 1],
  [1, 0, 1, 1, 0]
];
const startNode = 0;

console.log(shortestDistance(graph, startNode)); // [0, 1, 2, 2, 1]
</code></pre>
<p>힌트: BFS 알고리즘을 사용하세요.</p>`,
  },
];
