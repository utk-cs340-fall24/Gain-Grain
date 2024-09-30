import Link from 'next/link';

export default function PostPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            {/* Smoothed Corner Rectangle with More Rounded Corners */}
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                {/* Header inside the rectangle */}
                <h1 className="text-3xl font-bold mb-6 text-center">What would you like to post?</h1>

                {/* Buttons inside the rectangle */}
                <div className="flex flex-col space-y-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded text-lg">
                        Progress Pictures
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded text-lg">
                        Workouts
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded text-lg">
                        Meals
                    </button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded text-lg">
                        Blog
                    </button>
                </div>
            </div>
        </div>
    );
}
