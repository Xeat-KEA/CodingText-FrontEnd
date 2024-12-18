import { Suspense } from "react";
import AuthPageContainer from "../_components/AuthPageContainer";

export default function AuthSignUpPage() {
  return (
    <Suspense>
      <AuthPageContainer />
    </Suspense>
  );
}
