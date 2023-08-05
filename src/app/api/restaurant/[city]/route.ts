import { prisma } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { city }: { city: string }) {
    const location = await prisma.location.findFirst({
        where: {
            name: city
        },
        include: {
            Restaurant: true
        }
    })
    return NextResponse.json(location, { status: 200 });
}