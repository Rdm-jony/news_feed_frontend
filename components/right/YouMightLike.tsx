
import Image from "next/image";
import { UserPlus, X } from "lucide-react";
import { Button } from "../ui/button";

const suggestions = [
  {
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
    img: "/Avatar.png",
  }
];

export default function YouMightLike() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">You Might Like</h2>
        <button className="text-primary text-sm font-medium hover:underline">
          See All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {suggestions.map((user, idx) => (
          <div
            key={idx}
            className=" p-3 rounded-lg  transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={user.img}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white block">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 block">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button >
                <UserPlus size={12} />
                Follow
              </Button>

              <button className="flex items-center justify-center gap-1 text-xs bg-gray-200 text-gray-800 py-1 rounded-lg hover:bg-gray-300 transition">
                <X size={12} />
                Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
