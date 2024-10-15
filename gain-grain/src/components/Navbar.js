// navbar.js
"use client";

import Link from "next/link";
import { Bars3Icon } from '@heroicons/react/24/outline'
import styles from './navbar.module.css'
import { useState } from "react";


export default function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    function toggleHamburgerDropdown(){
        setShowDropdown(!showDropdown)
    }

    function toggleHamburgerDropdown() {
        if (showDropdown) {
        // Fade out
            setIsVisible(false);
            setTimeout(() => setShowDropdown(false), 200); 
        } 
        else {
            // Fade in
            setShowDropdown(true);            
            setTimeout(() => setIsVisible(true), 0); 
        }
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
                <Bars3Icon className="size-10 text-white rounded-lg hover:bg-orange-600 p-0.5"/>
                {showDropdown ?
                    <div className={`${styles.hamburgerMenu} transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-col space-y-1 my-1">
                            <Link href="/login" className="w-full flex justify-center">
                                {/* combined login/register button */}
                                <button className="w-[95%] bg-orange-500 text-white font- semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                                    Login/Register
                                </button>
                            </Link>
                            <Link href="/profile" className="w-full flex justify-center">
                                <button className="w-[95%] bg-orange-500 text-white font- semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                                    Profile
                                </button>
                            </Link>
                            <Link href="/dashboard/savedMeals" className="w-full flex justify-center">
                                {/* nutrition button */}
                                <button className="w-[95%] bg-orange-500 text-white font- semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                                    Nutrition
                                </button>
                            </Link>
                            
                            <Link href="/dashboard/savedWorkouts" className="w-full flex justify-center">
                                {/* exercise button*/}
                                <button className="w-[95%] bg-orange-500 text-white font- semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                                    Exercise
                                </button>
                            </Link>
                            <Link href="/dashboard/notifications" className="w-full flex justify-center">
                                {/* exercise button*/}
                                <button className="w-[95%] bg-orange-500 text-white font- semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                                    Notifications
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
