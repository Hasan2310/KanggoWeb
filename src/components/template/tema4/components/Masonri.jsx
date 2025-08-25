import React, { useState } from "react";

export default function Masonry7() {
  const images = [
    { id: 1011, w: 600, h: 900, alt: "Forest vertical" },
    { id: 1025, w: 1200, h: 800, alt: "Mountains wide" },
    { id: 1033, w: 800, h: 1200, alt: "City tall building" },
    { id: 1041, w: 1000, h: 700, alt: "Beach landscape" },
    { id: 1052, w: 700, h: 1000, alt: "Street closeup" },
    { id: 1068, w: 900, h: 600, alt: "Sunset panorama" },
    { id: 1074, w: 600, h: 800, alt: "Flowers vertical" },
  ];

  const [lightbox, setLightbox] = useState({ open: false, src: null, alt: "" });

  const openLightbox = (img) => setLightbox({ open: true, src: getSrc(img), alt: img.alt });
  const closeLightbox = () => setLightbox({ open: false, src: null, alt: "" });

  function getSrc(img) {
    return `https://picsum.photos/id/${img.id}/${img.w}/${img.h}`;
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-4">Masonry 7 — Responsive & beda-beda ukuran</h3>

      <div
        className="masonry-column gap-4"
        style={{
          columnGap: "1rem",
        }}
      >
        <style>{`
          .masonry-column { column-count: 2; }
          @media (min-width: 640px) { .masonry-column { column-count: 2; } }
          @media (min-width: 768px) { .masonry-column { column-count: 3; } }
          @media (min-width: 1024px) { .masonry-column { column-count: 4; } }
          .masonry-item { break-inside: avoid; -webkit-column-break-inside: avoid; margin-bottom: 1rem; }
        `}</style>

        {images.map((img, i) => (
          <div
            key={i}
            className="masonry-item rounded-xl overflow-hidden shadow-sm cursor-pointer transition transform hover:scale-105"
            onClick={() => openLightbox(img)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(img)}
          >
            <img
              src={getSrc(img)}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>

      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeLightbox}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="mb-2 px-3 py-1 bg-white rounded-full shadow-sm text-sm"
              onClick={closeLightbox}
            >
              Close
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="block mx-auto rounded-lg shadow-lg max-h-[80vh] w-auto"
            />
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">Tip: klik gambar buat buka lightbox. Resize window buat liat responsive columns.</p>
    </div>
  );
}
