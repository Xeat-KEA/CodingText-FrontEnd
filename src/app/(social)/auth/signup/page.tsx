"use client";

import api from "@/app/_api/config";
import { useEffect } from "react";

export default function AuthSignUpPage() {
  useEffect(() => {
    const response = api.get("/user-service/cookie-to-header", {
      withCredentials: true,
    });
    console.log(response);
  }, []);
  return <div></div>;
}
