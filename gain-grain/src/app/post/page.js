import Link from 'next/link';

export default function PostPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">What would you like to post?</h1>

                <div className="flex flex-col space-y-4">
                    {/* Workouts */}
                    <Link href="/post/post-workouts">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold h-16 w-full rounded text-lg">
                            Workouts
                        </button>
                    </Link>

                    {/* Meals */}
                    <Link href="/post/post-meals">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold h-16 w-full rounded text-lg">
                            Meals
                        </button>
                    </Link>

                    {/* Progress Pictures */}
                    <Link href="/post/post-progress-pictures">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-16 w-full rounded text-lg">
                            Progress Pictures
                        </button>
                    </Link>

                    {/* Blog */}
                    <Link href="/post/post-blog">
                        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold h-16 w-full rounded text-lg">
                            Blog
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
