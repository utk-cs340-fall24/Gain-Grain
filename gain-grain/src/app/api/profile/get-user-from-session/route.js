import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../utils/auth';
import { getUserById } from '@/utils/userModel';

export const GET = async (req) => {
    const sessionCookie = req.cookies.get('session');
    const isValidSession = await verifyToken(sessionCookie.value);
    
    if(!isValidSession) {
        return NextResponse.json({ success: false, message: 'User not authenticated.' });
    } 

    const userId = isValidSession.userId;
    const result = await getUserById(userId);

    if(!result.success) {
        return NextResponse.json({ success: false, message: 'Failed to find user.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: result.user });
}