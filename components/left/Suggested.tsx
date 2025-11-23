
import Image from "next/image";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";

const people = [
    {
        name: "Steve Jobs",
        role: "CEO of Apple",
        img: "/people1.png",
    },
    {
        name: "Ryan Roslansky",
        role: "CEO of Linkedin",
        img: "/people2.png",
    },
    {
        name: "Dylan Field",
        role: "CEO of Figma",
        img: "/people3.png",
    },
];

export default function SuggestedPeople() {
    return (
        <div className="w-full bg-white rounded-xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Suggested People</h2>
                <button className="text-primary text-sm font-medium hover:underline">
                    See All
                </button>
            </div>

            <div className="space-y-4">
                {people.map((person, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src={person.img}
                                alt={person.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{person.name}</h3>
                                <p className="text-sm text-gray-500">{person.role}</p>
                            </div>
                        </div>

                        <Button variant="outline" className="text-gray-500">
                            <UserPlus size={16} />
                            Connect
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
