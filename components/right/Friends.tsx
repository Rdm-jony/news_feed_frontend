"use client";

import Image from "next/image";

const friendsData = [
    {
        name: "Steve Jobs",
        role: "CEO of Apple",
        time: "5 minutes ago",
        img: "/Avatar.png",
    },
    {
        name: "Ryan Roslansky",
        role: "CEO of Linkedin",
        time: null,
        img: "/Avatar.png",
    },
    {
        name: "Dylan Field",
        role: "CEO of Figma",
        time: null,
        img: "/Avatar.png",
    },
    {
        name: "Steve Jobs",
        role: "CEO of Apple",
        time: "5 minutes ago",
        img: "/Avatar.png",
    },
    {
        name: "Ryan Roslansky",
        role: "CEO of Linkedin",
        time: null,
        img: "/Avatar.png",
    },
    {
        name: "Dylan Field",
        role: "CEO of Figma",
        time: null,
        img: "/Avatar.png",
    },
];

export default function Friends() {
    return (
        <div className="w-full bg-white rounded-xl shadow-sm p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Your Friends</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                    See All
                </button>
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search friends..."
                className="w-full mb-4 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Friends List */}
            <div className="flex flex-col gap-4">
                {friendsData.map((user, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        {/* Profile Row */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                    src={user.img}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">
                                    {user.name}
                                </h4>
                                <p className="text-xs text-gray-500">{user.role}</p>

                                {user.time && (
                                    <p className="text-xs text-gray-400 mt-1">{user.time}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
