function Dashboard() {
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

        <div className="border border-dashed border-[#22343a] rounded-md p-8 text-center mb-5">
          <div className="text-2xl text-[#22d3ee] mb-2">⬆️</div>
          <p className="text-[#c8f5e3] text-sm mb-1">Drop video file or click to upload</p>
          <p className="text-[#3d4d51] text-xs">MP4, MOV up to 100MB</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-3 text-center">
            <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">FACE</p>
            <p className="text-[#00ff9d] text-lg">98%</p>
          </div>
          <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-3 text-center">
            <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">BLINK</p>
            <p className="text-[#00ff9d] text-lg">91%</p>
          </div>
          <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-3 text-center">
            <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">VOICE</p>
            <p className="text-[#f2a93b] text-lg">67%</p>
          </div>
        </div>

        <div className="bg-[#0f151a] border border-[#22343a] rounded-md p-4 flex justify-between items-center">
          <div>
            <p className="text-[#5a6b6f] text-[10px] tracking-widest mb-1">OVERALL RISK SCORE</p>
            <p className="text-[#ff5f5f] text-2xl">72 / 100</p>
          </div>
          <span className="bg-[#2a1414] text-[#ff8080] text-xs px-3 py-2 rounded tracking-widest">
            LIKELY MANIPULATED
          </span>
        </div>

      </div>
    </div>
  )
}

export default Dashboard