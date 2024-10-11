import { getUserById } from '../../utils/userModel';

export default async function handler(req, res) {
  const { userId } = req.query;

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