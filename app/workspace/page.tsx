import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function WorkspacePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) redirect('/auth/login?next=/workspace')

  const email = typeof data.claims.email === 'string' ? data.claims.email : 'Authenticated user'

  return (
    <main className="min-h-screen bg-[#07110d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">INKWECHAM</p>
            <h1 className="mt-2 text-3xl font-black">AI Workspace</h1>
          </div>
          <span className="text-sm text-white/50">{email}</span>
        </div>
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm font-semibold text-emerald-300">KHESH / ChamAI</p>
          <h2 className="mt-3 text-4xl font-black">Your protected workspace is ready.</h2>
          <p className="mt-4 max-w-2xl text-white/55">This route is authenticated by Supabase and backed by the InkweCham RLS architecture. The next layer is the secure /api/khesh execution boundary.</p>
        </section>
      </div>
    </main>
  )
}
