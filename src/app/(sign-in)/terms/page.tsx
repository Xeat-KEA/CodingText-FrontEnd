"use client";

import PolicyContainer from "../_components/PolicyContainer";
import { TERMS } from "../_constants/constants";

export default function TermsPage() {
  return <PolicyContainer title="약관" content={TERMS} />;
}
