"use client";

import SmBackBtn from "../_components/SmBackBtn";
import { TERMS } from "../_constants/constants";

export default function TermsPage() {
  return (
    <div className="flex flex-col grow py-16 gap-8 w-full">
      <div className="w-full flex justify-center relative">
        <span className="sign-in-title">약관</span>
        <SmBackBtn />
      </div>
      <div className="relative grow overflow-y-scroll border border-border-2 rounded-2xl">
        <span className="absolute text-black whitespace-pre-wrap px-4 py-3 text-xs">
          {TERMS}
        </span>
      </div>
    </div>
  );
}
