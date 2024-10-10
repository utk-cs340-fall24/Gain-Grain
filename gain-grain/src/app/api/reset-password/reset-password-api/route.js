import { NextResponse } from 'next/server';
import { resetPassword } from '../../../../utils/userModel';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    const result = await resetPassword(email, newPassword);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error when resetting password: ', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
  
export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}