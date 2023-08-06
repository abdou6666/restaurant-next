import { prisma } from "@/app/db"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import validator from "validator";
import * as jose from 'jose';
import { setCookies } from 'cookies-next';


export async function POST(req: Request) {
    const { email, password } = await req.json()

    const errors: string[] = []

    const validationSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: 'Email Invalid'
        },
        {
            valid: validator.isLength(password, { min: 1 }),
            errorMessage: 'Password Invalid'
        },
    ]
    validationSchema.forEach(check => {
        if (!check.valid) {
            errors.push(check.errorMessage)
        }
    })

    if (errors.length) {
        return NextResponse.json({ errorMesasge: errors }, { status: 400 })
    }
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({ errorMessage: 'user does not exist' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return NextResponse.json({ errorMessage: 'Wrong Password' }, { status: 401 })
    }

    const alg = 'HS256'
    const secret = new TextEncoder().encode(process.env.SECRET)
    const token = await new jose.SignJWT({ email: email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret)
    const res = NextResponse.json({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        city: user.city,
        phone: user.phone
    }, { status: 200 })
    res.cookies.set('jwt', token, { maxAge: 60 * 6 * 24 })
    return res;

}