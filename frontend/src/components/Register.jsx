import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message)
      }

      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center px-4">
      <div className="bg-[#0a0e14] border border-[#1c2a2e] rounded-lg p-10 w-full max-w-md font-mono">

        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🛡️</span>
          <span className="text-[#00ff9d] text-lg tracking-widest">DEEPGUARD</span>
        </div>
        <p className="text-[#5a6b6f] text-xs mb-8 tracking-wide">
          CREATE A SECURE ACCOUNT
        </p>

        {error && (
          <div className="bg-[#2a1414] border border-[#4a1f1f] text-[#ff8080] text-xs px-3 py-2 rounded mb-5">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#5a6b6f] text-xs mb-1 tracking-widest">
              FULL NAME
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-[#0f151a] border border-[#22343a] text-[#c8f5e3] text-sm px-3 py-2 rounded outline-none focus:border-[#00ff9d]"
            />
          </div>

          <div>
            <label className="block text-[#5a6b6f] text-xs mb-1 tracking-widest">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0f151a] border border-[#22343a] text-[#c8f5e3] text-sm px-3 py-2 rounded outline-none focus:border-[#00ff9d]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00ff9d] text-[#04120b] font-semibold text-sm tracking-widest py-3 rounded hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="flex justify-center mt-6 text-xs text-[#3d4d51]">
          <span>
            Already have an account? <Link to="/login" className="text-[#22d3ee]">Login</Link>
          </span>
        </div>

      </div>
    </div>
  )
}

export default Register