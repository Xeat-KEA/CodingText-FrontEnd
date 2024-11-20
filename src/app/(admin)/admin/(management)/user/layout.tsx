import AdminUserLayoutContainer from "@/app/(admin)/_components/AdminUserLayoutContainer";

export default function AdminUserManagementLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <AdminUserLayoutContainer>{children}</AdminUserLayoutContainer>;
  }