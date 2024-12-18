import AdminUserLayoutContainer from "@/app/(admin)/_components/AdminUserLayoutContainer";
import { Suspense } from "react";

export default function AdminUserManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AdminUserLayoutContainer>{children}</AdminUserLayoutContainer>
    </Suspense>
  );
}
