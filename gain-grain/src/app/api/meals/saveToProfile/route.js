import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongodb";

export async function POST(req) {

    try {
        const body = await req.json();
        const { userId, meal, date } = body;

        if (!userId || !meal || !date) {
            return NextResponse.json({ success: false, message: 'Missing required fields'});
        }

        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection('meals').insertOne({
            userId,
            meal: {
                name: meal.name,
                ingredients: meal.ingredients,
                calories: meal.calories,
            },
            date: new Date(date),
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error in save meals API:', error);
        return NextResponse.json({ success: false, message: 'Server error'});
    }
}