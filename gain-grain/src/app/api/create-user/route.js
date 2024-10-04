import { NextResponse } from 'next/server';
import { createAndSaveUser, findUser} from '../../../utils/userModel';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, username, password } = body;

    const result = await createAndSaveUser(name, email, username, password);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in find-user API:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed.' }, { status: 405 });
}