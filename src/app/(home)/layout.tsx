import TopBar from "../_components/TopBar/TopBar";
import Footer from "./_components/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
