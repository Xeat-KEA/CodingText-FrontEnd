import DOMPurify from "isomorphic-dompurify";
import { PostProps } from "../../_interfaces/interfaces";
import { IsCoding_Data } from "../../_constants/constants";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { SmShowMoreIcon } from "../Icons";
import { useState } from "react";


const PostContent: React.FC<PostProps> = ({
    currentPost,
}) => {
    const isCodingPost = currentPost !== undefined && currentPost.categoryId === 1;
    const currentCodingPost = IsCoding_Data.find(post => post.postId === Number(currentPost?.postId));
    const postContent = currentPost?.content || "<p>게시물이 존재하지 않습니다.</p>";

    const [visibleSections, setVisibleSections] = useState({
        codeContent: false,
        writtenCode: false,
        postContent: true
    });

    const toggleVisibility = (section: keyof typeof visibleSections) => {
        setVisibleSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const renderToggleSection = (label: string, isVisible: boolean, toggleKey: keyof typeof visibleSections, children: React.ReactNode) => (
        <>
            <div className="flex items-center gap-2 mb-4 text-lg text-black cursor-pointer" onClick={() => toggleVisibility(toggleKey)}>
                <SmShowMoreIcon isHidden={isVisible} /> {label}
            </div>
            {isVisible && children}
        </>
    );

    const getLanguageExtension = () => {
        switch (currentCodingPost?.language) {
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
                    {/* 코딩 게시물 */}
                    {renderToggleSection("문제", visibleSections.codeContent, "codeContent", (
                        <div className="w-full text-black border border-border2 rounded-xl mb-6 p-4">
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(String(currentCodingPost?.codeContent))
                                }}
                            />
                        </div>
                    ))}

                    {renderToggleSection("코드", visibleSections.writtenCode, "writtenCode", (
                        <ReactCodeMirror
                            className="w-full mb-6"
                            value={currentCodingPost?.writtenCode}
                            theme={xcodeDark}
                            basicSetup={{ autocompletion: false }}
                            extensions={[getLanguageExtension()]}
                            editable={false}
                        />
                    ))}

                    {renderToggleSection("본문", visibleSections.postContent, "postContent", (
                        <div className="w-full text-black border border-border2 rounded-xl p-4">
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(String(postContent))
                                }}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {/* 일반 게시물 */}
                    <div className="w-full text-black border border-border2 rounded-xl mb-6 p-4">
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={
                                {
                                    __html: DOMPurify.sanitize(String(postContent))
                                }
                            }
                        />
                    </div >
                </>
            )}
        </div>
    )
}
export default PostContent;