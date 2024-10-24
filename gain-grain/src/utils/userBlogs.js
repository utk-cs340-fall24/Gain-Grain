import mongoose from 'mongoose';
import clientPromise from './mongodb';

const blogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

// Function to create a new blog post
export async function createBlogPost(userId, content) {
    const client = await clientPromise;
    const db = client.db();

    try {
        const newBlog = new Blog({
            userId,
            content,
            date: new Date(),
        })

        await db.collection('blogs').insertOne(newBlog);

        return { success: true, message: 'Blog post saved.' };
    } catch (error) {
        console.error('Error saving blog post: ', error);
        return { success: false, message: 'Error saving blog post.' };
    }
}