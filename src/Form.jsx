import React, { useState, useEffect } from "react";
import PreviewTema1 from "./components/template/tema1/Preview";
import PreviewTema2 from "./components/template/tema2/Preview";
import PreviewTema3 from "./components/template/tema3/Preview";
import PreviewTema4 from "./components/template/tema4/Preview";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Input from "./components/Input";
import tema1 from "/Tema1.png";
import tema2 from "/Tema2.png";
import tema3 from "/Tema3.png";
import tema4 from "/Tema4.png";
import Swal from "sweetalert2";
import "./App.css";

const Form = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const temaFromUrl = searchParams.get("tema") || "";
  const sourceFromUrl = searchParams.get("source") || "shopee";

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
      setIsInitial(false);
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
      username, catatan, source, pria, wanita, walipria, waliwanita, hari,
      tanggal, bulan, tahun, waktumulai, waktuselesai, alamat, namagedung,
      tanggalPernikahan: targetDate, cerita, tema,
    };

    let progressInterval;
    let bar;

    // Base toast
    let toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      showCloseButton: true,
      timer: undefined, // ga auto-close
    });

    // ⏳ Loading toast
    toast.fire({
      title: "Ngirim data...",
      didOpen: (toastEl) => {
        bar = document.createElement("div");
        bar.style.height = "4px";
        bar.style.background = "#D89A79";
        bar.style.width = "0%";
        bar.style.position = "absolute";
        bar.style.bottom = "0";
        bar.style.left = "0";
        bar.style.right = "0";
        bar.style.margin = "0";
        bar.style.padding = "0";
        bar.style.borderRadius = "0";
        toastEl.appendChild(bar);

        let width = 0;
        progressInterval = setInterval(() => {
          if (width < 90) {
            width += 1;
            bar.style.width = width + "%";
          }
        }, 50);
      },
    });

    try {
      // 🔑 pakai "no-cors" kalau GAS belum support CORS
      await fetch(
        "https://script.google.com/macros/s/AKfycbwgsM2aNzt7E-jiOa3iir7eB0JAEkXmBQflCrwgSV-3xS-rJlir5l4y4EHTemuoi9SlBA/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          mode: "no-cors", // <– tambahin lagi kalau GAS belum diubah
        }
      );

      // ✅ stop progress
      clearInterval(progressInterval);
      if (bar) bar.style.width = "100%";

      // 🎉 anggap sukses (karena no-cors ga bisa cek real response)
      toast.fire({
        title: "Data terkirim",
      });
    } catch (err) {
      console.error("Fetch error:", err);

      clearInterval(progressInterval);
      if (bar) bar.style.width = "100%";

      toast.fire({
        title: "Gagal ngirim",
      });
    }
  };

  const renderPreview = () => {
    const props = { pria, walipria, wanita, waliwanita, tanggal, bulan, tahun, hari, waktumulai, waktuselesai, alamat, namagedung, tanggalPernikahan: targetDate, cerita };

    switch (tema) {
      case "Midnight Wave": return <PreviewTema1 {...props} />;
      case "Velvet Cream": return <PreviewTema2 {...props} />;
      case "Emerald Grove": return <PreviewTema3 {...props} />;
      case "Choco Drift": return <PreviewTema4 {...props} />;
      default:
        return (
          <div className="p-6 text-center text-gray-700 font-semibold 
            bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 
            rounded-xl shadow-md animate-pulse h-screen flex items-center justify-center">
            🎨 Silakan pilih&nbsp;<span className="underline decoration-wavy"> tema</span>
          </div>
        );
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{ name: "Midnight Wave", preview: tema1 }, { name: "Velvet Cream", preview: tema2 }, { name: "Emerald Grove", preview: tema3 }, { name: "Choco Drift", preview: tema4 }].map((option) => {
            const isSelected = tema === option.name;
            return (
              <motion.div
                key={option.name}
                onClick={() => setTema(option.name)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={`cursor-pointer border-2 rounded-xl overflow-hidden shadow-md flex-1 transition 
                  ${isSelected ? "border-[#D89A79]" : "border-gray-200"}`}
              >
                <img src={option.preview} alt={option.name} className="h-50 object-cover mx-auto" />
                <div className={`p-3 text-center font-semibold ${isSelected ? "bg-[#D89A79] text-white" : "bg-gray-50 text-gray-700"}`}>
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
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Info Pesanan</h2>
          <label className="block font-medium">Pemesanan Dari</label>
          <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full border p-3 rounded-xl border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]">
            <option value="web">🌐 Website</option>
            <option value="shopee">🛒 Shopee</option>
            <option value="lazada">📦 Lazada</option>
            <option value="tokopedia">🐸 Tokopedia</option>
          </select>

          {source !== "web" && (
            <Input
              type="text"
              placeholder={`Username ${source}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D89A79]"
            />

          )}
          <textarea placeholder="Catatan (opsional)" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]" rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)}required></textarea>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Data Mempelai</h2>
          <Input type="text" placeholder="Nama Pria" className="w-full border p-3 rounded-xl" value={pria} onChange={(e) => setPria(e.target.value)} />
          <Input type="text" placeholder="Nama Wanita" className="w-full border p-3 rounded-xl" value={wanita} onChange={(e) => setWanita(e.target.value)} />
          <Input type="text" placeholder="Wali Pria" className="w-full border p-3 rounded-xl" value={walipria} onChange={(e) => setWaliPria(e.target.value)} />
          <Input type="text" placeholder="Wali Wanita" className="w-full border p-3 rounded-xl" value={waliwanita} onChange={(e) => setWaliWanita(e.target.value)} />
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Detail Acara</h2>
          <Input type="text" placeholder="Hari" className="w-full border p-3 rounded-xl" value={hari} onChange={(e) => setHari(e.target.value)} />
          <Input type="date" className="w-full border p-3 rounded-xl"
            onChange={(e) => {
              const dateObj = new Date(e.target.value);
              setTanggal(String(dateObj.getDate()).padStart(2, "0"));
              setBulan(String(dateObj.getMonth() + 1).padStart(2, "0"));
              setTahun(String(dateObj.getFullYear()));
            }}
          />
          <Input type="time" className="w-full border p-3 rounded-xl" value={waktumulai} onChange={(e) => setWaktuMulai(e.target.value)} />
          <Input type="time" className="w-full border p-3 rounded-xl" value={waktuselesai} onChange={(e) => setWaktuSelesai(e.target.value)} />
          <Input type="text" placeholder="Nama Gedung" className="w-full border p-3 rounded-xl" value={namagedung} onChange={(e) => setNamaGedung(e.target.value)} />
          <textarea placeholder="Alamat" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]" value={alamat} onChange={(e) => setAlamat(e.target.value)} required></textarea>
          <textarea placeholder="Cerita" className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]" value={cerita} onChange={(e) => setCerita(e.target.value)} required></textarea>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div className="space-y-4">
          <div className="flex justify-center items-center md:hidden w-full mb-6">
            {renderPhonePreview()}
          </div>
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Preview & Kirim</h2>
          <p className="text-gray-600">Lihat preview undangan sebelum dikirim</p>
          <button type="submit" className="w-full py-3 bg-[#D89A79] text-white font-semibold rounded-xl hover:bg-[#b97d61] transition">Kirim</button>
        </div>
      );
    }
  };

  const isStepValid = () => {
    if (step === 1) return tema.trim() !== "";
    if (step === 2) return source === "web" || username.trim() !== "";
    if (step === 3) return pria.trim() !== "" && wanita.trim() !== "";
    if (step === 4) return hari.trim() !== "" && tanggal && bulan && tahun && waktumulai.trim() !== "" && alamat.trim() !== "";
    return true;
  };

  const renderPhonePreview = () => (
    <motion.div className="relative w-[390px] h-screen bg-black rounded-[2rem] p-4 shadow-2xl flex justify-center items-center"
      animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity }}>
      <div className="bg-white w-full h-full rounded-[1.5rem] overflow-hidden scroll-y-hidden">{renderPreview()}</div>
    </motion.div>
  );

  return (
    <div className="mx-auto">
      <title>Buat Undangan | KanggoWeb</title>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex justify-center items-center md:w-1/2">{renderPhonePreview()}</div>
        <motion.div
          className="fixed bottom-0 right-0 w-full md:w-1/2
             bg-white/90 p-8 border border-[#D89A79]/30 
             rounded-3xl shadow-xl 
             max-h-screen scroll-y-hidden"
        >
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm transition ${step >= s ? "bg-[#D89A79] text-white border-[#D89A79]" : "bg-white text-gray-500 border-gray-300"}`}>{s}</div>
                {s < 5 && <div className={`flex-1 h-[2px] mx-2 ${step > s ? "bg-[#D89A79]" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between pt-6">
              {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 bg-gray-100 rounded-full">Back</button>}
              {step < 5 && <button type="button" onClick={() => setStep(step + 1)} disabled={!isStepValid()} className={`px-8 py-3 rounded-full font-semibold ${isStepValid() ? "bg-[#D89A79] text-white hover:bg-[#b97d61]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>Next</button>}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
