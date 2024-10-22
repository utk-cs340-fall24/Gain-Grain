import { NextResponse } from 'next/server';
import { createBlogPost, getBlogPosts } from '../../../utils/userBlogs';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, content } = body;

        const result = await createBlogPost(userId, content);
        return NextResponse.json({ message: 'Blog post added!', result });
    } catch (error) {
        console.error('Error when adding blog post:', error);
        return NextResponse.json({ success: false, message: 'Failed to save blog post' }, { status: 500 });
    }
}

