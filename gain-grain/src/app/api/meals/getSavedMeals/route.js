import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Missing userId' });
        }

        const client = await clientPromise;
        const db = client.db();
        const meals = await db.collection('meals').find({ userId }).toArray();

        return NextResponse.json({ success: true, meals });
    } catch (error) {
        console.error('Error fetching meals:', error);
        return NextResponse.json({ success: false, message: 'Server error' });
    }
}
