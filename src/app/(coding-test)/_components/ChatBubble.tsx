import DOMPurify from "isomorphic-dompurify";
import { Chat, NewChat } from "../_interface/interfaces";

export default function ChatBubble({ role, content }: NewChat) {
  return (
    <div
      className={`bubble ${
        role === "gpt"
          ? "bg-white"
          : "bg-primary-1 font-bold self-end !text-white whitespace-pre-wrap"
      }`}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  );
}
