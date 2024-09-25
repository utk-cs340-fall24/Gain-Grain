import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export const createAndSaveUser = async (name, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, password: hashedPassword });
  return newUser.save();
};

export const findUser = async (username, password) => {
  const userFound = await User.findOne({ username });
  if (!userFound) {
    return { success: false, message: 'Username or password is incorrect.' };
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    return { success: false, message: 'Username or password is incorrect.' };
  }

  return { success: true, user: userFound };
};
