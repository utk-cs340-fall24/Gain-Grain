import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

export const createAndSaveUser = (name, username, password, done) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return done(err);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword
    });

    newUser.save().then(data => {
      done(null, data);
    }).catch(err => {
      done(err);
    });
  });
};

export const findUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return { success: false, message: "Invalid username or password" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { success: false, message: "Invalid username or password" };

    return { success: true, user };
  } catch (err) {
    return { success: false, message: "Error finding user: " + err.message };
  }
};