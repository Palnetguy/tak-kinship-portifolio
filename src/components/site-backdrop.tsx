/**
 * The faceted plate, behind every page.
 *
 * David's design uses this plate as the background on all four frames, so it
 * belongs in the root layout rather than being pasted per page. Source is
 * `~/Downloads/Rectangle 1.png` (7852x4371, 6MB), resampled to 2560 wide and
 * saved as progressive JPEG at 66kb: it is almost entirely smooth gradient, so
 * nothing survives the downsample that the eye can find at 2x on a 1440 design.
 *
 * "Alive" without video. Two copies of the same plate drift in opposite
 * directions on long, deliberately mismatched cycles (37s and 53s, coprime, so
 * the pair never resolves into a visible repeat), one of them mirrored so the
 * two never read as the same picture. Where the light streaks cross each other
 * the brightness genuinely changes, which is the effect a single drifting
 * image cannot produce. Transform and opacity only, so it all stays on the
 * compositor and costs no layout.
 *
 * `fixed` rather than scrolling with the page: the plate is depth, not
 * content, and holding still under a scrolling page is what sells that.
 *
 * Light theme fades it out entirely. It is a near-black plate; at any opacity
 * that made it visible on the #f2f2f2 canvas it read as dirt on the screen.
 */
export default function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="tak-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="tak-plate tak-plate-a absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/decor/faceted-plate.jpg)" }}
      />
      <div
        className="tak-plate tak-plate-b absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/decor/faceted-plate.jpg)" }}
      />
      {/* The sweep. Sits ABOVE the plates and below the scrim, so it lights
          the facets rather than washing out the text. */}
      <div
        className="tak-sweep absolute -inset-1/4"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 50% 50%, color-mix(in srgb, var(--text-accent) 16%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Sinks the centre of the screen back down toward the canvas colour so
          the plate stays atmosphere and never competes with body copy. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--bg-canvas) 74%, transparent) 0%, color-mix(in srgb, var(--bg-canvas) 94%, transparent) 62%, var(--bg-canvas) 100%)",
        }}
      />
    </div>
  );
}
