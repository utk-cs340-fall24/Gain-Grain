export default function PostPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">What would you like to post?</h1>

            <div className="flex flex-col space-y-4 w-full max-w-md">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded shadow-lg text-lg">
                    Workouts
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded shadow-lg text-lg">
                    Meal
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded shadow-lg text-lg">
                    Progress Pics
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded shadow-lg text-lg">
                    Blog
                </button>
            </div>
        </div>
    );
}
