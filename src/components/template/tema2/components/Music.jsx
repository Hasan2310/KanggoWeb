import React, { useEffect, useState, useRef } from "react";
import { FaMusic } from "react-icons/fa";

export default function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [judul, setJudul] = useState("");
  const [penyanyi, setPenyanyi] = useState("");
  const audioRef = useRef(null);

  const audioSrc = "/Cinta - Chrisye.mp3"; // format: Judul - Penyanyi.mp3

  useEffect(() => {
    const fileName = audioSrc.split("/").pop().replace(".mp3", "");
    const [title, artist] = fileName.split(" - ");
    setJudul(title || "Unknown Title");
    setPenyanyi(artist || "Unknown Artist");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMinimized(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        console.log("Autoplay diblokir, nunggu interaksi user...");
        const enableOnClick = () => {
          audio.play();
          setIsPlaying(true);
          document.removeEventListener("click", enableOnClick);
        };
        document.addEventListener("click", enableOnClick);
      }
    };
    playAudio();

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ${
        isMinimized ? "scale-90" : "scale-100"
      }`}
      style={{
        width: isMinimized ? "64px" : "280px",
        height: isMinimized ? "64px" : "110px",
        borderRadius: isMinimized ? "50%" : "20px",
        background: "#F3E3C7",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: isMinimized ? "center" : "space-between",
        padding: isMinimized ? "0" : "16px",
        cursor: "pointer",
        border: "1px solid rgba(0,0,0,0.1)"
      }}
      onClick={isMinimized ? toggleMinimize : undefined}
    >
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {isMinimized ? (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-[#5a4634] text-xl"
          style={{ backgroundColor: "#e0c9a6" }}
        >
          <FaMusic />
        </div>
      ) : (
        <>
          <div>
            <h4 className="font-semibold text-[#5a4634] text-lg">{judul}</h4>
            <p className="text-xs text-[#7a6652]">{penyanyi}</p>
            <div
              className="mt-2 h-1 rounded-full"
              style={{
                background: "rgba(90,70,52,0.2)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#5a4634"
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition hover:scale-110"
              style={{ backgroundColor: "#5a4634" }}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition hover:scale-110"
              style={{ backgroundColor: "#5a4634" }}
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize();
              }}
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
