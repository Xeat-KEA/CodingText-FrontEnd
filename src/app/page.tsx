"use client";

import ReactCodeMirror from "@uiw/react-codemirror";
import TopBar from "./_components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar isLoggedIn hasNewNotice />
    </>
  );
}
