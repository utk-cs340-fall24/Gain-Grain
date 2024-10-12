
import Navbar from "@/components/Navbar";
import Profile from "@/app/profile/profile";
import { getUserById } from '../../utils/userModel';



export default function profile() {
    async function handler(req, res) {
        const{userId} = req.query;
        if (req.method !== 'GET') {
          return res.status(405).json({ success: false, message: 'Method Not Allowed' });
        }
      
        try {
          const user = await getUserById(userId);
          
          if (!user.success) {
            return res.status(404).json({ success: false, message: user.message });
          }
      
          return res.status(200).json({ success: true, user: { username: user.user } });
        } catch (error) {
          console.error('Error fetching user data:', error);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
      }  
      


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
