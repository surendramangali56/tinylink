import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(req: Request, { params }: { params: { code: string }}) {
const { code } = params
const link = await prisma.link.findUnique({ where: { short: code } })
if (!link) return new NextResponse('Not found', { status: 404 })


await prisma.$executeRaw`UPDATE "Link" SET "clicks" = "clicks" + 1, "lastClicked" = NOW() WHERE "short" = ${code}`
return NextResponse.redirect(link.original, 302)
}