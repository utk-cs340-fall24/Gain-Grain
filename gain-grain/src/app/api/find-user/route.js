import { NextResponse } from 'next/server';
import clientPromise from '../../../utils/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
      const body = await req.json();
      const { username, password } = body;
  
      const client = await clientPromise;
      const db = client.db();
  
      const user = await db.collection('users').findOne({ username });
  
      if (!user) {
        return NextResponse.json({ success: false, message: 'Username or password is incorrect.' }, { status: 401 });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Username or password is incorrect.' }, { status: 401 });
      }
  
      return NextResponse.json({ success: true, message: 'Login successful', user }, { status: 200 });
    } catch (error) {
      console.error('Error in find-user API:', error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }
  
  export async function GET() {
    return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
  }