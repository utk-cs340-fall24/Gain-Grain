import { useState, useEffect } from 'react';

export default function Feed({ toggleComments, visibleComments }) {
  const [posts, setPosts] = useState([]); // To store posts fetched from the server

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.data); // Set the fetched posts into state
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex justify-center mt-8 w-full">
      <div className="flex flex-col items-center max-w-2xl w-full">
        {posts.map((post) => (
          <div key={post._id} className="relative post bg-white border border-gray-300 mb-5 rounded-lg w-full">
            <div className="post-header flex items-center p-3">
              <img src="https://via.placeholder.com/40" alt="User Profile" className="rounded-full mr-2" />
              <h3 className="text-lg">@{post.author}</h3>
            </div>
            <div className="post-content p-3">
              <h4 className="text-xl">{post.title}</h4>
              <p className="text-gray-700">{post.body}</p>
            </div>
            <div className="post-actions flex justify-around mb-3">
              <button className="hover:underline">Like</button>
              <button className="hover:underline" onClick={() => toggleComments(post._id)}>Comment</button>
              <button className="hover:underline">Share</button>
            </div>
            {visibleComments === post._id && <Comments comments={post.comments} />}
          </div>
        ))}
      </div>
    </div>
  );
}
