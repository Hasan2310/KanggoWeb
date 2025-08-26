import React, { useState, useEffect } from "react";
import PreviewTema1 from "./components/template/tema1/Preview";
import PreviewTema2 from "./components/template/tema2/Preview";
import PreviewTema3 from "./components/template/tema3/Preview";
import PreviewTema4 from "./components/template/tema4/Preview";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./components/Input";
import tema1 from "/Tema1.png";
import tema2 from "/Tema2.png";
import tema3 from "/Tema3.png";
import tema4 from "/Tema4.png";
import "./App.css";

const Form = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const temaFromUrl = searchParams.get("tema") || "";
  const sourceFromUrl = searchParams.get("source") || "web";

  const [step, setStep] = useState(1);
  const [tema, setTema] = useState(temaFromUrl);
  const [source, setSource] = useState(sourceFromUrl);
  const [isInitial, setIsInitial] = useState(true);

  // Info Pesanan
  const [username, setUsername] = useState("");
  const [catatan, setCatatan] = useState("");

  // Data Mempelai
  const [pria, setPria] = useState("");
  const [wanita, setWanita] = useState("");
  const [walipria, setWaliPria] = useState("");
  const [waliwanita, setWaliWanita] = useState("");

  // Detail Acara
  const [hari, setHari] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [waktumulai, setWaktuMulai] = useState("");
  const [waktuselesai, setWaktuSelesai] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namagedung, setNamaGedung] = useState("");
  const [cerita, setCerita] = useState("");

  const targetDate =
    tanggal && bulan && tahun && waktumulai
      ? `${tahun}-${bulan}-${tanggal}T${waktumulai}:00`
      : "";

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false); // biarin param awal dari deeplink
      return;
    }

    const newParams = new URLSearchParams();
    newParams.set("tema", tema);
    newParams.set("source", source);
    setSearchParams(newParams);
  }, [tema, source, setSearchParams, isInitial]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      catatan,
      source,
      pria,
      wanita,
      walipria,
      waliwanita,
      hari,
      tanggal,
      bulan,
      tahun,
      waktumulai,
      waktuselesai,
      alamat,
      namagedung,
      tanggalPernikahan: targetDate,
      cerita,
      tema,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwgsM2aNzt7E-jiOa3iir7eB0JAEkXmBQflCrwgSV-3xS-rJlir5l4y4EHTemuoi9SlBA/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
        }
      );

      let pesanWA = `
Halo kak, saya pesan undangan online 🎉

👤 ${pria} & ${wanita}
📅 ${hari}, ${tanggal}-${bulan}-${tahun}
⏰ ${waktumulai}
📍 ${alamat}
Tema: ${tema}
Source: ${source.toUpperCase()}
Username: ${username}
${catatan ? `Catatan: ${catatan}` : ""}
      `.trim();

      const pesanEncoded = encodeURIComponent(pesanWA);
      const nomorWA = "6285215128586";

      if (source === "web") {
        window.location.href = `https://wa.me/${nomorWA}?text=${pesanEncoded}`;
      } else {
        alert("✅ Data berhasil dikirim ke Google Sheets!");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Gagal mengirim data.");
    }
  };

  const renderPreview = () => {
    const props = {
      pria,
      walipria,
      wanita,
      waliwanita,
      tanggal,
      bulan,
      tahun,
      hari,
      waktumulai,
      waktuselesai,
      alamat,
      namagedung,
      tanggalPernikahan: targetDate,
      cerita,
    };

    switch (tema) {
      case "Midnight Wave":
        return <PreviewTema1 {...props} />;
      case "Velvet Cream":
        return <PreviewTema2 {...props} />;
      case "Emerald Grove":
        return <PreviewTema3 {...props} />;
      case "Choco Drift":
        return <PreviewTema4 {...props} />;
      default:
        return (
          <div className="p-6 text-center text-gray-700 font-semibold 
                bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 
                rounded-xl shadow-md animate-pulse h-[90vh] flex items-center justify-center">
            <span className="text-lg md:text-xl tracking-wide">
              🎨 Silakan pilih <span className="underline decoration-wavy">tema</span> terlebih dulu!
            </span>
          </div>

        );
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { id: 1, name: "Midnight Wave", preview: tema1 },
            { id: 2, name: "Velvet Cream", preview: tema2 },
            { id: 3, name: "Emerald Grove", preview: tema3 },
            { id: 4, name: "Choco Drift", preview: tema4 },
          ].map((option) => {
            const isSelected = tema === option.name;
            return (
              <motion.div
                key={option.name}
                onClick={() => setTema(option.name)}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 10px 24px rgba(216,154,121,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className={`cursor-pointer border-2 rounded-xl overflow-hidden shadow-md transition-all duration-300 flex-1 ${isSelected ? "border-[#D89A79]" : "border-gray-200"
                  }`}
              >
                <img
                  src={option.preview}
                  alt={option.name}
                  className="h-50 object-cover flex mx-auto"
                />
                <div
                  className={`p-3 center font-semibold ${isSelected
                    ? "bg-[#D89A79] text-white"
                    : "bg-gray-50 text-gray-700"
                    }`}
                >
                  {option.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-8">
          {/* Grup 1: Info Pesanan */}
          {/* Grup 1: Info Pesanan */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
              Info Pesanan
            </h2>

            {/* Pilihan Sumber Pemesanan */}
            <label className="block font-medium text-gray-700">Pemesanan Dari</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
      focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            >
              <option value="web">Website</option>
              <option value="shopee">Shopee</option>
              <option value="lazada">Lazada</option>
              <option value="tokopedia">Tokopedia</option>
              <option value="lainnya">Lainnya</option>
            </select>

            <Input
              type="text"
              placeholder={`Username ${source}`}
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
      focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <textarea
              placeholder="Catatan (opsional)"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
      focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>


          {/* Grup 2: Data Mempelai */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
              Data Mempelai
            </h2>
            <input
              type="text"
              placeholder="Nama Pria"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
              value={pria}
              onChange={(e) => setPria(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nama Wanita"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
              value={wanita}
              onChange={(e) => setWanita(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Wali Pria"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
              value={walipria}
              onChange={(e) => setWaliPria(e.target.value)}
            />
            <input
              type="text"
              placeholder="Wali Wanita"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
              value={waliwanita}
              onChange={(e) => setWaliWanita(e.target.value)}
            />
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
            Detail Acara
          </h2>
          <input
            type="text"
            placeholder="Hari"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            value={hari}
            onChange={(e) => setHari(e.target.value)}
          />
          <input
            type="date"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            onChange={(e) => {
              const dateVal = e.target.value;
              if (dateVal) {
                const dateObj = new Date(dateVal);
                setTanggal(String(dateObj.getDate()).padStart(2, "0"));
                setBulan(String(dateObj.getMonth() + 1).padStart(2, "0"));
                setTahun(String(dateObj.getFullYear()));
              }
            }}
            required
          />
          <input
            type="time"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            value={waktumulai}
            onChange={(e) => setWaktuMulai(e.target.value)}
          />
          <input
            type="time"
            placeholder="Waktu Selesai"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            value={waktuselesai}
            onChange={(e) => setWaktuSelesai(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nama Gedung"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            value={namagedung}
            onChange={(e) => setNamaGedung(e.target.value)}
          />
          <textarea
            placeholder="Alamat"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
          <textarea
            placeholder="Cerita"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D89A79]/40 focus:border-[#D89A79] transition"
            value={cerita}
            onChange={(e) => setCerita(e.target.value)}
          />
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
            Preview
          </h2>
          <p className="text-gray-600">
            Lihat preview di bawah (mobile) atau kiri (desktop)
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-[#D89A79] text-white text-lg font-semibold rounded-xl shadow-md hover:bg-[#b97d61] hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Kirim
          </button>

          <div className="flex justify-center items-center md:hidden w-full mb-6">
            {renderPhonePreview()}
          </div>
        </div>
      );
    }
  };

  // ✅ Validasi Step
  const isStepValid = () => {
    if (step === 1) return tema.trim() !== "";
    if (step === 2) return username.trim() !== "" && pria.trim() !== "" && wanita.trim() !== "";
    if (step === 3) return hari.trim() !== "" && tanggal && bulan && tahun && waktumulai.trim() !== "" && alamat.trim() !== "";
    return true;
  };

  const renderPhonePreview = () => (
    <motion.div
      className="relative w-[390px] h-screen bg-black rounded-[2rem] p-4 shadow-2xl flex justify-center items-center"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-b-xl flex items-center justify-center z-50">
        <span className="text-[8px] text-white opacity-60">by KanggoWeb</span>
      </div>
      <div className="bg-white w-full h-full rounded-[1.5rem] overflow-hidden scroll-y-hidden">
        {renderPreview()}
      </div>
    </motion.div>
  );

  return (
    <div className="mx-auto">
      <title>Buat Undangan | KanggoWeb</title>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex justify-center items-center md:w-1/2 w-full">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPhonePreview()}
          </motion.div>
        </div>

        {/* Form */}
        <motion.div className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm p-10 border border-[#D89A79]/30 rounded-3xl shadow-xl h-auto self-end scroll-y-hidden transition-all duration-300 hover:shadow-[#D89A79]/50 mx-auto md:mt-0 mt-10" >
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm transition ${step >= s ? "bg-[#D89A79] text-white border-[#D89A79]" : "bg-white text-gray-500 border-gray-300"}`}>{s}</div>
                {s < 4 && <div className={`flex-1 h-[2px] mx-2 transition ${step > s ? "bg-[#D89A79]" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -16 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 bg-gray-100/80 text-gray-700 rounded-full shadow-sm hover:bg-gray-200/90 active:scale-95 transition-all duration-200 font-medium">Back</button>}
              {step < 4 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid()}
                  className={`px-8 py-3 font-semibold rounded-full shadow-md transition-all duration-300
                    ${isStepValid()
                      ? "bg-[#D89A79] text-white hover:bg-[#b97d61] hover:scale-105 active:scale-95"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Form;

