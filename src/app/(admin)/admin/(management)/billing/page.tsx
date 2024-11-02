export default function BillingPage() {
  const dummy = [
    { type: "카카오 클라우드 요금", bill: 10000, unit: "원" },
    { type: "ChatGPT Token", bill: 100, unit: "Token" },
  ];
  return (
    <div className="flex flex-col gap-8 pt-2">
      {dummy.map((el, index) => (
        <div key={index} className="edit-container">
          <span className="edit-title">{el.type} 사용량</span>
          <span className="text-sm text-black">
            {el.bill.toLocaleString()} {el.unit}
          </span>
        </div>
      ))}
    </div>
  );
}
