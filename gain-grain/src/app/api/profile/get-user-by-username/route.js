import { NextResponse } from 'next/server';
import { findUserByUsername } from '../../../../utils/userModel';

export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;

    const result = await findUserByUsername(username);

    if(result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error) {
    console.error('Error when searching for user:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed.' }, { status: 405 });
}