// navbar.js
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
        <nav className={styles.bigBar}>
            {/* gain & grain logo top left */}
            <div>
                <img
                    className={styles.logo} 
                    height={50} 
                    width={150}
                    onClick={() => window.location.href = '/'}
                ></img>
            </div>
            {/* search bar */}
            <div className={styles.centerContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchBar}
                />
            </div>
            <div className={styles.buttonContainer}>
                {/* calendar button */}
                <Link href="/dashboard/calendar">
                    <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
                        Calendar
                    </button>
                </Link>
                {/* post button */}
                <Link href="/post">
                    <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
                        Post
                    </button>
                </Link>
            </div>
            {/* hamburger options menu */}
            <div className={styles.hamburgerButton} onClick={toggleHamburgerDropdown}>
                <Bars3Icon className="size-7 text-white rounded-lg hover:bg-orange-600"/>
                {showDropdown ?
                    <div className={styles.hamburgerMenu}>
                        <div className="flex flex-col space-y-1 my-1">
                            <Link href="/login">
                                {/* combined login/register button */}
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
                                    Login/Register
                                </button>
                            </Link>
                            <Link href="/profile">
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
                                    Profile
                                </button>
                            </Link>
                            <Link href="/dashboard/savedMeals">
                                {/* nutrition button */}
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
                                    Nutrition
                                </button>
                            </Link>
                            
                            <Link href="/dashboard/savedWorkouts">
                                {/* exercise button*/}
                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">
                                    Exercise
                                </button>
                            </Link>
                        </div>
                    </div>
                    // if not clicked, render nothing
                    :<></>
                }
            </div>
        </nav>
    );
}
