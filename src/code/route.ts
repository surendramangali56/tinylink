import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createLinkSchema, validateCodeOrGenerate } from '@/utils/validation'


export async function POST(req: Request) {
try {
const body = await req.json()
const parsed = createLinkSchema.parse(body)
const code = validateCodeOrGenerate(parsed.code)


const exists = await prisma.link.findFirst({ where: { code } as any })
if (exists) return NextResponse.json({ error: 'Code exists' }, { status: 409 })


const created = await prisma.link.create({ data: { code, target: parsed.target } as any })
return NextResponse.json(created, { status: 201 })
} catch (err: any) {
return NextResponse.json({ error: err?.message || 'Invalid' }, { status: 400 })
}
}


export async function GET() {
const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } })
return NextResponse.json(links)
}