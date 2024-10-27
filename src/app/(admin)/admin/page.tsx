"use client";

import { LogoIcon } from "@/app/_components/Icons";
import AdminSignInFormContainer from "../_components/AdminSignInFormContainer";

export default function AdminHomePage() {
  return (
    <div className="top-container">
      <div className="relative max-w-400 min-h-screen flex justify-center items-center">
        <div className="absolute top-20">
          <LogoIcon />
        </div>
        <AdminSignInFormContainer />
      </div>
    </div>
  );
}
