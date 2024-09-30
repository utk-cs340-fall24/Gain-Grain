import Link from 'next/link';
import './app.css'

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-500 p-4 md:h-52">
                <h1 className="text-white text-xl">Welcome to the  Gain & Grain Home Page: </h1>
                <Link href="/profile">
                    <button>Profile</button>
                </Link>
            </div>
            <Link href="/dashboard">
                <button> Go to Dashboard</button>
            </Link>

            <ul className='navbar mt-6 flex space-x-4'>
                <li>
                    <Link href='/dashboard/calendar'>
                        <button>Calendar</button>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Nutrition'>
                        <button>Nutrition</button>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/Exercise'>
                        <button>Exercise</button>
                    </Link>
                </li>
                <li>
                    <Link href='/login'>
                        <button>Login</button>
                    </Link>
                </li>
                <li>
                    <Link href='/register'>
                        <button>Register</button>
                    </Link>
                </li>
                <li>
                    <Link href='/post'>
                        <button>Post</button>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/newcalendar'>
                        <button>New Calendar</button>
                    </Link>
                </li>
            </ul>

        </main>

    );
}


