// Home.js
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar"; // Adjust the path based on your file structure
import Feed from "../components/Feed";
import Comments from "../components/Comments";

export default function Home() {
    const [visibleComments, setVisibleComments] = useState({});

    const toggleComments = (postId) => {
        setVisibleComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    return (
      <div>
        <main className="flex min-h-screen flex-col p-6 bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Feed Section */}
            <Feed toggleComments={toggleComments} visibleComments={visibleComments} />

            {/* Comments Section */}
            <Comments visibleComments={visibleComments} />
        </main>
      </div>  
    );
}
