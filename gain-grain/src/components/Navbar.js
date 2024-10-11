"use client";

import Link from "next/link";
import { Bars3Icon } from '@heroicons/react/24/outline'
import styles from './navbar.module.css'
import { useState } from "react";

export default function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false)

    // functionality to make hamburger menu appear
    function toggleHamburgerDropdown(){
        setShowDropdown(!showDropdown)
    }

    return (
        // orange bar
        <nav className={styles.bigBar}>
            {/* gain & grain logo top left */}
            <div className="flex flex-col justify-center items-center">
                <div className={styles.logo}></div>
            </div>
            {/* search bar */}
            <div className="flex-grow w-full flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchBar}
                />
            </div>
            {/* hamburger options menu */}
            <div className={styles.hamburgerDropdown} onClick={toggleHamburgerDropdown}>
                <Bars3Icon className="size-7 text-white"/>
                {/* make the dropdown appear if it has been clicked */}
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
                    // if menu has not been clicked, show nothing
                    :<></>
                } 

            </div>
        </nav>
    );
}
