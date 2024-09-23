

import Link from 'next/link';
import './app.css'

export default function Home() {
  
  return (
    <div>
            <h1>Welcome to the Home Page</h1>
            
            <Link href="/dashboard">
                <button>Go to Dashboard</button>
            </Link>
        </div>
  );
}


