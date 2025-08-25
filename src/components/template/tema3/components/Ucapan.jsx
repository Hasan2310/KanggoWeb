import React, { useState } from 'react'

const Ucapan = () => {
  const [nama, setNama] = useState('')
  const [pesan, setPesan] = useState('')
  const [komentar, setKomentar] = useState([])

  const handleKirim = (e) => {
    e.preventDefault()
    if (!nama.trim() || !pesan.trim()) return

    setKomentar([...komentar, { nama, pesan }])
    setNama('')
    setPesan('')
  }

  return (
    <div className="z-50 text-center w-full max-w-md px-4">
      <h1 className="text-6xl mt-10 mb-6">Ucapan</h1>

      <form onSubmit={handleKirim} className="space-y-4">
        <div className="text-left">
          <label className="block font-medium mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-amber-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="text-left">
          <label className="block font-medium mb-1">Pesan</label>
          <textarea
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-amber-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-900 text-white py-2 rounded transition"
        >
          Kirim
        </button>
      </form>

      {/* Komentar */}
      <div className="mt-10 space-y-4">
        <p className='text-start text-xl font-bold'>Komentar</p>
        {komentar.map((item, index) => (
          <div key={index} className="text-left border-b pb-2">
            <p className="font-semibold text-amber-900">{item.nama}</p>
            <p className="text-amber-900">{item.pesan}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ucapan
