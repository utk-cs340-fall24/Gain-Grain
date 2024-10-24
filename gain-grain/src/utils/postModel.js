import clientPromise from './mongodb'; 

export const fetchPosts = async () => {
  try {
    const client = await clientPromise;
    const db = client.db();

    const posts = await db
      .collection('posts') 
      .find()
      .project({ title: 1, body: 1, author: 1, dateCreated: 1 }) // Adjust fields as needed
      .toArray();

    return { success: true, posts };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { success: false, message: 'Error fetching posts' };
  }
};