import { z } from 'zod'


export const codeRegex = /^[A-Za-z0-9]{6,8}$/


export const createLinkSchema = z.object({
target: z.string().url(),
code: z.string().optional(),
})


export function validateCodeOrGenerate(code?: string) {
if (code) {
if (!codeRegex.test(code)) throw new Error('Code must match [A-Za-z0-9]{6,8}')
return code
}
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
let out = ''
for (let i = 0; i < 7; i++) out += chars[Math.floor(Math.random() * chars.length)]
return out
}