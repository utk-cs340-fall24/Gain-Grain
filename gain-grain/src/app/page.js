"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import Comments from "../components/Comments";
import './homepage.css'

export default function Home() {
  // State for managing comments visibility
  const [visibleComments, setVisibleComments] = useState(false);

  const toggleComments = () => {
    setVisibleComments(!visibleComments);
  };

  return (
    <main className="homepage-main flex min-h-screen flex-col bg-gray-50">

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