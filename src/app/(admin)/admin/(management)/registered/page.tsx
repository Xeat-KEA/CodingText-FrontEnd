"use client";

import RegisterCard from "@/app/(admin)/_components/RegisterCard";
import RegisterTopBar from "@/app/(admin)/_components/RegisterTopBar";
import { RegisterCardProps } from "@/app/(admin)/_interfaces/interfaces";
import Pagination from "@/app/_components/Pagination";

export default function RegisterPage() {
  const dummy: RegisterCardProps[] = [
    {
      createdAt: "2024-10-31",
      nickName: "사용자1",
      title: "문제 제목 1",
      content: `<h3>문제 : 최단 거리 구하기</h3>
<p>두 노드 간의 최단 거리를 구하세요.</p>
<ul>
  <li><p>조건 1 : 노드는 0부터 N-1까지의 번호를 가집니다.</p></li>
  <li><p>조건 2 : 간선은 방향성이 없으며, 양방향으로 이동 가능합니다.</p></li>
  <li><p>조건 3 : 특정 노드에서 출발하여 다른 모든 노드로 가는 최단 거리를 구하세요.</p></li>
  <li><p>조건 4 : 간선은 가중치가 1입니다.</p></li>
</ul>`,
      testcase: JSON.stringify({ input: [1, 2], output: [3] }),
    },
    {
      createdAt: "2024-10-30",
      nickName: "사용자2",
      title: "문제 제목 2",
      content: "<p>문제 2</p>",
      testcase: JSON.stringify({ input: [1, 2], output: [3] }),
    },
    {
      createdAt: "2024-10-29",
      nickName: "사용자3",
      title: "문제 제목 3",
      content: "<p>문제 3</p>",
      testcase: JSON.stringify({ input: [1, 2], output: [3] }),
    },
    {
      createdAt: "2024-10-28",
      nickName: "사용자4",
      title: "문제 제목 4",
      content: "<p>문제 4</p>",
      testcase: JSON.stringify({ input: [1, 2], output: [3] }),
    },
    {
      createdAt: "2024-10-27",
      nickName: "사용자5",
      title: "문제 제목 5",
      content: "<p>문제 5</p>",
      testcase: JSON.stringify({ input: [1, 2], output: [3] }),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 건의된 코드 내역 */}
      <div className="flex flex-col">
        <RegisterTopBar />
        <div className="flex flex-col divide-y divide-border-2">
          {dummy.map((el, index) => (
            <RegisterCard
              key={index}
              createdAt={el.createdAt}
              nickName={el.nickName}
              title={el.title}
              content={el.content}
              testcase={el.testcase}
            />
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
}
