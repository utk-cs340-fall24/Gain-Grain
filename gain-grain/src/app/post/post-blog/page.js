'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlogPost = () => {
    const [postContent, setPostContent] = useState('');

    const handleChange = (value) => {
        setPostContent(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g., send the postContent to the server
        console.log('Blog post content:', postContent);
        // Reset the editor after submission
        setPostContent('');
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create a Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <ReactQuill
                    value={postContent}
                    onChange={handleChange}
                    placeholder="Write your blog post here..."
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'image'],
                            ['clean']                                         // remove formatting button
                        ],
                    }}
                    formats={[
                        'header', 'bold', 'italic', 'underline', 'strike',
                        'list', 'bullet', 'link', 'image',
                    ]}
                    className="mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default CreateBlogPost;
