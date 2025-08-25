import TengahFrame from './components/bg/TengahFrame';
import Pojokatasframe from './components/bg/pojokatas';
import tengah from './page/bgtext.png';
import Countdown from './components/Countdown';
import Medsos from './components/Medsos';
import React from 'react';
import './app.css';
import Ucapan from './components/Ucapan';
import MusicWidget from './components/Music';

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
  alamat,
  medsosPria = [],
  medsosWanita = [],
  tanggalPernikahan,
  cerita
}) => {
  const bulanText = bulan ? monthNames[parseInt(bulan, 10) - 1] : "-";

  return (
    <div className='overflow-hidden body-2 max-w-[430px] mx-auto'>
      {/* Halaman utama */}
      <section className="w-full h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Pojokatasframe position="top-right" />
          <Pojokatasframe position="top-left" />
        </div>

        <div
          className="relative z-50 text-center w-full"
          style={{
            backgroundImage: `url(${tengah})`,
            backgroundSize: '300px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-screen flex flex-col justify-between py-10">
            <h1 className="text-3xl h1">Wedding E-Invitation</h1>
            <h1 className='text-6xl -mt-25 h1'>
              {pria || 'Putra'} <br /> & <br /> {wanita || 'Putri'}
            </h1>
            <h1 className="text-3xl h1">
              {tanggal || '10'} {bulan || 'September'} {tahun || '2020'}
            </h1>
          </div>
        </div>
      </section>

      {/* Bagian doa */}
      <section className='w-full h-auto relative flex flex-col justify-between py-10'>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <TengahFrame position="top-center" />
        </div>

        <div className="text-center px-5 z-50">
          <p className="text-sm">
            <span className='text-3xl font-bold'>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span><br />
            Ya Allah Yang Maha Pengasih dengan ridho-Mu Kau mempertemukan kami dalam suatu ikatan pernikahan suci
          </p>
        </div>

        {/* Card Mempelai */}
        <div className="relative w-full px-5 h-auto">
          {/* Kartu Pria */}
          <div className="mt-10 flex flex-col items-start">
            <img src="" alt="" className="bg-amber-900 w-60 h-60" />
            <p className="text-md">{pria || '-'}</p>
            <p className="text-md">Anak ketiga dari {walipria || '-'}</p>
            <div className="flex space-x-3 mt-1">
              {medsosPria.length > 0 ? (
                medsosPria.map((item, index) => (
                  <Medsos key={index} name={item.name} link={item.link} />
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center my-3">
            <h1 className='text-5xl h1'>&</h1>
          </div>

          {/* Kartu Wanita */}
          <div className="flex flex-col items-end mt-5">
            <img src="" alt="" className="bg-amber-900 w-60 h-60" />
            <p className="text-md">{wanita || '-'}</p>
            <p className="text-md">Anak ketiga dari {waliwanita || '-'}</p>
            <div className="flex space-x-3 mt-1">
              {medsosWanita.length > 0 ? (
                medsosWanita.map((item, index) => (
                  <Medsos key={index} name={item.name} link={item.link} />
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cerita */}
      <section className='h-auto py-10 text-center'>
        <p className='text-4xl font-bold'>Cerita kita</p>
        <p className='cx-10'>{cerita || '-'}</p>
      </section>

      {/* Detail Waktu */}
      <section className="w-full h-screen relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Pojokatasframe position="top-right" />
          <Pojokatasframe position="top-left" />
          <TengahFrame position="bottom-center" />
        </div>

       <div className="relative text-center items-center w-full z-40">
          <p className='text-5xl'>{hari}</p>
          <div className="flex justify-center items-center space-x-3">
            <h1 className='text-7xl h1'>{tanggal}</h1>
            <div className="flex flex-col text-start -space-y-7">
              <p className='text-4xl '>{bulanText}</p> <br />
              <p className='text-4xl '>{tahun}</p>
            </div>
          </div>
        </div>  

        <div className="mt-10 flex flex-col text-center">
          <p className='text-xl'>{alamat || '-'}</p>
          <a href="" className='bg-amber-900 py-1 px-2 text-white inline-block mt-2'>Lihat Peta</a>
        </div>

        <div className="mt-10">
          <p className='text-amber-900'>
            <Countdown targetDate={tanggalPernikahan || ''} />
          </p>
        </div>
      </section>

      {/* Galeri */}
      <section className='justify-center items-center h-screen relative px-5'>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <TengahFrame position="top-center" />
        </div>

        <div className="relative z-50">
          <p className='font-bold text-2xl pt-10 text-center'>Galeri kami</p>
          <div className="grid grid-cols-2 gap-3 pt-8">
            {[...Array(6)].map((_, i) => (
              <img key={i} src="" alt="" className='w-full h-40 object-cover bg-white' />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
