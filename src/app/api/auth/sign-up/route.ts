import { prisma } from "@/app/db";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from 'bcrypt';
import * as jose from 'jose';

export async function POST(req: Request) {

    const { firstName, lastName, city, phone, password, email } = await req.json();
    const errors: string[] = []

    const validationSchema = [
        {
            valid: validator.isLength(firstName, {
                min: 1,
                max: 20,
            }),
            errorMessage: 'First Name Invalid'
        },
        {
            valid: validator.isLength(lastName, {
                min: 1,
                max: 20,
            }),
            errorMessage: 'Last Name Invalid'
        },
        {
            valid: validator.isEmail(email),
            errorMessage: 'Email Invalid'
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: 'Phone Number Invalid'
        },
        {
            valid: validator.isLength(city, { min: 1 }),
            errorMessage: 'City Invalid'
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: 'Password must be strong'
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
            email: email.toLowerCase()

        }
    })
    if (user) {
        return NextResponse.json({ errorMesasge: 'Email already exist' }, { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { id } = await prisma.user.create({
        data: {
            city,
            email,
            first_name: firstName,
            last_name: lastName,
            phone,
            password: hashedPassword
        }
    })
    const alg = 'HS256'
    const secret = new TextEncoder().encode(process.env.SECRET)
    const token = await new jose.SignJWT({ email: email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret)
    return NextResponse.json({ msg: `user created ${id}`, token }, { status: 201 })
}