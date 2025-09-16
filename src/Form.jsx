import PreviewTema3 from "./components/template/tema3/Preview";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import tema3 from "/Tema3.png";
import Swal from "sweetalert2";
import "./App.css";

/* ======================= REUSABLE INPUT DENGAN INFO ======================= */
const InputWithInfo = ({ placeholder, value, setValue, infoType, source, ...props }) => {
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

  // mapping gambar per source
  const sourceImg = {
    olx: "/olx.jpeg",
    // tokopedia: "/tokopedia.jpeg",
    // web: "/web.jpeg",
  };

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
              <img
                src={sourceImg[source] || "/default.jpeg"}
                alt={`contoh username ${source}`}
                className="rounded-md border"
              />
            ) : infoType === "walipria" ? (
              <p className="text-gray-700">Sejejo & Siti</p>
            ) : infoType === "waliwanita" ? (
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
  const [walipria, setWalipria] = useState("");
  const [waliwanita, setWaliwanita] = useState("");

  // Detail Acara
  const [hari, setHari] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [waktu, setWaktu] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namagedung, setNamagedung] = useState("");
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

  /* ======================= HANDLE SUBMIT ======================= */
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      waktu,
      alamat,
      namagedung,
      tanggalPernikahan: targetDate,
      cerita,
      tema,
      status: "Pending",
    };

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result?.status === "success") {
        Swal.fire({
          title: "Data terkirim 🎉",
          html: `Silakan salin pesan ini untuk konfirmasi ya ✨ <br><br>
🆔 <b>ID Pesanan:</b> ${result.id} <br><br>
Setelah itu, kirimkan pesan ini ke admin lewat aplikasi yang dipesan 
(<i>OlX</i>) <br>
dan jangan lupa sertakan juga foto pernikahanmu 📸💍`,
          confirmButtonText: "Salin Pesan",
          allowOutsideClick: false,
          confirmButtonColor: "#D89A79",
        }).then(() => {
          const pesan = `
Halo Admin 👋

Saya ${data.pria} & ${data.wanita} ingin konfirmasi pesanan dengan detail berikut:

📌 ID Pesanan: ${result.id}
👤 Username: ${data.username || "-"}
📝 Catatan: ${data.catatan || "-"}
📖 Source: ${data.source || "-"}

👰 Mempelai Wanita: ${data.wanita || "-"}
🤵 Mempelai Pria: ${data.pria || "-"}
👩‍🦳 Wali Wanita: ${data.waliwanita || "-"}
👨‍🦳 Wali Pria: ${data.walipria || "-"}

📅 Tanggal: ${data.hari || "-"}, ${data.tanggal || "-"} ${data.bulan || "-"} ${data.tahun || "-"}
🕒 Waktu: ${data.waktu || "-"}
📍 Alamat: ${data.alamat || "-"}
🏢 Gedung: ${data.namagedung || "-"}

💍 Tanggal Pernikahan: ${data.tanggalPernikahan || "-"}
🎨 Tema: ${data.tema || "-"}
📚 Cerita: ${data.cerita || "-"}

Status Pesanan: ${result.status}
`;

          navigator.clipboard.writeText(pesan).then(() => {
            Swal.fire({
              toast: true,
              position: "top",
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

      Swal.fire({
        title: "Gagal ngirim 😢",
        text: "Coba cek koneksi internet atau hubungi admin.",
        confirmButtonColor: "#D89A79",
      });
    } finally {
      setIsLoading(false); // tombol aktif lagi setelah selesai
    }
  };

  /* ======================= STEP ANIMATION ======================= */
  const stepVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
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
      waktu,
      alamat,
      namagedung,
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

  const renderStep = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={stepVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-6"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{ name: "Emerald Grove", preview: tema3 }].map((option) => {
              const isSelected = tema === option.name;
              return (
                <motion.div
                  key={option.name}
                  onClick={() => setTema(option.name)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Info Pesanan</h2>
            <label className="block font-medium">Pemesanan Dari</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border p-3 rounded-xl border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"
            >
              <option value="web">🌐 Website</option>
              <option value="olx">📢 OLX</option>
              {/* <option value="tokopedia">🐸 Tokopedia</option> */}
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
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Data Mempelai</h2>
            <Input type="text" placeholder="Nama Pria" className="w-full border p-3 rounded-xl" value={pria} onChange={(e) => setPria(e.target.value)} />
            <Input type="text" placeholder="Nama Wanita" className="w-full border p-3 rounded-xl" value={wanita} onChange={(e) => setWanita(e.target.value)} />
            <InputWithInfo placeholder="Wali Pria" value={walipria} setValue={setWalipria} infoType="walipria" />
            <InputWithInfo placeholder="Wali Wanita" value={waliwanita} setValue={setWaliwanita} infoType="waliwanita" />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Detail Acara</h2>
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
            <Input type="text" placeholder="Hari" className="w-full border p-3 rounded-xl" value={hari} readOnly />
            <InputWithInfo placeholder="Waktu" value={waktu} setValue={setWaktu} infoType="waktu" />
            <Input type="text" placeholder="Nama Gedung" className="w-full border p-3 rounded-xl" value={namagedung} onChange={(e) => setNamagedung(e.target.value)} />
            <textarea
              placeholder="Alamat"
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            ></textarea>
            {/* <textarea
              placeholder="Cerita"
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"
              value={cerita}
              onChange={(e) => setCerita(e.target.value)}
              required
            ></textarea> */}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="flex justify-center items-center md:hidden w-full mb-6">
              {renderPhonePreview()}
            </div>
            <h2 className="text-xl font-bold pb-2 border-b-2 border-[#D89A79]/30">Preview & Kirim</h2>
            <p className="text-gray-600">Lihat preview undangan sebelum dikirim</p>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold transition ${isLoading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#D89A79] hover:bg-[#b97d61] text-white"
                }`}
            >
              {isLoading ? "Mengirim..." : "Kirim"}
            </button>

          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const isStepValid = () => {
    if (step === 1) return tema.trim() !== "";
    if (step === 2) return source === "web" || username.trim() !== "";
    if (step === 3) return pria.trim() !== "" && wanita.trim() !== "";
    if (step === 4) return hari.trim() !== "" && tanggal && bulan && tahun && waktu.trim() !== "" && alamat.trim() !== "";
    return true;
  };

  const renderPhonePreview = () => (
    <motion.div
      className="relative w-[390px] h-screen bg-black rounded-[3rem] p-4 
               shadow-[0_20px_50px_rgba(0,0,0,0.7)] 
               flex justify-center items-center border-4 border-black"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      {/* Notch */}
      <div className="absolute top-2 w-32 h-6 bg-black rounded-b-3xl flex justify-center items-center z-50 shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
        <div className="w-10 h-2 bg-gray-800 rounded-full" /> {/* speaker */}
      </div>

      {/* Tombol samping kiri */}
      <div className="absolute left-[-6px] top-32 w-1 h-16 bg-gray-700 rounded-r-lg shadow-[2px_0_5px_rgba(0,0,0,0.5)]" />
      <div className="absolute left-[-6px] top-56 w-1 h-10 bg-gray-700 rounded-r-lg shadow-[2px_0_5px_rgba(0,0,0,0.5)]" />

      {/* Tombol samping kanan */}
      <div className="absolute right-[-6px] top-40 w-1 h-20 bg-gray-700 rounded-l-lg shadow-[-2px_0_5px_rgba(0,0,0,0.5)]" />

      {/* Layar */}
      <div className="bg-white w-full h-full rounded-[2.5rem] scroll-y-hidden shadow-inner">
        {renderPreview()}
      </div>
    </motion.div>
  );

  return (
    <div className="mx-auto">
      <title>Buat Undangan | KanggoWeb</title>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex justify-center items-center md:w-1/2">{renderPhonePreview()}</div>
        <motion.div
          className="fixed bottom-0 right-0 w-full md:w-1/2 bg-white/90 p-8 border border-[#D89A79]/30 rounded-3xl shadow-xl max-h-screen scroll-y-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Progress */}
          <div className="flex items-center justify-between mb-8 mt-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <motion.div
                  animate={{
                    scale: step >= s ? 1.1 : 1,
                    backgroundColor: step >= s ? "#D89A79" : "#fff",
                    color: step >= s ? "#fff" : "#6B7280",
                    borderColor: step >= s ? "#D89A79" : "#D1D5DB",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full border text-sm font-bold"
                >
                  {s}
                </motion.div>
                {s < 5 && (
                  <motion.div
                    animate={{
                      backgroundColor: step > s ? "#D89A79" : "#E5E7EB",
                      scaleX: step > s ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1 flex-1 mx-2 rounded-full origin-left"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && step < 5) {
                e.preventDefault(); // cegah submit
                if (isStepValid()) setStep(step + 1); // lanjut ke step berikutnya
              }
            }}
          >
            {renderStep()}
          </form>


          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button type="button" className="py-2 px-6 border rounded-xl" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 5 && (
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={() => setStep(step + 1)}
                className={`py-2 px-6 rounded-xl text-white ${isStepValid() ? "bg-[#D89A79] hover:bg-[#b97d61]" : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Next
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
