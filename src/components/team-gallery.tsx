import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/media";

/**
 * The revolving team gallery.
 *
 * Replaces the single group photograph that used to fill this half of the
 * panel. That photo was first merged in as tile one, then pulled entirely on
 * KingFizzy's second pass (2026-08-10): he called it a placeholder twice, and
 * keeping it as "one of eleven" was still keeping it.
 *
 * All ten are TAK's own gallery images, pulled from the S3 bucket the live
 * site serves them from (`tak-kinship-bkt`, `gallery_images/`) and downscaled
 * to 1200px, 1.7MB for the set. They are real photographs of the real team
 * working, which is the whole reason this section exists.
 *
 * DOWNLOAD THESE SEQUENTIALLY IF THEY EVER NEED REFRESHING. Fetching them in
 * parallel with a 40s ceiling silently truncated four of the ten mid-transfer:
 * the largest is 7.5MB and arrived as 262KB. A truncated JPEG still decodes,
 * with the missing scan lines filled flat grey, and re-encoding it produces a
 * VALID file with a correct EOI marker. So neither the file size nor an
 * integrity check flags it; it has to be caught by looking at the pixels.
 *
 * TWO COLUMNS, OPPOSITE DIRECTIONS. One column drifting alone reads as a
 * loading state. Two moving against each other read as depth, and the eye
 * stops trying to follow any single photo, which is what lets it sit behind
 * copy without competing.
 *
 * Server component: this is CSS keyframes and duplicated markup, no JS at all.
 */

/* Renamed from g1..g10 when the truncated four were re-fetched. The rename is
   the point, not tidiness: Next keys its optimized-image cache on the source
   URL, so replacing the bytes behind an unchanged `/gallery/g6.jpg` kept
   serving the old, grey-bottomed derivative from cache. A new path is the only
   invalidation that cannot be argued with. */
const FALLBACK_PHOTOS = Array.from({ length: 10 }, (_, i) => ({
  src: `/gallery/tak-${String(i + 1).padStart(2, "0")}.jpg`,
}));

function Column({
  photos,
  className,
}: {
  photos: { src: string }[];
  className: string;
}) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      {/* The list is rendered TWICE and the track travels exactly one list
          length, which is what makes the loop seamless.

          Spacing is `mb` on every tile rather than `gap` on the track, and
          that is load-bearing, not a style preference. With `gap`, a track of
          2N items is 2N*h + (2N-1)*g tall, so translating -50% moves half a
          gap short of one full list and the seam drifts visibly on every
          cycle. With a margin on every tile, including the last, the track is
          exactly 2N*(h+g) and -50% lands on the join. */}
      <div className={className} aria-hidden="true">
        {[...photos, ...photos].map((p, i) => (
          <div
            key={i}
            // `bg-surface` under the photo on purpose. These tiles are below
            // the fold and lazily loaded, so one that has not decoded yet
            // paints as a flat block. Against the panel that block reads as a
            // rendering fault; against a surface token it reads as a tile
            // waiting for its image, which is what it is.
            className="relative mb-4 h-[168px] w-full overflow-hidden rounded-xl bg-surface"
          >
            <Image
              src={p.src}
              alt=""
              fill
              unoptimized={shouldBypassImageOptimization(p.src)}
              className="object-cover"
              // The tile is about 245px wide at the 1344 column, so this asks
              // for roughly 2x that. The first pass said 22vw and Next served
              // 316px, which is correct at DPR 1 and visibly soft on a retina
              // screen, where most of this will be seen.
              sizes="(max-width: 1024px) 45vw, 320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamGallery() {
  const photos = FALLBACK_PHOTOS;
  return <TeamGalleryContent photos={photos} />;
}

export function TeamGalleryContent({
  photos,
}: {
  photos: { src: string }[];
}) {
  const colA = photos.filter((_, i) => i % 2 === 0);
  const colB = photos.filter((_, i) => i % 2 === 1);

  return (
    <div
      className="relative h-[440px] w-full"
      style={{
        // Fades the top and bottom so tiles arrive and leave rather than
        // popping at a hard edge. Safe to mask here, unlike the hero arc:
        // nothing inside casts a shadow past its own box, so there is no glow
        // for the mask's left and right edges to slice.
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
      }}
    >
      <div className="flex h-full gap-4">
        <Column photos={colA} className="tak-marquee-up" />
        <Column photos={colB} className="tak-marquee-down" />
      </div>
      {/* The photographs are decorative here: the section's meaning is in its
          heading and body, and eleven identical "TAK Kinship at work" alts
          would be noise in a screen reader rather than information. The
          columns are aria-hidden and this carries the description instead. */}
      <span className="sr-only">
        A gallery of photographs of the TAK Kinship team at work.
      </span>
    </div>
  );
}
