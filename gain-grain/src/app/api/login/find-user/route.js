import { NextResponse } from 'next/server';
import { findUser } from '../../../../utils/userModel';

export async function POST(req) {
    try {
      const body = await req.json();
      const { username, password } = body;

      const result = await findUser(username, password);

      if (result.success) {
        // Return the userId along with the success response
        return NextResponse.json({ success: true, userId: result.user._id.toString() });
      } else {
        return NextResponse.json({ success: false, message: result.message }, { status: 401 });
      }
    } catch (error) {
      console.error('Error in find-user API:', error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }
  
export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}