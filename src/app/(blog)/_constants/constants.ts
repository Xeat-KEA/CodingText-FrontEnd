import { Category, Selection } from "@/app/_interfaces/interfaces";

export const REPORT_REASONS: Selection[] = [
  { content: "스팸 및 광고", selection: "spam" },
  { content: "부적절한 내용", selection: "inappropriate" },
  { content: "개인 정보 침해", selection: "privacy" },
  { content: "허위 사실 유포", selection: "false-info" },
  { content: "직접 입력", selection: "" },
];
