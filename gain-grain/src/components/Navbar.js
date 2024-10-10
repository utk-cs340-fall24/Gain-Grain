"use client";

import Link from "next/link";

export default function Navbar() {

    return (
        <nav className="flex items-center justify-between h-16 bg-orange-500 p-4 rounded-lg">
            <h1 className="text-white text-xl md:text-3xl font-bold">Gain & Grain</h1>
            
            <div className="flex-grow flex justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="transition-width duration-500 ease-in-out h-10 px-2 rounded-lg w-96"
                />
            </div>

            <div className="hidden md:flex space-x-4 md:space-x-8">
                <Link href="/dashboard/calendar">
                    <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                        Calendar
                    </button>
                </Link>
                <Link href="/dashboard/savedMeals">
                    <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                        Nutrition
                    </button>
                </Link>
                <Link href="/dashboard/savedWorkouts">
                    <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                        Exercise
                    </button>
                </Link>
                <Link href="/login">
                    <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                        Login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                        Register
                    </button>
                </Link>
                <Link href="/post">
                    <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                        Post
                    </button>
                </Link>
                <Link href="/profile">
                    <button className="bg-white text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                        Profile
                    </button>
                </Link>
            </div>

                <div className="flex flex-col space-y-4 mt-4 md:hidden">
                    <Link href="/dashboard/calendar">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Calendar
                        </button>
                    </Link>
                    <Link href="/dashboard/savedMeals">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Nutrition
                        </button>
                    </Link>
                    <Link href="/dashboard/savedWorkouts">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Exercise
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Register
                        </button>
                    </Link>
                    <Link href="/post">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Post
                        </button>
                    </Link>
                    <Link href="/profile">
                        <button className="bg-white text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                            Profile
                        </button>
                    </Link>
                </div>
        </nav>
    );
}
