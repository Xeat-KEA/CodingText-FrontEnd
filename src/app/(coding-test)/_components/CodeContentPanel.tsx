export default function CodeContentPanel({ content }: { content: string }) {
  return (
    <div className="max-md:h-[400px] w-full h-full flex flex-col gap-6 overflow-y-auto bg-white border-b border-border-2 relative">
      <div
        className="prose absolute top-0 left-0 w-full px-6 py-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
