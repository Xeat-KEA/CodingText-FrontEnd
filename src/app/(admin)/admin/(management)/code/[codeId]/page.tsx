"use client";

import ManageCode from "@/app/(admin)/_components/ManageCode";
import { useParams } from "next/navigation";

export default function EditCodePage() {
  const { codeId } = useParams();
  return <ManageCode codeId={Number(codeId)} />;
}
