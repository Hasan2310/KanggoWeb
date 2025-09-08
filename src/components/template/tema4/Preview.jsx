import Pojokatasframe from './components/bg/pojokatas'
import TengahFrame from './components/bg/TengahFrame'
import Medsos from './components/Medsos'
import Countdown from './components/Countdown'
import hero from './assets/hero.png'
import hero2 from './assets/hero2.png'
import gedung from './assets/gedung.png'
import React from "react"
import './App.css'

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const Home = ({
  pria,
  wanita,
  walipria,
  waliwanita,
  tanggal,
  bulan,
  tahun,
  hari,
  waktumulai,
  waktuselesai,
  alamat,
  namagedung,
  medsosPria = [],
  medsosWanita = [],
  tanggalPernikahan,
  cerita
}) => {
  const bulanText = monthNames[(parseInt(bulan || 1, 10) - 1)];
  
  return (
    <div className='body-4'>
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* Overlay gelap atas */}
        <div className="absolute top-0 left-0 w-full h-[80vh] bg-black/30"></div>

        {/* Bagian bawah gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[20vh] backdrop-blur-xs bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/60 to-transparent"></div>

        {/* Teks di tengah */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
          <h2 className="text-xl text-white drop-shadow-lg">Undangan Pernikahan</h2>
          <h1 className="text-5xl text-white drop-shadow-lg">
            {pria || "Putra"} & {wanita || "Wanita"}
          </h1>
          <p className='text-white text-xl'>{tanggal || "01"} {bulan || "Januari"} {tahun || "2029"}</p>
        </div>

        {/* Countdown bawah */}
        <div className="relative z-10 h-full flex flex-col justify-end items-center text-center pb-10">
          <p>Menuju momen bahagia</p>
          <Countdown />
        </div>
      </section>

      {/* Profil Pengantin */}
      <section className='h-auto relative py-20'>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Pojokatasframe position="top-left" />
          <Pojokatasframe position="bottom-right" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={hero2} alt="Hero kedua" className='w-90' />
        </div>

        <div className="relative w-full px-5 h-auto ">
          {/* Card Kiri */}
          <div className="mt-10 flex flex-col items-start">
            <p className="text-xl font-bold">{pria || "Putra"}</p>
            <p className="text-md">Anak ketiga dari {walipria || "Cecep"}</p>
            <div className="flex space-x-3 mt-1">
              {medsosPria.map((item, index) => (
                <Medsos key={index} name={item.name} link={item.link} />
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <h1 className='text-5xl'>&</h1>
          </div>

          {/* Card Kanan */}
          <div className="right-0 bottom-0 flex flex-col items-end mt-5">
            <p className="text-xl font-bold">{wanita || "Putri"}</p>
            <p className="text-md">Anak ketiga dari {waliwanita || "Lia"}</p>
            <div className="flex space-x-3 mt-1">
              {medsosWanita.map((item, index) => (
                <Medsos key={index} name={item.name} link={item.link} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Acara */}
      <section className='h-auto relative py-10'>
        <div className="flex justify-center items-center flex-col text-center">
          <hr className='w-xs text-tema border-2' />
          <div className="mt-10">
            <p className='text-5xl'>{hari || "Senin"}</p>
            <div className="flex justify-center items-center space-x-3">
              <h1 className='text-7xl'>{tanggal || "01"}</h1>
              <div className="flex flex-col text-start -space-y-1">
                <p className='text-4xl'>{bulanText}</p>
                <p className='text-4xl'>{tahun || "2029"}</p>
              </div>
            </div>
          </div>

          <img src={gedung} alt="Gedung pernikahan" className='w-40 mt-20' />
          <p className='font-bold text-xl'>{namagedung || "Ballrom"}</p>
          <p>{waktumulai || "07:00"} - {waktuselesai || "Selesai"}</p>
          <p>{alamat || "Jl Sudirman"}</p>

          {/* Google Maps */}
          <div className="flex justify-center mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1059.816844834293!2d106.82377878497633!3d-6.1867753323003125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f428ab09bf45%3A0x157363a144ef7ba7!2sthe%20Ballroom%20at%20Djakarta%20Theater%20I!5e0!3m2!1sid!2sid!4v1755510393647!5m2!1sid!2sid"
              width="350"
              height="240"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-10 bg-tema px-5 py-1 rounded-3xl">
            <a href="" className='text-white'>Lihat peta</a>
          </div>

          <hr className='w-xs text-tema border-2 mt-10' />
        </div>
      </section>

      {/* Galeri */}
      <section className='justify-center items-center h-screen relative px-5'>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Pojokatasframe position="top-right" />
          <Pojokatasframe position="top-left" />
        </div>

        <div className="relative z-50">
          <p className='font-bold text-2xl pt-20 text-center'>Galeri kami</p>
          <div className="grid grid-cols-2 gap-3 pt-8">
            <img src="" alt="Galeri 1" className='w-full h-40 object-cover bg-white' />
            <img src="" alt="Galeri 2" className='w-full h-40 object-cover bg-white' />
            <img src="" alt="Galeri 3" className='w-full h-40 object-cover bg-white' />
            <img src="" alt="Galeri 4" className='w-full h-40 object-cover bg-white' />
            <img src="" alt="Galeri 5" className='w-full h-40 object-cover bg-white' />
            <img src="" alt="Galeri 6" className='w-full h-40 object-cover bg-white' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
