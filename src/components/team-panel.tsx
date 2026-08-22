import Button from "@/components/button";
import { TeamGalleryContent } from "@/components/team-gallery";
import { getLiveGalleryPhotos } from "@/lib/tak-api";
import MediaPlaceholder from "@/components/media-placeholder";

/**
 * "The people behind the work".
 *
 * This section was missing because it was never in the file being traced.
 * The build plan (wiki/projects/tak-kinship/website-build-plan.md, approved
 * decisions table) rules: "Base | David's file. Joy's team section ports into
 * it." Every reference export in ~/Downloads/David/ is David's, so this is the
 * one section on Home with no counterpart there, and it stayed missing until
 * KingFizzy noticed on 2026-08-09.
 *
 * Copy and layout are Joy's, verbatim from `~/Downloads/Joy/home V1.png`:
 * eyebrow, heading, body and a "Meet the team" action, with the group
 * photograph on the left at roughly half the measure. Her panel is light
 * because her whole file is; here it sits on the shared surface token so it
 * follows the theme toggle like every other section.
 *
 * The photograph is real, not stock: cut from her export at the measured
 * bounds (x 256-2484, y 26015-27695 in the 5263px-wide frame, detected by
 * scanning for the only saturated block on the panel rather than eyeballed).
 * The build plan calls it "the only section on either file that makes the
 * company feel staffed by people", which is exactly why it should not have
 * been dropped.
 */
export default async function TeamPanel() {
  const photos = await getLiveGalleryPhotos();

  return (
    <div className="flex flex-col items-center gap-12 overflow-hidden rounded-2xl border border-border-subtle bg-elevated p-8 md:p-12 lg:flex-row lg:gap-16">
      {/* Joy's layout is unchanged: media left at roughly half the measure,
          copy right. Only what fills the media half changed, from one static
          group photograph to the revolving gallery, on KingFizzy's order
          (2026-08-09). The group shot is not lost, it is the first tile. */}
      <div className="w-full shrink-0 lg:w-[46%]">
        {photos?.length ? (
          <TeamGalleryContent photos={photos} />
        ) : (
          <div className="h-[440px] overflow-hidden rounded-xl border border-border-subtle">
            <MediaPlaceholder />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-5">
        <p className="font-mono-eyebrow m-0 text-xs font-medium uppercase tracking-[0.18em] text-text-accent">
          The People Behind The Work
        </p>
        <h2 className="font-display m-0 max-w-[460px] text-3xl font-bold leading-[1.12] tracking-tight md:text-[46px]">
          Technology built by people, for people.
        </h2>
        <p className="m-0 max-w-[480px] text-[15px] leading-relaxed text-text-secondary">
          Behind every product is a team that listens, thinks carefully,
          designs with intention and builds with purpose. That is how TAK
          works.
        </p>
        {/* PLACEHOLDER: Joy's design points this at a dedicated team page,
            which does not exist on either file. Contact is the only route that
            actually reaches these people, so it goes there until a /team route
            with real names and roles is written. */}
        <Button variant="secondary" size="md" href="/contact">
          Meet the team
        </Button>
      </div>
    </div>
  );
}
