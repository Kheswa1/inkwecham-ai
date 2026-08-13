import LoginForm from './login-form'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#07110d] px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">INKWECHAM</p>
        <h1 className="mt-4 text-3xl font-black">Sign in to ChamAI</h1>
        <p className="mt-2 text-sm text-white/50">Access your protected InkweCham workspace.</p>
        <LoginForm />
      </div>
    </main>
  )
}
