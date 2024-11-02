import DOMPurify from "isomorphic-dompurify";
import { SmShowMoreIcon } from "../Icons";
import { useState } from "react";
import { PostProps } from "../../_interfaces/interfaces"; // 게시물 내용 받기

import { useBase64 } from "@/app/_hooks/useBase64";
import { Code_Post_Dummy_Data } from "@/app/(admin)/_constants/constants";

const PostContent: React.FC<PostProps> = ({ currentPost }) => {
  const isCodingPost = currentPost !== undefined && currentPost.categoryId === 1;
  // 더미데이터 삭제 필요
  const currentCodingPost = Code_Post_Dummy_Data.find(post => post.postId === Number(currentPost?.postId));
  // 코딩 게시글일 경우 추가 게시글 정보 받아와서 디코딩
  const codeContentDe = currentCodingPost && useBase64("decode", currentCodingPost.codeContent);
  const writtenCodeDe = currentCodingPost && useBase64("decode", currentCodingPost.writtenCode);
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
        onClick={() => toggleVisibility(toggleKey)}
      >
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
                <pre className="rounded-xl overflow-hidden w-full">
                  <code className="text-black">{writtenCodeDe}</code>
                </pre>
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
