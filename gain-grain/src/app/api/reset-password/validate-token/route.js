import { NextResponse } from 'next/server';
import { validateToken } from '../../../../utils/userModel';

export async function POST(req) {
  try {
    const { token } = await req.json();

    if(!token) {
      return NextResponse.json({ success: false, message: 'Token missing '}, { status: 400 });
    }

    const result = await validateToken(token);
    if(result.success) {
      return NextResponse.json({ success: true, token: result.token })
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Error when validating token:', error);
    return NextResponse.json({ success: false, message: 'Error validating token.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed.' }, { status: 405 });
}