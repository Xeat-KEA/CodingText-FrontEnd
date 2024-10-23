import DOMPurify from "isomorphic-dompurify";
import { SmShowMoreIcon } from "../Icons";
import { useState } from "react";
import { PostProps } from "../../_interfaces/interfaces"; // 게시물 내용 받기
import ReactCodeMirror from "@uiw/react-codemirror";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";

import { javascript } from "@codemirror/lang-javascript"; // 언어 구분 -> 다른 방식 가능하면 수정
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

import { useBase64 } from "@/app/_hooks/useBase64";

const PostContent: React.FC<PostProps> = ({ currentPost }) => {
  const isCodingPost = currentPost !== undefined && currentPost.categoryId === 1;
  const codeContentDe = useBase64("decode", currentPost.codeContent || "");
  const writtenCodeDe = useBase64("decode", currentPost.writtenCode || "");
  const contentDe = useBase64("decode", currentPost.content || "");

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
        onClick={() => toggleVisibility(toggleKey)}
      >
        <SmShowMoreIcon isHidden={!isVisible} /> {label}
      </div>
      {isVisible && children}
    </>
  );

  const getLanguageExtension = () => {
    switch (currentPost?.language) {
      case "javascript":
        return javascript();
      case "java":
        return java();
      case "cpp":
        return cpp();
      case "python":
        return python();
      default:
        return javascript();
    }
  };

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
                  __html: DOMPurify.sanitize(
                    String(codeContentDe)
                  ),
                }}
              />
            </div>
          )}
          {renderToggleSection(
            "코드",
            visibleSections.writtenCode,
            "writtenCode",
            <div className="w-full mb-6">
              <div className="rounded-xl overflow-hidden">
                <ReactCodeMirror
                  className="w-full"
                  value={writtenCodeDe}
                  theme={xcodeDark}
                  basicSetup={{ autocompletion: false }}
                  extensions={[getLanguageExtension()]}
                  editable={false}
                />
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
export default PostContent;
