import Link from 'next/link';

export default function Calendar() {
  
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-500 p-4 md:h-52">
        <h1>Nutrition & Workout Calendar: </h1>
      </div>
      <h1>Plan a Meal</h1>
      <h1>Plan a Workout</h1>
    </main>
  );
}