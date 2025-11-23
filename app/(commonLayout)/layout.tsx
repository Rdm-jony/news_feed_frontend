import LeftSidebar from "@/components/left/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <div className="max-w-6xl mx-auto flex justify-between">
                    <LeftSidebar />
                    <div className="w-2/3">
                        {children}
                    </div>
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
};

export default FeedLayout;