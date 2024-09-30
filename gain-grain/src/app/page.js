import Link from 'next/link';
import './app.css';

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col p-6 bg-gray-50">
            {/* Navigation Bar */}
            <nav className="flex items-center justify-between h-16 bg-orange-500 p-4 rounded-lg">
                <h1 className="text-white text-xl md:text-3xl font-bold">Gain & Grain</h1>
                <div className="flex space-x-4 md:space-x-8">
                    <Link href="/dashboard/calendar">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Calendar
                        </button>
                    </Link>
                    <Link href="/dashboard/savedMeals">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Nutrition
                        </button>
                    </Link>
                    <Link href="/dashboard/savedWorkouts">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Exercise
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Register
                        </button>
                    </Link>
                    <Link href="/post">
                        <button className="bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Post
                        </button>
                    </Link>
                </div>
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="transition-width duration-300 ease-in-out w-12 h-10 px-2 rounded-lg focus:w-48 focus:outline-none"
                    />
                </div>
            </nav>

            {/* Page Content */}
            <section className="mt-8">
                <div className="flex h-20 shrink-0 items-end justify-between rounded-lg bg-orange-500 p-4 md:h-52 md:items-center">
                    <h2 className="text-white text-xl md:text-4xl font-bold">
                        Welcome to the Gain & Grain Home Page
                    </h2>
                    <Link href="/profile">
                        <button className="bg-white text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                            Profile
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
