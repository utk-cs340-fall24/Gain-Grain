// src/app/api/workouts/save.js
import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, exercises, date } = body;

        if (!userId || !exercises || !date) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection('workouts').insertOne({
            userId, // This should now store the actual ObjectId
            exercises,
            date,
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error in save workout API:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
