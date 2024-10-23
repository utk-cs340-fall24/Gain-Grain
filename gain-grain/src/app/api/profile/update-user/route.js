import { NextResponse } from 'next/server';
import { updateProfile } from '../../../../utils/userModel';

export async function POST(req) {
    try {
      const body = await req.json();
      const { userId, bio, profilePicPath } = body;

      const updatedProfile = await updateProfile(userId, bio, profilePicPath);

      if (updatedProfile.success) {
        return NextResponse.json({ success: true, updatedProfile });
      } else {
        return NextResponse.json({ success: false, message: updatedProfile.message }, { status: 401 });
      }
    } catch (error) {
      console.error('Error in update-user API:', error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }
  
export async function GET() {
  return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}