import SideBar from "../../_components/SideBar";

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <SideBar/>
            <div className="">
                {children}
            </div>
        </div>
    );
}