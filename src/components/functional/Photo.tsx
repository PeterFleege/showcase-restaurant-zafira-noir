"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  tone: string; // Tailwind gradient classes shown beneath, and as fallback if the file is missing
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function Photo({
  src,
  alt,
  tone,
  className = "",
  priority,
  sizes = "100vw",
}: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`absolute inset-0 bg-linear-to-br ${tone} ${className}`}>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
