
import Navbar from "@/components/Navbar";
import Profile from "@/app/profile/profile";

export default function profile() {
    return (
        <div>
            <main className="flex min-h-screen flex-col p-6 bg-gray-50">
                <Navbar />
                <div className="flex justify-center pt-20">
                    <Profile/>
                </div>
            </main>
        </div>
    );
}
