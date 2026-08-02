function Login() {
  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4">
      <div className="bg-[#0a0e14] border border-[#1c2a2e] rounded-lg p-10 w-full max-w-md font-mono">

        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🛡️</span>
          <span className="text-[#00ff9d] text-lg tracking-widest">DEEPGUARD</span>
        </div>
        <p className="text-[#5a6b6f] text-xs mb-8 tracking-wide">
          AI DEEPFAKE DETECTION SYSTEM
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-[#5a6b6f] text-xs mb-1 tracking-widest">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="you@domain.com"
              className="w-full bg-[#0f151a] border border-[#22343a] text-[#c8f5e3] text-sm px-3 py-2 rounded outline-none focus:border-[#00ff9d]"
            />
          </div>

          <div>
            <label className="block text-[#5a6b6f] text-xs mb-1 tracking-widest">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              className="w-full bg-[#0f151a] border border-[#22343a] text-[#c8f5e3] text-sm px-3 py-2 rounded outline-none focus:border-[#00ff9d]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00ff9d] text-[#04120b] font-semibold text-sm tracking-widest py-3 rounded hover:opacity-90 transition"
          >
            AUTHENTICATE
          </button>
        </form>

        <div className="flex justify-between mt-6 text-xs text-[#3d4d51]">
          <span>
            No account? <span className="text-[#22d3ee] cursor-pointer">Register</span>
          </span>
          <span className="flex items-center gap-1">🔒 TLS secured</span>
        </div>

      </div>
    </div>
  )
}

export default Login