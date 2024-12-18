import AdminLayoutContainer from "../../_components/AdminLayoutContainer";

export default function AdminManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayoutContainer>{children}</AdminLayoutContainer>;
}
