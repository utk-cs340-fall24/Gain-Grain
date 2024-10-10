// Feed.js
import { useState } from "react";

export default function Feed({ toggleComments, visibleComments }) {
    return (
        <div className="flex justify-center mt-8 w-full">
            <div className="flex flex-col items-center max-w-2xl w-full">
                {[1, 2].map((postId) => (
                    <div key={postId} className="relative post bg-white border border-gray-300 mb-5 rounded-lg w-full">
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
        </div>
    );
}
