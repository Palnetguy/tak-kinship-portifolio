"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The office map on Contact.
 *
 * Was a raster cut from David's comp, which is a screenshot of Google Maps.
 * Redistributing a Maps screenshot on a commercial site is not something the
 * Maps terms allow, so this is the licensed route.
 *
 * WHY THE JS API AND NOT THE EMBED API: the Embed API was the lighter option
 * and was tried first, but the key returns "This API is not activated on your
 * API project" for it, and the Static Maps API 403s too. The Maps JavaScript
 * API is the one actually enabled on that Cloud project, and it is what the
 * LAWMA residents-app uses, so this matches the config KingFizzy pointed at.
 * If he later enables the Embed API, an iframe would be lighter than this.
 *
 * Loaded by hand rather than via @react-google-maps/api: that is a dependency
 * and a React context for one static, non-interactive map.
 *
 * Falls back to the static crop when the key is missing or the script fails,
 * so a bad env var degrades to the old behaviour instead of an empty box.
 */

const QUERY = "Kakoba Division, Mbarara, Uganda";
const CENTER = { lat: -0.6135, lng: 30.6588 }; // Kakoba Division, Mbarara
const SCRIPT_ID = "tak-google-maps";

declare global {
  interface Window {
    google?: typeof globalThis & { maps?: unknown };
    /** Google calls this when the key is rejected (referrer, billing, quota). */
    gm_authFailure?: () => void;
  }
}

function loadMaps(key: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("maps failed")));
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("maps failed"));
    document.head.appendChild(s);
  });
}

function StaticFallback() {
  return (
    <img
      src="/contact/map-mbarara.jpg"
      alt={`Map showing TAK Kinship in ${QUERY}`}
      width={1769}
      height={709}
      loading="lazy"
      className="block h-full w-full object-cover"
    />
  );
}

export default function OfficeMap() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!key || !ref.current) return;
    let cancelled = false;

    // An auth rejection (referrer not allowlisted, billing off, quota) does
    // NOT reject the script load: Maps paints its own grey "Oops! Something
    // went wrong" card into the container instead, which is worse than the
    // static image it replaced. This is the only hook Google gives for it.
    window.gm_authFailure = () => {
      if (!cancelled) setFailed(true);
    };

    loadMaps(key)
      .then(() => {
        if (cancelled || !ref.current) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const g = (window as any).google;
        if (!g?.maps) {
          setFailed(true);
          return;
        }
        const map = new g.maps.Map(ref.current, {
          center: CENTER,
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
        });
        new g.maps.Marker({ position: CENTER, map, title: "TAK Kinship" });
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      delete window.gm_authFailure;
    };
  }, [key]);

  if (!key || failed) return <StaticFallback />;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Map showing TAK Kinship in ${QUERY}`}
      className="block h-full min-h-[354px] w-full"
    />
  );
}
