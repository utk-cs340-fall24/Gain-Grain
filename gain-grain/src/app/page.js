"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import Comments from "../components/Comments";

export default function Home() {
  // State for managing comments visibility
  const [visibleComments, setVisibleComments] = useState(false);

  const toggleComments = () => {
    setVisibleComments(!visibleComments);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-500 p-4 md:h-52">
        <h1 className="text-white text-xl">Welcome to the Gain & Grain Home Page:</h1>
        <Link href="/profile">
          <button>Profile</button>
        </Link>
      </div>
      <Link href="/dashboard">
        <button>Go to Dashboard</button>
      </Link>

      <ul className="navbar mt-6 flex space-x-4">
        <li>
          <Link href="/dashboard/calendar">
            <button>Calendar</button>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/Nutrition">
            <button>Nutrition</button>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/Exercise">
            <button>Exercise</button>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <button>Post</button>
          </Link>
        </li>
      </ul>

      {/* Main content */}
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Feed Section */}
        <Feed toggleComments={toggleComments} visibleComments={visibleComments} />

        {/* Comments Section */}
        <Comments visibleComments={visibleComments} />
      </div>
    </main>
  );
}
