import { ToolBarProps } from "@/app/_interfaces/interfaces";
import {
  BoldIcon,
  BulletListIcon,
  CodeBlockIcon,
  CodeIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  HorizontalRuleIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  OrderedListIcon,
  StrikeIcon,
} from "./icons";
import { useImageHandler } from "@/app/_hooks/useImageHandler";
import { useTokenStore } from "@/app/stores";
import { usePathname } from "next/navigation";

export default function ToolBar({ editor }: ToolBarProps) {
  const { accessToken, isTokenSet } = useTokenStore();
  const pathname = usePathname();

  const role = pathname.startsWith("/admin") ? "ADMIN" : "";

  if (!editor) {
    return null;
  }

  // Link 기능
  const handleLink = () => {
    // 이미 링크가 적용되었을 때
    if (editor.isActive("link") === true) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // URL 입력 취소
      if (url === null) {
        return;
      }

      // 빈 URL 입력
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink();
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  // Image 처리
  const handleImage = async (files: FileList | null) => {
    // 파일 업로드 취소
    if (files === null) {
      return;
    }

    // 이미지 업로드 및 주소 반환
    const IMG_URL = await useImageHandler(files, accessToken, role);

    // 반환받은 이미지 주소를 통해 editor에 이미지 삽입
    editor.commands.setImage({
      src: IMG_URL,
    });
  };

  return (
    <div className="border-b border-border-2 w-full h-[44px] shrink-0 overflow-x-auto overflow-y-hidden relative">
      <div className="absolute top-0 left-0 flex items-center gap-4 p-2">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`toolbar-btn ${editor.isActive("bold") && "is-active"}`}>
            <BoldIcon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`toolbar-btn ${
              editor.isActive("italic") && "is-active"
            }`}>
            <ItalicIcon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`toolbar-btn ${
              editor.isActive("strike") && "is-active"
            }`}>
            <StrikeIcon />
          </button>
        </div>
        <div className="w-[1px] h-[24px] bg-border-2" />
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCode().run();
            }}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`toolbar-btn ${editor.isActive("code") && "is-active"}`}>
            <CodeIcon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCodeBlock().run();
            }}
            className={`toolbar-btn ${
              editor.isActive("codeBlock") && "is-active"
            }`}>
            <CodeBlockIcon />
          </button>
        </div>
        <div className="w-[1px] h-[24px] bg-border-2" />
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={`toolbar-btn ${
              editor.isActive("heading", { level: 1 }) && "is-active"
            }`}>
            <H1Icon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={`toolbar-btn ${
              editor.isActive("heading", { level: 2 }) && "is-active"
            }`}>
            <H2Icon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={`toolbar-btn ${
              editor.isActive("heading", { level: 3 }) && "is-active"
            }`}>
            <H3Icon />
          </button>
        </div>
        <div className="w-[1px] h-[24px] bg-border-2" />
        <div className="flex gap-2">
          <button
            className={`toolbar-btn ${editor.isActive("link") && "is-active"}`}
            onClick={(e) => {
              e.preventDefault();
              handleLink();
            }}>
            <LinkIcon />
          </button>
          <input
            id="image"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              handleImage(e.target.files);
            }}
          />
          <label htmlFor="image" className="toolbar-btn">
            <ImageIcon />
          </label>
        </div>
        <div className="w-[1px] h-[24px] bg-border-2" />
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={`toolbar-btn ${
              editor.isActive("bulletList") && "is-active"
            }`}>
            <BulletListIcon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={`toolbar-btn ${
              editor.isActive("orderedList") && "is-active"
            }`}>
            <OrderedListIcon />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setHorizontalRule().run();
            }}
            className="toolbar-btn">
            <HorizontalRuleIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
