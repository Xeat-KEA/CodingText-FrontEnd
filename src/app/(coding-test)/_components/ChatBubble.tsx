import DOMPurify from "isomorphic-dompurify";
import { NewChat } from "../_interface/interfaces";
import { WarningIcon } from "./Icons";

export default function ChatBubble({ role, content }: NewChat) {
  return (
    <div
      className={`${
        role === "warning"
          ? "warning-bubble"
          : `bubble ${
              role === "gpt"
                ? "bg-white"
                : "bg-primary-1 font-bold self-end !text-white whitespace-pre-wrap"
            }`
      }`}
    >
      {role === "warning" && <WarningIcon />}
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />
    </div>
  );
}
