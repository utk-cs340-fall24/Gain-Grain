import Link from 'next/link';

export default function Settings() {

    return(
        <div>
            <ul>
                <li>
                    Change Volue
                </li>
                <li>
                    View Profile
                </li>
                <li>
                    Set Goals
                </li>
            </ul>

            <Link href='/'>
                    <button>GO back to home</button>
            </Link>
        </div>
    )
}