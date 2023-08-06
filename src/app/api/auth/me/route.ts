import { prisma } from '@/app/db';
import * as jose from 'jose';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const bearerToken = req.headers.get('Authorization') as string;

    const token = bearerToken.split(' ')[1];

    const secret = new TextEncoder().encode(process.env.secret)
    try {
        const { payload } = await jose.jwtVerify(token, secret) as any
        if (!payload.email) {
            throw new Error('Invalid Token')
        }
        const user = await prisma.user.findFirst({
            where: {
                email: payload.email
            },
            select: {
                city: true,
                email: true,
                id: true,
                first_name: true,
                last_name: true,
                phone: true,
            }
        })
        if (!user) {
            throw new Error('User does not exist');
        }

        return NextResponse.json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            city: user.city,
            phone: user.phone
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ errorMessage: 'Unauthorized (invalid token)' }, { status: 401 })
    }

}