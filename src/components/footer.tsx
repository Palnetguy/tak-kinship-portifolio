import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="text-text-primary font-semibold text-lg no-underline"
            >
              TAK Kinship
            </Link>
            <p className="text-text-muted text-sm mt-3">
              A design and development studio.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/services"
              className="text-text-secondary no-underline text-sm"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-text-secondary no-underline text-sm"
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="text-text-secondary no-underline text-sm"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-text-secondary text-sm">
              hello@takkinship.com
            </p>
            <p className="text-text-muted text-sm">Kampala, Uganda</p>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-12 pt-6">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} TAK Kinship. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
