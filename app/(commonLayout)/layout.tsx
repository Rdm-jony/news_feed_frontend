import Navbar from "@/components/shared/Navbar";
import React from "react";

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                {children}

            </div>
        </>
    );
};

export default FeedLayout;