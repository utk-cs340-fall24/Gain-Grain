import { NextResponse } from 'next/server';
import { removeToken } from '../../../../utils/userModel';

export async function POST(req) {
  try {
    const body = await req.json();
    const { reset_token } = body;

    const result = await removeToken(reset_token);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error when removing token: ', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
  
export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}