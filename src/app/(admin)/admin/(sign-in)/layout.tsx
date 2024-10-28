import { LogoIcon } from "@/app/_components/Icons";

export default function AdminSignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="top-container">
      <div className="relative max-w-400 min-h-screen flex justify-center items-center">
        <div className="absolute top-20">
          <LogoIcon />
        </div>
        {children}
      </div>
    </div>
  );
}
