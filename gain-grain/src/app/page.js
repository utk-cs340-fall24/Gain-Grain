"use client";

import Link from "next/link";
import { useState } from "react";

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
            <nav className="flex items-center justify-between h-16 bg-orange-500 p-4 rounded-lg">
                <h1 className="text-white text-xl md:text-3xl font-bold">Gain & Grain</h1>
                
                {/* Search bar positioned in the center */}
                <div className="flex-grow flex justify-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="transition-width duration-500 ease-in-out h-10 px-2 rounded-lg w-96"
                    />
                </div>

                {/* Buttons positioned to the right */}
                <div className="flex space-x-4 md:space-x-8">
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

            {/* Feed Section */}
            <div className="flex justify-center mt-8 w-full">
                <div className="flex flex-col items-center max-w-2xl w-full">
                    {[1, 2].map((postId) => (
                        <div className="relative post bg-white border border-gray-300 mb-5 rounded-lg w-full">
                            <div className="post-header flex items-center p-3">
                                <img src="https://via.placeholder.com/40" alt="User Profile" className="rounded-full mr-2" />
                                <h3 className="text-lg">@user{postId}</h3>
                            </div>
                            <div className="post-image">
                                <img src="https://via.placeholder.com/600x400" alt="Post Image" className="w-full rounded-t-lg" />
                            </div>
                            <div className="post-content p-3">
                                <h4 className="text-xl">Post Title {postId}</h4>
                                <p className="text-gray-700">This is a description of post {postId}.</p>
                            </div>
                            <div className="post-actions flex justify-around mb-3">
                                <button className="hover:underline">Like</button>
                                <button className="hover:underline" onClick={() => toggleComments(postId)}>Comment</button>
                                <button className="hover:underline">Share</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comments Section */}
                <div className="comments-container flex flex-col ml-4">
                    {Object.keys(visibleComments).map((postId) =>
                        visibleComments[postId] ? (
                            <div className="comments-section bg-white p-3 rounded-lg mt-3 w-64">
                                <h4 className="font-bold">Comments</h4>
                                <div className="comment mb-2"><strong>@user456:</strong> Great post!</div>
                                <div className="comment"><strong>@fitguru:</strong> Really informative!</div>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </main>

      </div>  
    );
}
