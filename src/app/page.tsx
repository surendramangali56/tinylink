import React, { useEffect, useState } from 'react'
type Link = {
id: string
code: string
target: string
clicks: number
createdAt: string
lastClicked?: string | null
}


export default function Home() {
const [links, setLinks] = useState<Link[]>([])
const [target, setTarget] = useState('')
const [code, setCode] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)


async function fetchLinks() {
const res = await fetch('/api/links')
const data = await res.json()
setLinks(data)
}


useEffect(() => { fetchLinks() }, [])


async function handleCreate(e: React.FormEvent) {
e.preventDefault()
setError(null)
setLoading(true)
try {
const res = await fetch('/api/links', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ target, code: code || undefined }),
})
if (!res.ok) {
const err = await res.json()
throw new Error(err?.error || 'Failed')
}
setTarget('')
setCode('')
await fetchLinks()
} catch (err: any) {
    setError(err.message)
} finally { setLoading(false) }
}
async function handleDelete(c: string) {
if (!confirm('Delete this link?')) return
await fetch(`/api/links/${c}`, { method: 'DELETE' })
setLinks(prev => prev.filter(l => l.code !== c))
}

return (
<main className="p-8 max-w-4xl mx-auto">
<h1 className="text-2xl font-bold mb-4">TinyLink — Short links</h1>


<form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
<input className="p-2 border rounded" placeholder="Target URL" value={target} onChange={e => setTarget(e.target.value)} />
<input className="p-2 border rounded" placeholder="Custom code (optional)" value={code} onChange={e => setCode(e.target.value)} />
<div>
<button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Creating...' : 'Create'}</button>
</div>
</form>


{error && <div className="text-red-600 mb-4">{error}</div>}


<table className="w-full bg-white rounded shadow overflow-hidden">
<thead className="bg-gray-100 text-left">
<tr>
<th className="p-2">Code</th>
<th className="p-2">Target</th>
<th className="p-2">Clicks</th>
<th className="p-2">Last Clicked</th>
<th className="p-2">Actions</th>
</tr>
</thead>
<tbody>
{links.map(l => (
<tr key={l.id} className="border-t">
<td className="p-2"><a href={`/${l.code}`} target="_blank" rel="noreferrer" className="text-blue-600">{l.code}</a></td>
<td className="p-2 truncate max-w-xs">{l.target}</td>
<td className="p-2">{l.clicks}</td>
<td className="p-2">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '-'}</td>
<td className="p-2"><button onClick={() => handleDelete(l.code)} className="text-sm text-red-600">Delete</button></td>
</tr>
))}
</tbody>
</table>
</main>
)
}