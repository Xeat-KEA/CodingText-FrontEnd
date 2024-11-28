import SideBar from "../../_components/SideBar";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideBar />
      <div>{children}</div>
    </div>
  );
}
