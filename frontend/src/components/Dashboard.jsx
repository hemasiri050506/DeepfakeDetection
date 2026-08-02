import { useState } from 'react'

function Dashboard() {
  const [file, setFile] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResults(null)
    setError('')
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://localhost:8081/api/video/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Analysis failed')
      }

      const data = await res.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#05080a] px-4 py-10 font-mono">
      <div className="max-w-2xl mx-auto bg-[#0a0e14] border border-[#1c2a2e] rounded-lg p-6">

        <div className="flex items-center justify-between mb-6 border-b border-[#1c2a2e] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span className="text-[#00ff9d] text-sm tracking-widest">DEEPGUARD</span>
          </div>
          <div className="flex items-center gap-1 text-[#5a6b6f] text-xs">
            <span>👤</span> ADMIN_01
          </div>
        </div>

        <label className="block border border-dashed border-[#22343a] rounded-md p-8 text-center mb-5 cursor-pointer hover:border-[#00ff9d] transition">
          <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          <div className="text-2xl text-[#22d3ee] mb-2">⬆️</div>
          <p className="text-[#c8f5e3] text-sm mb-1">
            {file ? file.name : 'Drop video file or click to upload'}
          </p>
          <p className="text-[#3d4d51] text-xs">MP4, MOV up to 100MB</p>
        </label>

        {file && !results && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-[#00ff9d] text-[#04120b] font-semibold text-sm tracking-widest py-3 rounded hover:opacity-90 transition disabled:opacity-50 mb-5"
          >
            {loading ? 'ANALYZING...' : 'RUN ANALYSIS'}
          </button>
        )}

        {error && (
          <div className="bg-[#2a1414] border border-[#4a1f1f] text-[#ff8080] text-xs px-3 py-2 rounded mb-5">
            {error}
          </div>
        )}

        {results && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-3 text-center">
                <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">FACE DETECTION</p>
                <p className="text-[#00ff9d] text-lg">{results.face_detection_rate}%</p>
              </div>
              <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-3 text-center">
                <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">BLINKS DETECTED</p>
                <p className="text-[#00ff9d] text-lg">{results.blink_count}</p>
              </div>
              <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-3 text-center">
                <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">TOTAL FRAMES</p>
                <p className="text-[#00ff9d] text-lg">{results.total_frames}</p>
              </div>
            </div>

            <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-4">
              <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">FRAMES WITH FACE</p>
              <p className="text-[#c8f5e3] text-lg">{results.frames_with_face} / {results.total_frames}</p>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Dashboard