/**
 * Next's image optimizer intentionally blocks private IPs. Local Django media
 * is safe to load directly in development, while production media remains
 * constrained by the allowlist in next.config.ts.
 */
export function shouldBypassImageOptimization(source?: string): boolean {
  if (!source) return false;

  try {
    const url = new URL(source);
    return (
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost" ||
      url.hostname === "tak-kinship-bkt.s3.us-west-2.amazonaws.com"
    );
  } catch {
    return false;
  }
}
