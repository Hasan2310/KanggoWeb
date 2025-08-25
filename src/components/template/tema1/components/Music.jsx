import React, { useEffect, useState, useRef } from "react";
import { FaMusic } from "react-icons/fa";

export default function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [judul, setJudul] = useState("");
  const [penyanyi, setPenyanyi] = useState("");
  const audioRef = useRef(null);

  const audioSrc = "/Cinta - Chrisye.mp3"; 

  useEffect(() => {
    // Parse nama file
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

    // Update progress bar
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);

    // Coba autoplay
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
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
      document.removeEventListener("click", () => {});
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
  className={`transition-all duration-500 ${
    isMinimized ? "scale-90" : "scale-100"
  }`}
  style={{
    width: isMinimized ? "64px" : "280px",
    height: isMinimized ? "64px" : "110px",
    borderRadius: isMinimized ? "50%" : "20px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: isMinimized ? "center" : "space-between",
    padding: isMinimized ? "0" : "16px",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.3)"
  }}
  onClick={isMinimized ? toggleMinimize : undefined}
>

      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {isMinimized ? (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
          style={{ backgroundColor: "#10256c" }}
        >
          <FaMusic />
        </div>
      ) : (
        <>
          <div>
            <h4 className="font-semibold text-white text-lg">
              {judul}
            </h4>
            <p className="text-xs text-white">{penyanyi}</p>
            <div
              className="mt-2 h-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.4)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#10256c"
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition hover:scale-110"
              style={{ backgroundColor: "#10256c" }}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition hover:scale-110"
              style={{ backgroundColor: "#10256c" }}
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
