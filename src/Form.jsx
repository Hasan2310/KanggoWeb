import React, { useState, useEffect } from "react";
import PreviewTema3 from "./components/template/tema3/Preview";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Input from "./components/Input";
import tema3 from "/Tema3.png";
import Swal from "sweetalert2";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./App.css";

/* ======================= REUSABLE INPUT DENGAN INFO ======================= */
const InputWithInfo = ({ placeholder, value, setValue, infoType, ...props }) => {
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    let timer;
    if (showExample) {
      timer = setTimeout(() => {
        setShowExample(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showExample]);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D89A79] pr-10 ${props.className || ""}`}
      />

      {/* Icon info */}
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D89A79]"
        onClick={() => setShowExample(true)}
      >
        <AiOutlineInfoCircle size={20} />
      </button>

      {/* Popover contoh */}
      <AnimatePresence>
        {showExample && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-56 rounded-lg border bg-white shadow-lg p-3 text-sm z-50"
          >
            <p className="font-semibold mb-2">Contoh {placeholder}</p>
            {infoType === "username" ? (
              <img src="/shopee.jpeg" alt="contoh username" className="rounded-md border" />
            ) : infoType === "waliPria" ? (
              <p className="text-gray-700">Sejejo & Siti</p>
            ) : infoType === "waliWanita" ? (
              <p className="text-gray-700">Budi & Ani</p>
            ) : infoType === "waktu" ? (
              <p className="text-gray-700">10:00 - Selesai</p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ======================= FORM ======================= */
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
  const [waliPria, setWaliPria] = useState("");
  const [waliWanita, setWaliWanita] = useState("");

  // Detail Acara
  const [hari, setHari] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [waktu, setWaktu] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaGedung, setNamaGedung] = useState("");
  const [cerita, setCerita] = useState("");

  const targetDate =
    tanggal && bulan && tahun && waktu
      ? `${tahun}-${bulan}-${tanggal}T${waktu.split(" - ")[0]}:00`
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
    username,
    catatan,
    source,
    pria,
    wanita,
    waliPria,
    waliWanita,
    hari,
    tanggal,
    bulan,
    tahun,
    waktu,
    alamat,
    namaGedung,
    tanggalPernikahan: targetDate,
    cerita,
    tema,
    status: "Pending",
  };

  let progressInterval;
  let bar;

  let toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    showCloseButton: true,
    timer: undefined,
  });

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
    const res = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    clearInterval(progressInterval);
    if (bar) bar.style.width = "100%";

    if (result?.status === "success") {
      Swal.fire({
        title: "Data terkirim 🎉",
        text: `ID Pesanan: ${result.id}`,
        icon: "success",
        confirmButtonText: "Salin Pesan",
      }).then(() => {
        const pesan = `
Halo Admin 👋

Saya *${data.pria}* & *${data.wanita}* ingin konfirmasi pesanan dengan detail berikut:

📌 *ID Pesanan:* ${result.id}
👤 *Username:* ${data.username || "-"}
📝 *Catatan:* ${data.catatan || "-"}
📖 *Source:* ${data.source || "-"}

👰 *Mempelai Wanita:* ${data.wanita || "-"}
🤵 *Mempelai Pria:* ${data.pria || "-"}
👩‍🦳 *Wali Wanita:* ${data.waliWanita || "-"}
👨‍🦳 *Wali Pria:* ${data.waliPria || "-"}

📅 *Tanggal:* ${data.hari || "-"}, ${data.tanggal || "-"} ${data.bulan || "-"} ${data.tahun || "-"}
🕒 *Waktu:* ${data.waktu || "-"}
📍 *Alamat:* ${data.alamat || "-"}
🏢 *Gedung:* ${data.namaGedung || "-"}

💍 *Tanggal Pernikahan:* ${data.tanggalPernikahan || "-"}
🎨 *Tema:* ${data.tema || "-"}
📚 *Cerita:* ${data.cerita || "-"}

_Status Pesanan: ${result.status}_
`;

        navigator.clipboard.writeText(pesan).then(() => {
          Swal.fire({
            toast: true,
            position: "top",
            icon: "success",
            title: "Pesan berhasil disalin ke clipboard ✨",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        });
      });
    } else {
      throw new Error("Server error");
    }
  } catch (err) {
    console.error("Fetch error:", err);

    clearInterval(progressInterval);
    if (bar) bar.style.width = "100%";

    Swal.fire({
      title: "Gagal ngirim 😢",
      text: "Coba cek koneksi internet atau hubungi admin.",
      icon: "error",
    });
  }
};


  const renderPreview = () => {
    const props = {
      pria,
      waliPria,
      wanita,
      waliWanita,
      tanggal,
      bulan,
      tahun,
      hari,
      waktu,
      alamat,
      namaGedung,
      tanggalPernikahan: targetDate,
      cerita,
    };

    switch (tema) {
      case "Emerald Grove":
        return <PreviewTema3 {...props} />;
      default:
        return (
          <div className="p-6 text-center text-gray-700 font-semibold 
            bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 
            rounded-xl shadow-md animate-pulse h-screen flex items-center justify-center">
            🎨 Silakan pilih <span className="underline decoration-wavy">tema</span>
          </div>
        );
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{ name: "Emerald Grove", preview: tema3 }].map((option) => {
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
                <div
                  className={`p-3 text-center font-semibold ${isSelected ? "bg-[#D89A79] text-white" : "bg-gray-50 text-gray-700"
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
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
            Info Pesanan
          </h2>
          <label className="block font-medium">Pemesanan Dari</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border p-3 rounded-xl border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"
          >
            <option value="shopee">🛒 Shopee</option>
            <option value="lazada">📦 Lazada</option>
            <option value="tokopedia">🐸 Tokopedia</option>
            <option value="web">🌐 Website</option>
          </select>

          {source !== "web" && (
            <InputWithInfo
              placeholder={`Username ${source}`}
              value={username}
              setValue={setUsername}
              infoType="username"
            />
          )}

          <textarea
            placeholder="Catatan (opsional)"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40"
            rows={3}
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          ></textarea>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
            Data Mempelai
          </h2>
          <Input
            type="text"
            placeholder="Nama Pria"
            className="w-full border p-3 rounded-xl"
            value={pria}
            onChange={(e) => setPria(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Nama Wanita"
            className="w-full border p-3 rounded-xl"
            value={wanita}
            onChange={(e) => setWanita(e.target.value)}
          />
          <InputWithInfo
            placeholder="Wali Pria"
            value={waliPria}
            setValue={setWaliPria}
            infoType="waliPria"
          />
          <InputWithInfo
            placeholder="Wali Wanita"
            value={waliWanita}
            setValue={setWaliWanita}
            infoType="waliWanita"
          />
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
            Detail Acara
          </h2>
          <Input
            type="date"
            className="w-full border p-3 rounded-xl"
            onChange={(e) => {
              const dateObj = new Date(e.target.value);
              const options = { weekday: "long" };
              const hariStr = dateObj.toLocaleDateString("id-ID", options);

              setHari(hariStr);
              setTanggal(String(dateObj.getDate()).padStart(2, "0"));
              setBulan(String(dateObj.getMonth() + 1).padStart(2, "0"));
              setTahun(String(dateObj.getFullYear()));
            }}
          />
          <Input
            type="text"
            placeholder="Hari"
            className="w-full border p-3 rounded-xl"
            value={hari}
            readOnly
          />
          <InputWithInfo
            placeholder="Waktu"
            value={waktu}
            setValue={setWaktu}
            infoType="waktu"
          />
          <Input
            type="text"
            placeholder="Nama Gedung"
            className="w-full border p-3 rounded-xl"
            value={namaGedung}
            onChange={(e) => setNamaGedung(e.target.value)}
          />
          <textarea
            placeholder="Alamat"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          ></textarea>
          <textarea
            placeholder="Cerita"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"
            value={cerita}
            onChange={(e) => setCerita(e.target.value)}
            required
          ></textarea>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div className="space-y-4">
          <div className="flex justify-center items-center md:hidden w-full mb-6">
            {renderPhonePreview()}
          </div>
          <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">
            Preview & Kirim
          </h2>
          <p className="text-gray-600">Lihat preview undangan sebelum dikirim</p>
          <button
            type="submit"
            className="w-full py-3 bg-[#D89A79] text-white font-semibold rounded-xl hover:bg-[#b97d61] transition"
          >
            Kirim
          </button>
        </div>
      );
    }
  };

  const isStepValid = () => {
    if (step === 1) return tema.trim() !== "";
    if (step === 2) return source === "web" || username.trim() !== "";
    if (step === 3) return pria.trim() !== "" && wanita.trim() !== "";
    if (step === 4)
      return hari.trim() !== "" && tanggal && bulan && tahun && waktu.trim() !== "" && alamat.trim() !== "";
    return true;
  };

  const renderPhonePreview = () => (
    <motion.div
      className="relative w-[390px] h-screen bg-black rounded-[2rem] p-4 shadow-2xl flex justify-center items-center"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <div className="bg-white w-full h-full rounded-[1.5rem] scroll-y-hidden">
        {renderPreview()}
      </div>
    </motion.div>
  );

  return (
    <div className="mx-auto">
      <title>Buat Undangan | KanggoWeb</title>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex justify-center items-center md:w-1/2">
          {renderPhonePreview()}
        </div>
        <motion.div
          className="fixed bottom-0 right-0 w-full md:w-1/2 bg-white/90 p-8 border border-[#D89A79]/30 rounded-3xl shadow-xl max-h-screen scroll-y-hidden">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8 mt-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm transition ${step >= s
                    ? "bg-[#D89A79] text-white border-[#D89A79]"
                    : "bg-white text-gray-500 border-gray-300"
                    }`}
                >
                  {s}
                </div>
                {s < 5 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 ${step > s ? "bg-[#D89A79]" : "bg-gray-300"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Step */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}

            {/* Tombol Navigasi */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  ⬅ Kembali
                </button>
              )}
              {step < 5 && (
                <button
                  type="button"
                  onClick={() => {
                    if (isStepValid()) {
                      setStep(step + 1);
                    } else {
                      Swal.fire({
                        title: "Isi dulu field yang wajib ⚠️",
                        icon: "warning",
                        confirmButtonText: "Oke",
                      });
                    }
                  }}
                  className="ml-auto px-6 py-2 bg-[#D89A79] text-white font-semibold rounded-xl hover:bg-[#b97d61] transition"
                >
                  Lanjut ➡
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
