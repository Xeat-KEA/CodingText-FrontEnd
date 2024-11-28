import DOMPurify from "isomorphic-dompurify";
import { SmShowMoreIcon } from "../Icons";
import { useEffect, useState } from "react";
import { PostProps } from "../../_interfaces/interfaces"; // 게시물 내용 받기
import { useBase64 } from "@/app/_hooks/useBase64";
import { Code_Post_Dummy_Data } from "@/app/(admin)/_constants/constants";
import CodeEditor from "@/app/(coding-test)/_components/CodeEditor";
import { useCodingTestStore, usePostStore } from "@/app/stores";

  export default function PostContent(){
  const {isCodingPost, currentPost} = usePostStore();
  const { setLanguage, setValue } = useCodingTestStore();

  useEffect(() => {
    setLanguage({ content: "json", selection: "json" });
    setValue(currentPost.writtenCode || "");
  }, []);

  // 코딩 게시글 디코딩
  // const codeContentDe =
  //   currentPost.codeContent && useBase64("decode", currentPost.codeContent);
  // const writtenCodeDe =
  //   currentPost.writtenCode && useBase64("decode", currentPost.writtenCode);

  const contentDe = useBase64("decode", currentPost.content);
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
      {isVisible && children}
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
            <div className="w-full text-black border border-border2 rounded-xl mb-6 p-4">
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(currentPost.codeContent)),
                }}
              />
            </div>
          )}
          {renderToggleSection(
            "코드",
            visibleSections.writtenCode,
            "writtenCode",
            <div className="w-full mb-6">
              <div className="rounded-lg overflow-hidden">
                <CodeEditor defaultValue={currentPost.writtenCode} isViewer />
              </div>
            </div>
          )}
          {renderToggleSection(
            "본문",
            visibleSections.postContent,
            "postContent",
            <div className="w-full text-black border border-border2 rounded-xl p-4">
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
          <div className="w-full text-black border border-border2 rounded-xl mb-6 p-4">
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
};
