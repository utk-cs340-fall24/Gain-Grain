import Link from 'next/link';

export default function Nutrition() {
  
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-500 p-4 md:h-52">
        <h1 className="text-white text-xl">Saved Meals </h1>
      </div>
      <Link href='/'>
         <button>GO back to home</button>
       </Link>
    </main>
    
  );
}