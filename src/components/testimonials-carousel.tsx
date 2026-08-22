"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TestimonialItem = {
  quote: string;
  author: string;
  role?: string;
  image?: string;
};

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const unoptimized = item.image?.startsWith(
    "https://tak-kinship-bkt.s3.us-west-2.amazonaws.com/",
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <figure className="m-0 flex min-h-[390px] w-[min(390px,calc(100vw-48px))] flex-col rounded-xl border border-border-subtle bg-surface p-6 sm:w-[420px] sm:p-7">
      <blockquote className="m-0 flex-1 text-[15px] leading-relaxed text-text-secondary">
        {item.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-border-subtle pt-5">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-subtle bg-elevated">
          {!imageLoaded && (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-pulse bg-elevated"
            />
          )}
          {item.image && !imageFailed ? (
            <Image
              src={item.image}
              alt=""
              width={96}
              height={96}
              unoptimized={unoptimized}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="48px"
            />
          ) : null}
        </span>
        <span className="min-w-0">
          <span className="font-display block text-[15px] font-bold text-text-primary">
            {item.author}
          </span>
          {item.role ? (
            <span className="font-mono-eyebrow mt-1 block text-[11px] tracking-[0.12em] text-text-accent uppercase">
              {item.role}
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}

export default function TestimonialsCarousel({
  items,
}: {
  items: TestimonialItem[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pauseUntil = useRef(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previousTime = performance.now();

    const move = (time: number) => {
      const rail = railRef.current;
      if (rail && !hovered && time >= pauseUntil.current) {
        const setWidth = rail.scrollWidth / 2;
        if (setWidth > 0) {
          const distance = ((time - previousTime) * 0.02) % setWidth;
          rail.scrollLeft += distance;
          if (rail.scrollLeft >= setWidth) rail.scrollLeft -= setWidth;
        }
      }
      previousTime = time;
      frame = window.requestAnimationFrame(move);
    };

    frame = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(frame);
  }, [hovered]);

  const moveByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;

    const setWidth = rail.scrollWidth / 2;
    const cardWidth = Math.min(444, rail.clientWidth * 0.85);
    if (direction < 0 && rail.scrollLeft < cardWidth) {
      rail.scrollLeft += setWidth;
    }
    pauseUntil.current = performance.now() + 700;
    rail.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="mb-4 flex justify-end gap-1">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => moveByCard(-1)}
          className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.6]">
            <path d="m11.5 4-6 6 6 6M6 10h8.5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => moveByCard(1)}
          className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.6]">
            <path d="m8.5 4 6 6-6 6M14 10H5.5" />
          </svg>
        </button>
      </div>
      <div ref={railRef} className="overflow-hidden">
        <div className="flex w-max">
          <div className="flex gap-6 pr-6">
            {items.map((item) => (
              <TestimonialCard
                key={`${item.author}-${item.quote.slice(0, 24)}`}
                item={item}
              />
            ))}
          </div>
          <div aria-hidden="true" className="flex gap-6 pr-6">
            {items.map((item) => (
              <TestimonialCard
                key={`repeat-${item.author}-${item.quote.slice(0, 24)}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
