
import Navbar from "@/components/Navbar";
import Profile from "@/components/profile";

export default function profile() {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center pt-20">
                <Profile />
            </div>
        </div>
    );
}
