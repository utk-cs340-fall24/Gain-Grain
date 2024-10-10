"use client";

import Link from "next/link";
import { Bars3Icon } from '@heroicons/react/24/outline'
import styles from './navbar.module.css'
import { useState } from "react";

export default function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false)

    function toggleHamburgerDropdown(){
        setShowDropdown(!showDropdown)
    }

    return (
        <nav className="flex w-full items-center justify-between h-16 bg-orange-500 p-4 rounded-lg">
            <h1 className="text-white text-xl md:text-3xl font-bold">Gain & Grain</h1>
            {/* Search bar */}
            <div className="flex-grow flex justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="transition-width duration-500 ease-in-out h-10 px-2 rounded-lg w-96"
                />
            </div>

            <div className={styles.hamburgerDropdown} onClick={toggleHamburgerDropdown}>
                <Bars3Icon className="size-7 text-white"/>

                {showDropdown ?
                    <div className={styles.hamburgerMenu}>
                        <div className="flex flex-col space-y-1 my-1">
                            <Link href="/dashboard/calendar">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    Calendar
                                </button>
                            </Link>
                            <Link href="/dashboard/savedMeals">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg box-shadow:0 hover:bg-orange-500 hover:text-white transition-all">
                                    Nutrition
                                </button>
                            </Link>
                            <Link href="/dashboard/savedWorkouts">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    Exercise
                                </button>
                            </Link>
                            <Link href="/login">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    Register
                                </button>
                            </Link>
                            <Link href="/post">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    Post
                                </button>
                            </Link>
                            <Link href="/profile">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                    :<></>
                } 

            </div>
        </nav>
    );
}
