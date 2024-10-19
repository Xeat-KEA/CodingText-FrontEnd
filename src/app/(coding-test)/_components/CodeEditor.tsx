import { ICodeEditor } from "@/app/_interfaces/interfaces";
import { useCodingTestStore } from "@/app/stores";
import { langs } from "@uiw/codemirror-extensions-langs";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";

export default function CodeEditor({ isViewer, defaultValue }: ICodeEditor) {
  const { value, setValue, language } = useCodingTestStore();
  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, []);

  // 언어 설정
  const [lang, setLang] = useState<any>();
  useEffect(() => {
    if (language === "java") {
      setLang(langs.java());
    } else if (language === "python") {
      setLang(langs.python());
    } else if (language === "javascript") {
      setLang(langs.javascript());
    } else if (language === "c") {
      setLang(langs.cpp());
    }
  }, [language]);

  return (
    <ReactCodeMirror
      className="w-full"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
      basicSetup={{ autocompletion: false }}
      theme={xcodeDark}
      editable={!isViewer}
      extensions={[
        EditorView.theme({
          // 코드 에디터 높이 100%
          "&": {
            height: "100%",
          },
          // 코드 에디터 focus 시 outline 제거
          "&.cm-focused": {
            outline: "none",
          },
        }),
        EditorView.lineWrapping,
        lang,
      ]}
    />
  );
}
