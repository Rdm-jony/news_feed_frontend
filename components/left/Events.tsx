
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";

const events = [
    {
        dateDay: "10",
        dateMonth: "Jul",
        title: "No more terrorism no more cry",
        going: "17 People Going",
        img: "/event1.png",
    },
    {
        dateDay: "10",
        dateMonth: "Jul",
        title: "No more terrorism no more cry",
        going: "17 People Going",
        img: "/event1.png",
    },
];

export default function Events() {
    return (
        <div className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    Events
                </h2>
                <button className="text-primary text-sm font-medium hover:underline">
                    See all
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {events.map((event, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition"
                    >
                        <div className="relative w-full h-40">
                            <Image
                                src={event.img}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />

                        </div>

                        <div className="p-3 text-center">
                            <div className="flex gap-3 items-center">
                                <div className="bg-green-500 text-white px-2 py-3 ">
                                    <p className="text-xl font-bold leading-none">{event.dateDay}</p>
                                    <p className="text-xl  uppercase leading-none">
                                        {event.dateMonth}
                                    </p>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                    {event.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-4 justify-center mt-3">
                                <p className="text-sm font-semibold text-gray-500 mb-2">{event.going}</p>
                                <Button variant="outline" className="border-primary text-primary ">
                                    Going
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
