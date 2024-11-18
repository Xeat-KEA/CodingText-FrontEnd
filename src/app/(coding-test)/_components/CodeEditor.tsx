import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { CodeEditorProps } from "@/app/_interfaces/interfaces";
import { useCodingTestStore } from "@/app/stores";
import { Extension } from "@uiw/react-codemirror";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// 초기 페이지 로딩 속도 향상을 위해 CodeMirror Dynamic Import
const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});

export default function CodeEditor({
  isViewer,
  defaultValue,
}: CodeEditorProps) {
  const { value, setValue, language } = useCodingTestStore();
  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, []);

  // 언어 설정 및 테마 설정을 위한 state 선언
  const [lang, setLang] = useState<any>();
  const [theme, setTheme] = useState<Extension>();
  const [editorExtensions, setEditorExtensions] = useState<any[]>([]);

  useEffect(() => {
    async function loadExtensions() {
      // 초기 페이지 로딩 속도 향상을 위해 CodeMirror 관련 extension Dynamic Import
      const { langs } = await import("@uiw/codemirror-extensions-langs");
      const { xcodeDark } = await import("@uiw/codemirror-theme-xcode");
      const { EditorView } = await import("@uiw/react-codemirror");

      // 언어 설정
      if (language?.selection === "java") {
        setLang(langs.java());
      } else if (language?.selection === "python") {
        setLang(langs.python());
      } else if (language?.selection === "js") {
        setLang(langs.javascript());
      } else if (language?.selection === "c++") {
        setLang(langs.cpp());
      } else if (language?.selection === "json") {
        setLang(langs.json());
      }

      setTheme(xcodeDark);

      // EditorView 확장을 배열로 설정
      setEditorExtensions([
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
      ]);
    }

    loadExtensions();
  }, [language]);

  if (!lang || !theme || editorExtensions.length === 0) {
    return (
      <div className="w-full h-full flex-center">
        <LoadingSpinner />
      </div>
    ); // 확장이 로드될 때까지 로딩 상태를 표시
  }

  return (
    <ReactCodeMirror
      className="w-full"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
      basicSetup={{ autocompletion: false }}
      theme={theme}
      editable={!isViewer}
      extensions={[...editorExtensions, lang]}
    />
  );
}
