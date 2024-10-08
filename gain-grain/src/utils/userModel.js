import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import clientPromise from './mongodb'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const tokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  reset_token: { type: String, rerquired: true },
  token_expiry: { type: Date, required: true }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

const Token = mongoose.models.Token || mongoose.model("Token", tokenSchema);

export const createAndSaveUser = async (name, email, username, password) => {
  try {
    const client = await clientPromise;
    const db = client.db();

    const existingEmail = await db.collection('users').findOne({ email });
    if (existingEmail) {
      return { success: false, message: 'Email already in use.' };
    }

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return { success: false, message: 'Username already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      name: name,
      email: email,
      username: username,
      password: hashedPassword
    });

    const result = await db.collection('users').insertOne(newUser);
  
    return {success: true, message: 'User registered successfully.', userId: result.insertedId };
  } catch (error) {
    console.error('Error creating user: ', error);
    return { success: false, message: 'Error creating user.' };
  }
};

export const findUser = async (username, password) => {
  const client = await clientPromise;
  const db = client.db();

  try {
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return { success: false, message: 'Username or password is incorrect.' };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: 'Username or password is incorrect.' };
    }

    return { success: true, message: 'Login successful', user };
  } catch (error) {
    console.error('Error in find-user API:', error);
    return { success: false, message: 'Server error' };
  }
};

export const generateToken = async (email) => {
  const client = await clientPromise;
  const db = client.db();

  try {
    const reset_token = crypto.randomBytes(32).toString('hex');
    const current_date = new Date();
    const expiration_time = new Date(current_date.getTime() + 60 * 60 * 1000);

    const newToken = new Token({
      email: email,
      reset_token: reset_token,
      token_expiry: expiration_time
    });

    await db.collection('tokens').insertOne(newToken);

    return {
      success: true, 
      message: 'Reset token generated successfully.',
      token: reset_token
    };
  } catch (error) {
    console.error('Error generating reset token: ', error);
    return { success: false, message: 'Error generating reset token.' };
  }
};

export const verifyToken = async (email) => {

}