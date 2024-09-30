import { createAndSaveUser } from '../../../utils/userModel.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, username, password } = req.body;

    try {
      const result = await createAndSaveUser(name, username, password);
      res.status(201).json({ success: true, message: 'User created successfully', result });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error creating user', error: err });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}