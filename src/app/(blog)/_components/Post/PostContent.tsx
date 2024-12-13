import DOMPurify from "isomorphic-dompurify";
import { SmShowMoreIcon } from "../Icons";
import { useEffect, useState } from "react";
import { useBase64 } from "@/app/_hooks/useBase64";
import CodeEditor from "@/app/(coding-test)/_components/CodeEditor";
import { useCodingTestStore, usePostStore } from "@/app/stores";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PostContent() {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");

  const { isCodingPost, currentPost, reportPostId, reportReplyId } =
    usePostStore();
  const { setLanguage, setValue } = useCodingTestStore();

  useEffect(() => {
    setLanguage({ content: "json", selection: "json" });
    setValue(currentPost.writtenCode || "");
  }, []);

  // 코딩 게시글 디코딩
  // const codeContentDe =
  //   currentPost.codeContent && useBase64("decode", currentPost.codeContent);
  const writtenCodeDe =
    currentPost.writtenCode && useBase64("decode", currentPost.writtenCode);

  const contentDe = useBase64("decode", currentPost.content);
  const codeContent = currentPost.codeTitle
    ? `문제: ${currentPost.codeTitle}<br/>${currentPost.codeContent}`
    : currentPost.codeContent;

  const [visibleSections, setVisibleSections] = useState({
    codeContent: false,
    writtenCode: false,
    postContent: true,
  });

  const toggleVisibility = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderToggleSection = (
    label: string,
    isVisible: boolean,
    toggleKey: keyof typeof visibleSections,
    children: React.ReactNode
  ) => (
    <>
      <div
        className="flex items-center gap-2 mb-4 text-lg text-black cursor-pointer"
        onClick={() => toggleVisibility(toggleKey)}>
        <SmShowMoreIcon isHidden={!isVisible} /> {label}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {isVisible && (
          <motion.div
            key={toggleKey}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>{" "}
    </>
  );

  return (
    <div>
      {isCodingPost ? (
        <>
          {/* 코딩 게시글 */}
          {renderToggleSection(
            "문제",
            visibleSections.codeContent,
            "codeContent",
            <div className="w-full h-60 text-black border border-border-2 rounded-2xl mb-6 p-4 overflow-y-auto">
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(codeContent)),
                }}
              />
            </div>
          )}
          {renderToggleSection(
            "코드",
            visibleSections.writtenCode,
            "writtenCode",
            <div className="w-full mb-6">
              <div className="flex h-80 shrink-0 rounded-2xl overflow-hidden">
                <CodeEditor defaultValue={writtenCodeDe} isViewer />
              </div>
            </div>
          )}
          {renderToggleSection(
            "본문",
            visibleSections.postContent,
            "postContent",
            <div
              className={`w-full h-80 text-black rounded-2xl p-4 overflow-y-auto ${
                isAdminPage &&
                reportReplyId === -1 &&
                reportPostId === currentPost.articleId
                  ? "bg-red bg-opacity-20"
                  : "border border-border-2"
              } `}>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(contentDe)),
                }}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {/* 일반 게시글 */}
          <div
            className={`w-full min-h-80 text-black rounded-xl p-4 overflow-y-auto ${
              isAdminPage &&
              reportReplyId === -1 &&
              reportPostId === currentPost.articleId
                ? "bg-red bg-opacity-20"
                : "border border-border-2"
            }`}>
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(contentDe)),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
