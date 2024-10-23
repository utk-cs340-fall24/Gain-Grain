import { createWorkout } from '../../../../utils/userWorkout.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { userId, title, exercises } = await req.json();

       
        const formattedExercises = exercises.map((exercise) => ({
            name: exercise.name,
            Sets: exercise.repetitions, 
            Reps: exercise.set, 
        }));

        // create workout with both title and formatted exercises
        const result = await createWorkout(userId, title, formattedExercises);

        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

