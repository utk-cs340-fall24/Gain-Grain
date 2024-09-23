import Link from 'next/link';


export default function Page () {
    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <Link href='/dashboard/settings'>
                <button>Go to Settings</button>
            </Link>
        </div>
    );

}