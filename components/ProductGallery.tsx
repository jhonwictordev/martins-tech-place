"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const gallery = images.length > 0 ? images : ["/logo-martins-techplace.png"];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/70">
        <Image src={activeImage} alt={title} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {gallery.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60",
              activeImage === image && "border-cyan"
            )}
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
