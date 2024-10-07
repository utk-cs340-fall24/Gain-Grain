import mongoose from 'mongoose';
import clientPromise from './mongodb'


export const profileSearch = async(req, res)=> {
  const { query } = req.query;  // Get search query from the request

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'No search query provided' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Search for users with similar usernames (case-insensitive)
    const users = await db.collection('users').find({
      username: { $regex: query, $options: 'i' }
    }).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error searching for users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}