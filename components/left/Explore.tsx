
import {
    BookOpen,
    UserPlus,
    Bookmark,
    Users,
    Gamepad2,
    Settings,
    Save,
    Lightbulb,
} from "lucide-react";

const menuItems = [
    { label: "Learning", icon: BookOpen },
    { label: "New", icon: Lightbulb },
    { label: "Insights", icon: Lightbulb },
    { label: "Find Friends", icon: UserPlus },
    { label: "Bookmarks", icon: Bookmark },
    { label: "Group", icon: Users },
    { label: "Gaming", icon: Gamepad2 },
    { label: "New", icon: Lightbulb },
    { label: "Settings", icon: Settings },
    { label: "Save Post", icon: Save },
];

export default function Explore() {
    return (
        <div className=" bg-white dark:bg-gray-900 shadow-md rounded-xl p-3 space-y-1">
            <p className="font-semibold px-3 py-3">Explore</p>
            {menuItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div
                        key={idx}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <Icon size={20} className="text-gray-600" />
                        <span className="text-gray-700 font-medium">{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
