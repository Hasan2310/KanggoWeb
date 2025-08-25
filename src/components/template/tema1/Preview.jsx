import React from "react";
import PojokKananFrame from "./components/bg/PojokKananFrame";
import BintangFrame from "./components/bg/BintangFrame";
import GarisFrame from "./components/bg/GarisFrame";
import Countdown from "./components/Countdown";
import './App.css'

function Preview({
  pria,
  walipria,
  waliwanita,
  wanita,
  tanggal,
  hari,
  waktumulai,
  alamat,
  tanggalPernikahan,
  cerita,
}) {
  return (
    <div className="body-1 w-[360px] mx-auto">
      {/* SECTION 1 */}
      <section className="w-[360px] h-screen relative flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <PojokKananFrame position="top-right" />
          <PojokKananFrame position="bottom-left" />
          <BintangFrame isBottom={true} />
          <BintangFrame isBottom={false} />
          <GarisFrame position="top-left" />
          <GarisFrame position="bottom-right" />
        </div>

        <div className="relative z-40 flex flex-col justify-between items-center h-full py-10">
          <h1 className="text-2xl h1">Wedding E-Invitation</h1>
          <h1 className="text-4xl leading-tight text-center h1">
            {pria || 'Pria'} <br /> & <br /> {wanita || 'Wanita'}
          </h1>
          <h1 className="text-2xl h1">{tanggal}</h1>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="w-[360px] min-h-screen relative flex flex-col items-center justify-center py-10 text-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <BintangFrame isBottom={true} />
          <BintangFrame isBottom={false} />
        </div>

        <div className="relative z-40 space-y-6 max-w-[320px]">
          <p className="text-sm px-4">
            <span className="text-xl font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <br />
            Ya Allah Yang Maha Pengasih, dengan ridho-Mu Kau mempertemukan kami dalam suatu ikatan pernikahan suci
          </p>

          <div>
            <img src="" alt="Pria" className="bg-white w-32 h-32 rounded-full mx-auto" />
            <p className="mt-3 text-sm">{pria}</p>
            <p className="text-sm">Anak dari {walipria || "-"}</p>
          </div>

          <h1 className="text-2xl font-bold italic h1">&</h1>

          <div>
            <img src="" alt="Wanita" className="bg-white w-32 h-32 rounded-full mx-auto" />
            <p className="mt-3 text-sm">{wanita}</p>
            <p className="text-sm">Anak dari {waliwanita || "-"}</p>
          </div>
        </div>
      </section>

      {/* CERITA */}
      <section className="w-[360px] h-auto relative flex flex-col items-center justify-center py-8 text-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <BintangFrame isBottom={false} />
        </div>
        <div className="relative z-40 max-w-[320px] px-4 space-y-4">
          <img className="w-full max-w-[300px] mx-auto bg-white" alt="Cerita" />
          <p>{cerita || "Cerita belum diisi nih..."}</p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="w-[360px] min-h-screen relative flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <BintangFrame isBottom={false} />
          <BintangFrame isBottom={true} />
        </div>

        <div className="relative z-40 space-y-8">
          <div>
            <h1 className="text-3xl h1">{hari || "Hari belum diisi"}</h1>
            <p className="text-xl italic h1">{tanggal || "Tanggal belum diisi"}</p>
            <p className="text-sm italic h1">{waktumulai || "Waktu belum diisi"}</p>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl h1">Menuju momen bahagia</h1>
            <Countdown targetDate={tanggalPernikahan} />
            <div className="bg-white w-[280px] h-[150px] mx-auto"></div>
            <p>{alamat || "Alamat belum diisi"}</p>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="w-[360px] relative py-8 text-center">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <PojokKananFrame position="top-right" />
          <BintangFrame isBottom={true} />
          <BintangFrame isBottom={false} />
          <GarisFrame position="top-left" />
          <GarisFrame position="bottom-right" />
        </div>

        <div className="relative z-40 px-4">
          <p className="font-bold text-xl">Galeri kami</p>
          <div className="grid grid-cols-2 gap-3 pt-6">
            <img src="" alt="gallery1" className="w-full h-32 object-cover bg-white" />
            <img src="" alt="gallery2" className="w-full h-32 object-cover bg-white" />
            <img src="" alt="gallery3" className="w-full h-32 object-cover bg-white" />
            <img src="" alt="gallery4" className="w-full h-32 object-cover bg-white" />
            <img src="" alt="gallery5" className="w-full h-32 object-cover bg-white" />
            <img src="" alt="gallery6" className="w-full h-32 object-cover bg-white" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Preview;
