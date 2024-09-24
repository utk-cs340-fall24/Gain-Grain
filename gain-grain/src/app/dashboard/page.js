import Link from 'next/link';


export default function Page () {
    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <ul>
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
                    <Link href='/dashboard/settings'>
                        <button>Settings</button>
                    </Link>
                </li>
                <li>
                    <Link href='/dashboard/About'>
                        <button>About</button>
                    </Link>
                </li>
            </ul>
        </div>
    );

}