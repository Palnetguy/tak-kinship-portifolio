import Image from "next/image";

/**
 * The revolving team gallery.
 *
 * Replaces the single group photograph that used to fill this half of the
 * panel. KingFizzy called that photo a placeholder (2026-08-09) and asked for
 * it to be merged with the gallery on the live takkinship.com/about, so it is
 * MERGED rather than replaced: the group shot is the first tile in the first
 * column and still gets seen, it just no longer has to carry the whole panel
 * on its own.
 *
 * The other ten are TAK's own gallery images, pulled from the S3 bucket the
 * live site serves them from (`tak-kinship-bkt`, `gallery_images/`) and
 * downscaled to 1200px, which took the set from 9.4MB to 1.3MB. They are real
 * photographs of the real team working, which is the whole reason this section
 * exists.
 *
 * TWO COLUMNS, OPPOSITE DIRECTIONS. One column drifting alone reads as a
 * loading state. Two moving against each other read as depth, and the eye
 * stops trying to follow any single photo, which is what lets it sit behind
 * copy without competing.
 *
 * Server component: this is CSS keyframes and duplicated markup, no JS at all.
 */

/** Group shot first, then the gallery. */
const PHOTOS = [
  { src: "/team/tak-team.jpg", alt: "The TAK Kinship team together" },
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/gallery/g${i + 1}.jpg`,
    alt: "TAK Kinship at work",
  })),
];

const COL_A = PHOTOS.filter((_, i) => i % 2 === 0);
const COL_B = PHOTOS.filter((_, i) => i % 2 === 1);

function Column({
  photos,
  className,
}: {
  photos: typeof PHOTOS;
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
        <Column photos={COL_A} className="tak-marquee-up" />
        <Column photos={COL_B} className="tak-marquee-down" />
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
