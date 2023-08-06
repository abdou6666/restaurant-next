import * as jose from 'jose';
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: '/api/auth/me'
}

export default async function Middleware(req: NextRequest, res: NextRequest) {
    const bearerToken = req.headers.get('Authorization');
    if (!bearerToken) {
        return NextResponse.json({ errorMessage: 'Unauthorized (no bearer token)' }, { status: 401 })
    }
    const token = bearerToken.split(' ')[1];
    if (!token) {
        return NextResponse.json({ errorMessage: 'Unauthorized (no token)' }, { status: 401 })
    }
    const secret = new TextEncoder().encode(process.env.secret)
    try {
        await jose.jwtVerify(token, secret)

        NextResponse.next();
    } catch (error) {
        return NextResponse.json({ errorMessage: 'Unauthorized (invalid token)' }, { status: 401 })
    }
}
