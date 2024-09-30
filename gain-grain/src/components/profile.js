
export default function profile() {
  return (
    <div>
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold">User </h1>
          <p className="text-gray-600">User's Bio</p>
        </div>
        <button> edit profile </button>

      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved Workouts</h2>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved Meals</h2>
      </div>
    </div>
  );
}
