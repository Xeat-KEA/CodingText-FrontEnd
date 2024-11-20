export default function CompileError({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex gap-4 items-center">
        <span className="text-black text-sm font-semibold">컴파일 에러</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="prose bg-bg-1 p-2 rounded-lg">
          <code className="!bg-transparent !text-red">{content}</code>
        </div>
      </div>
    </div>
  );
}
