import { createAndSaveUser } from '../../../utils/userModel';
import { body, validationResult } from 'express-validator';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Validate request body
    await body('name').not().isEmpty().withMessage('Name is required').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, username, password } = req.body;
    createAndSaveUser(name, username, password, (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error creating user: " + err.message });
      }
      return res.status(201).json({ success: true, message: "User created successfully", data });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}