import { jwtVerify, SignJWT } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.AUTH_KEY);

export async function signToken(payload) {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(SECRET_KEY);

    return token;
}

export async function verifyToken(tokenValue) {
    try {
        const { payload: verify } = await jwtVerify(tokenValue, SECRET_KEY);
        return verify;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}