import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET(req: Request, { params }: { params: { code: string } }) {
const { code } = params
const link = await prisma.link.findUnique({ where: { code } })
if (!link) return NextResponse.json({ error: 'Not found' }, { status: 404 })
return NextResponse.json(link)
}


export async function DELETE(req: Request, { params }: { params: { code: string } }) {
const { code } = params
try {
await prisma.link.delete({ where: { code } })
return new NextResponse(null, { status: 204 })
} catch (e: any) {
// Prisma throws P2025 when the record to delete does not exist
if (e?.code === 'P2025') {
return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
}