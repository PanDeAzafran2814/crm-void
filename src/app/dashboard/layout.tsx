import type { Metadata } from "next";
import SideBar from "../ui/SideBar";
import TopBar from "../ui/Topbar";
import { createClient } from "../../app/utils/server";
import { redirect } from "next/navigation";
import Footer from "../ui/footer";

export const metadata: Metadata = {
  title: "VOID Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser();
    if(error || !data?.user){
    redirect("/");
    }

  return (
    <div className="w-full h-screen flex">
        <div className="w-[15%] h-full">
            <SideBar/>
        </div>
        <div className="w-[85%] h-full">
            <div className="w-full h-[10%]">
                <TopBar/>
            </div>
            <div className="w-full h-[86%]">
                {children}
            </div>
            <div className="w-full h-[4%]">
                <Footer/>
            </div>
        </div>
    </div>
  );
}
