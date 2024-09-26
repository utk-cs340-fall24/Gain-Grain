import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

// API Route to search exercises by name
export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('test'); // Your database name
  const exercisesCollection = db.collection('exercises'); // Collection name where exercises are stored

  // Extract the search query from the request URL
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('q') || ''; // Default to empty string if no query

  // Search exercises by name (case insensitive)
  const exercises = await exercisesCollection
    .find({ name: { $regex: query, $options: 'i' } }) // Search directly on the 'name' field
    .toArray();

  return NextResponse.json(exercises);
}
