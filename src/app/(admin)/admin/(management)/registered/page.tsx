"use client";

import RegisterTopBar from "@/app/(admin)/_components/RegisterTopBar";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useQuery } from "@tanstack/react-query";

export default function RegisterPage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const fetchPendingList = async () => {
    if (accessToken) {
      const response = await api.get(
        "/code-bank-service/admin/register/pendingLists",
        { headers: { Authorization: accessToken } }
      );
      console.log("hi");
      return response.data;
    } else {
      return null;
    }
  };
  const { data } = useQuery({
    queryKey: ["pendingList", isTokenSet],
    queryFn: fetchPendingList,
  });
  console.log(data);

  return (
    <div className="flex flex-col gap-6">
      {/* 건의된 코드 내역 */}
      <div className="flex flex-col">
        <RegisterTopBar />
        <div className="flex flex-col divide-y divide-border-2">
          {/* {dummy.map((el, index) => (
            <RegisterCard
              key={index}
              createdAt={el.createdAt}
              nickName={el.nickName}
              title={el.title}
              content={el.content}
              testcase={el.testcase}
            />
          ))} */}
        </div>
      </div>
      <Pagination />
    </div>
  );
}
