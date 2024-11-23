import DOMPurify from "isomorphic-dompurify";
import { Chat } from "../_interface/interfaces";

export default function ChatBubble({ role, content }: Chat) {
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
