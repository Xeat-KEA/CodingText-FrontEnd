"use client";

import PolicyContainer from "../_components/PolicyContainer";
import { PRIVACY_POLICY } from "../_constants/constants";

export default function PolicyPage() {
  return <PolicyContainer title="개인정보처리방침" content={PRIVACY_POLICY} />;
}
