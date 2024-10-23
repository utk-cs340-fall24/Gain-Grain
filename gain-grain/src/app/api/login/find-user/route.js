import { NextResponse } from 'next/server';
import { findUser } from '../../../../utils/userModel';
import { signToken } from '../../../../utils/auth';

export async function POST(req) {
    try {
      const body = await req.json();
      const { username, password } = body;

      const result = await findUser(username, password);

      if (!result.success) {
        return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
      }

      const sessionToken = await signToken({ userId: result.user._id });

      const response = NextResponse.json({ success: true });
      response.cookies.set('session', sessionToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      });

      return response;
    } catch (error) {
      console.error('Error in find-user API:', error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }
  
export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}