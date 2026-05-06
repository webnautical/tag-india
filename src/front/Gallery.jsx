// src/front/Gallery.jsx
import { useState, useEffect, useCallback } from "react";
import { MdClose, MdZoomIn, MdZoomOut, MdFileDownload } from "react-icons/md";
import zoomIcon from '../assets/img/zoom.png';
import { useGetAllGalleryQuery } from "../api/TagIndiaAPI";
import { IMG_BASE_URL } from "../helper/utils";

export const Gallery = () => {
  const { data, isLoading, isError } = useGetAllGalleryQuery();
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [zoom, setZoom] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // image ka full URL banana — Laravel storage se
  const getImageUrl = (filename) => `${IMG_BASE_URL()}/gallery/${filename}`;

  const galleryImages = data?.data || [];
  const total = galleryImages.length;
  const current = galleryImages[lightbox.index];

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    setZoom(1);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
    setZoom(1);
    document.body.style.overflow = "";
  };

  const prev = useCallback(() => {
    setZoom(1);
    setLightbox((lb) => ({ ...lb, index: (lb.index - 1 + total) % total }));
  }, [total]);

  const next = useCallback(() => {
    setZoom(1);
    setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % total }));
  }, [total]);

  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, prev, next]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = getImageUrl(current.image);
    a.download = current.image;
    a.target = "_blank";
    a.click();
  };

  // ── LOADER ──────────────────────────────
  if (isLoading) {
    return (
      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center lg:mb-8 mb-4">Tag Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden p-2 animate-pulse"
                style={{ boxShadow: "0px 4px 27px 2px #0000001A" }}
              >
                <div
                  className="rounded-lg bg-gray-200"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="pt-3 pb-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── ERROR ────────────────────────────────
  if (isError) {
    return (
      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="lg:mb-8 mb-4">Tag Gallery</h2>
          <p className="text-red-500">Gallery load nahi ho saki. Please refresh karein.</p>
        </div>
      </section>
    );
  }

  // ── EMPTY ────────────────────────────────
  if (!galleryImages.length) {
    return (
      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="lg:mb-8 mb-4">Tag Gallery</h2>
          <p className="text-gray-400">Koi image nahi mili.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── GALLERY GRID ─────────────────────── */}
      <section className="bg-white lg:py-12 py-6 gallery_section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center lg:mb-8 mb-4">Tag Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                className="rounded-2xl overflow-hidden cursor-pointer p-2"
                style={{ boxShadow: "0px 4px 27px 2px #0000001A" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={getImageUrl(img.image)}
                    alt={img.title || "Gallery Image"}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)" }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      opacity: hoveredIndex === i ? 1 : 0,
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "#6A1B9A99" }}
                    >
                      <img src={zoomIcon} className="w-6" alt="" />
                    </div>
                  </div>
                </div>

                {/* title sirf tab show hoga jab ho */}
                {img.title && (
                  <div className="pt-3 pb-2">
                    <p className="text-sm font-semibold text-black mb-0">{img.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────── */}
      {lightbox.open && current && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: "rgba(0,0,0,0.92)" }}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between px-5 py-3 flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <span className="text-white text-sm opacity-80">
              {lightbox.index + 1} / {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10"
                title="Zoom In"
              >
                <MdZoomIn size={20} />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10"
                title="Zoom Out"
              >
                <MdZoomOut size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10"
                title="Download"
              >
                <MdFileDownload size={20} />
              </button>
              <button
                onClick={closeLightbox}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10"
                title="Close"
              >
                <MdClose size={22} />
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-4 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image + Caption */}
            <div className="flex flex-col items-center px-16 max-w-4xl w-full">
              <div className="overflow-auto flex items-center justify-center" style={{ maxHeight: "60vh" }}>
                <img
                  key={lightbox.index}
                  src={getImageUrl(current.image)}
                  alt={current.title || "Gallery Image"}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>

              {/* title ya description sirf tab show hoga jab API se aaye */}
              {(current.title || current.description) && (
                <div className="text-center mt-6 px-4">
                  {current.title && (
                    <h3 className="text-white font-bold text-base mb-2">{current.title}</h3>
                  )}
                  {current.description && (
                    <p className="text-white text-sm leading-relaxed max-w-lg">{current.description}</p>
                  )}
                </div>
              )}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};