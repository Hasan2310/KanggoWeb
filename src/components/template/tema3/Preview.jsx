import React from "react";
import Pojokatasframe from './components/bg/pojokatas';
import TengahFrame from './components/bg/TengahFrame';
import Medsos from './components/Medsos';
import Countdown from './components/Countdown';
import hero from './assets/hero.png';
import hero2 from './assets/hero2.png';
import gedung from './assets/gedung.png';
import g1 from './assets/Gallery/1.png';
import g2 from './assets/Gallery/2.png';
import g3 from './assets/Gallery/3.png';
import g4 from './assets/Gallery/4.png';
import g5 from './assets/Gallery/5.png';
import g6 from './assets/Gallery/6.png';
import './App.css';

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
  waktu, // ✅ diganti jadi satu props aja
  alamat,
  namagedung,
  medsosPria = [],
  medsosWanita = [],
  tanggalPernikahan,
  cerita
}) => {
  const bulanText = monthNames[(parseInt(bulan || 1, 10) - 1)];

  // Array galeri biar gampang manage
  const galleryImages = [g1, g2, g3, g4, g5, g6];

  return (
    <div className="body-3">
      {/* Hero */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-[75vh] bg-black/10"></div>
        <div className="absolute bottom-0 left-0 w-full h-[25vh] backdrop-blur-xs bg-gradient-to-t from-[#E6E6E6] via-white/60 to-transparent"></div>

        <div className="relative z-10 h-full flex flex-col justify-end items-center text-center pb-15">
          <h1 className="text-4xl font-bold">{pria || "Putra"} & {wanita || "Putri"}</h1>
          <p>Undangan Pernikahan</p>
        </div>
      </section>

      {/* Mempelai */}
      <section className='h-auto relative py-20 px-3'>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Pojokatasframe position="top-right" />
          <Pojokatasframe position="top-left" />
          <TengahFrame position="bottom-center" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={hero2} className='w-90 rounded-sm' alt="mempelai" />
        </div>

        <div className="relative w-full px-5 h-auto ">
          {/* Card Pria */}
          <div className="mt-10 flex flex-col items-start">
            <p className="text-xl font-bold">{pria || "Putra"}</p>
            <p className="text-md">Anak dari {walipria || "Sutejo & Siti"}</p>
            <div className="flex space-x-3 mt-1">
              {medsosPria.map((item, index) => (
                <Medsos key={index} name={item.name} link={item.link} />
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <h1 className='text-5xl'>&</h1>
          </div>

          {/* Card Wanita */}
          <div className="right-0 bottom-0 flex flex-col items-end mt-5">
            <p className="text-xl font-bold">{wanita || "Putri"}</p>
            <p className="text-md">Anak dari {waliwanita || "budi & Ani"}</p>
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
          <hr className='w-xs text-tema-3 border-2' />
          <div className="mt-10">
            <p className='text-5xl'>{hari || "Senin"}</p>
            <div className="flex justify-center items-center space-x-3">
              <h1 className='text-7xl'>{tanggal || "21"}</h1>
              <div className="flex flex-col text-start -space-y-1">
                <p className='text-4xl '>{bulanText}</p>
                <p className='text-4xl '>{tahun || "2027"}</p>
              </div>
            </div>
          </div>

          <img src={gedung} alt="gedung" className='w-40 mt-20' />
          <p className='font-bold text-xl'>{namagedung || "Ballroom"}</p>
          <p>{waktu || "07:00 - Selesai"}</p> {/* ✅ langsung pake waktu gabungan */}
          <p>{alamat || "Jl Sudirman"}</p>

          <div className="flex justify-center mt-8">
            <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18..."
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="mt-10">
            <p>Menuju Momen Bahagia</p>
            <Countdown targetDate={tanggalPernikahan} />
          </div>
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
          <div className="grid grid-cols-2 pt-8 gap-3">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`galeri-${i + 1}`}
                className='w-full h-40 object-cover bg-white rounded-sm'
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
