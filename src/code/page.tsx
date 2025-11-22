import React from 'react'


type Params = { params: { code: string } }


async function getLink(code: string) {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${code}`, { cache: 'no-store' })
if (!res.ok) throw new Error('Not found')
return res.json()
}


export default async function Page({ params }: Params) {
let link: any = null
try { link = await getLink(params.code) } catch (e) { return <div className="p-8">Link not found</div> }


return (
<main className="p-8 max-w-3xl mx-auto">
<h1 className="text-xl font-bold mb-4">Stats for {link.code}</h1>
<div className="bg-white p-4 rounded shadow">
<p><strong>Target:</strong> <a href={link.target}>{link.target}</a></p>
<p><strong>Clicks:</strong> {link.clicks}</p>
<p><strong>Created:</strong> {new Date(link.createdAt).toLocaleString()}</p>
<p><strong>Last clicked:</strong> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-'}</p>
</div>
</main>
)
}