"use client";

import SmBackBtn from "../_components/SmBackBtn";
import { PRIVACY_POLICY } from "../_constants/constants";

export default function TermsPage() {
  return (
    <div className="flex flex-col grow py-16 gap-8 w-full">
      <div className="w-full flex justify-center relative">
        <span className="sign-in-title">{"개인정보\n처리 방침"}</span>
        <SmBackBtn />
      </div>
      <div className="relative grow overflow-y-auto border border-border-2 rounded-2xl">
        <span className="absolute text-black whitespace-pre-wrap px-4 py-3 text-xs">
          {PRIVACY_POLICY}
        </span>
      </div>
    </div>
  );
}
