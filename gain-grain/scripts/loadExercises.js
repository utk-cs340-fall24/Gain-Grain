import dotenv from 'dotenv';
import clientPromise from '../src/utils/mongodb.js'; // Adjust the path as necessary
import exercises from '../src/data/exercises.json' assert { type: 'json' }; // Adjust the path as necessary

async function loadExercises() {
  const client = await clientPromise;
  const db = client.db();

  // Optionally, clear the existing exercises
  await db.collection('exercises').deleteMany({});

  // Insert the exercises from the JSON file
  const result = await db.collection('exercises').insertMany(exercises);
  //console.log(`${result.insertedCount} exercises loaded into the database`);
}

// Call the loadExercises function
loadExercises()
  .catch(console.error)
  .finally(() => process.exit(0)); // Exit the process after completion
