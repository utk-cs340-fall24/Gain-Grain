import { findUser } from '../../../utils/userModel';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const userFound = await findUser(username, password);
      if (userFound.success) {
        return res.status(200).json(userFound);
      } else {
        return res.status(401).json(userFound);
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error: " + err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
