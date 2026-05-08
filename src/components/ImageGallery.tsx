import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button key={i} onClick={() => open(i)} className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 text-background hover:text-accent z-10"><X className="w-8 h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-background hover:text-accent z-10"><ChevronLeft className="w-10 h-10" /></button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-background hover:text-accent z-10"><ChevronRight className="w-10 h-10" /></button>
          <img
            src={images[lightboxIdx].src}
            alt={images[lightboxIdx].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-background/70 text-sm">{lightboxIdx + 1} / {images.length} — {images[lightboxIdx].alt}</p>
        </div>
      )}
    </>
  );
}
