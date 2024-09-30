export default function PostPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">What would you like to post?</h1>

            <div className="w-full max-w-xs">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postType">
                    Select a post type
                </label>
                <select
                    id="postType"
                    className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                >
                    <option value="progress">Progress Pictures</option>
                    <option value="workouts">Workouts</option>
                    <option value="meals">Meals</option>
                    <option value="blog">Blog</option>
                </select>
            </div>
        </div>
    );
}
