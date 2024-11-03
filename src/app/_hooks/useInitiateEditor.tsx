import { useCodingTestStore, useTiptapStore } from "../stores";

export const useInitiateEditor = () => {
  const { setContent } = useTiptapStore();
  const { setValue } = useCodingTestStore();

  const initiateEditor = (
    type: "text" | "code" | "both",
    defaultValue?: string
  ) => {
    if (type === "text") {
      setContent(defaultValue || "");
    } else if (type === "code") {
      setValue(defaultValue || "");
    } else if (type === "both") {
      setContent("");
      setValue("");
    }
  };

  return initiateEditor;
};
