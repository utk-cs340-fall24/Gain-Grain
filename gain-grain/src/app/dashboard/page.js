import Link from 'next/link';


export default function Page () {
    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <ul>
                <li>
                    <Link href='/dashboard/calender'>
                        <button>Calender</button>
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
                        <button>Go to Settings</button>
                    </Link>
                </li>
                
            </ul>
        </div>
    );

}