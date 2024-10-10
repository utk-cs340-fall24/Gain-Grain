import { NextResponse } from 'next/server';
import { createWorkout, findWorkoutsByUserId } from '../../../utils/userWorkout'; // Adjusted path



export async function POST(req) {
    try {
        const body = await req.json(); // Parse the request body
        const { userId, exercises } = body; // Destructure userId and exercises from the body

        // Use the utility function to insert the new workout into the database
        const result = await createWorkout(userId, exercises);

        return NextResponse.json({ message: 'Workout added!', result }); // Success response
    } catch (error) {
        console.error('Error when adding workout:', error); // Log the error
        return NextResponse.json({ success: false, message: 'Failed to save workout' }, { status: 500 }); // Error response
    }
}

// Optional: If you want to implement a GET method to fetch workouts by userId
export async function GET(req) {
    try {
        const { userId } = req.query; // Extract userId from query parameters

        const workouts = await findWorkoutsByUserId(userId); // Use the utility function to get workouts

        return NextResponse.json({ workouts }); // Return the workouts in the response
    } catch (error) {
        console.error('Error when fetching workouts:', error); // Log the error
        return NextResponse.json({ success: false, message: 'Failed to fetch workouts' }, { status: 500 }); // Error response
    }
}
