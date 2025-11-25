import LeftSidebar from "@/components/left/LeftSidebar";
import RightSidebar from "@/components/right/RightSidebar";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen overflow-hidden">

            <div className="fixed top-0 left-0 right-0 z-50 shadow">
                <Navbar />
            </div>

            <div className="pt-16 h-full bg-gray-100 dark:bg-black">
                <div className="lg:max-w-6xl mx-auto flex  h-full mt-5">

                    <aside className="w-1/5 overflow-y-auto hide-scrollbar lg:block hidden">
                        <LeftSidebar />
                    </aside>

                    <main className="lg:w-3/5 overflow-y-auto max-w-xl mx-auto  hide-scrollbar">
                        {children}
                    </main>

                    <aside className="w-1/5 overflow-y-auto hide-scrollbar lg:block hidden">
                        <RightSidebar />
                    </aside>
                    

                </div>
            </div>
        </div>
    );
};

export default FeedLayout;
