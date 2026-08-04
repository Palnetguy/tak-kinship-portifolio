/*
 * Phase 2 primitive gallery -- smoke test only.
 * Replaced entirely by the Phase 3 Home page build.
 */

import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";
import ThemeToggle from "@/components/theme-toggle";

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-16">
        <Section eyebrow="Primitives" heading="Component Gallery">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-text-secondary text-sm mb-4 font-medium">
                Button variants and sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="md">
                  Primary MD
                </Button>
                <Button variant="primary" size="sm">
                  Primary SM
                </Button>
                <Button variant="secondary" size="md">
                  Secondary MD
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary SM
                </Button>
                <Button variant="primary" size="md" href="#">
                  As link
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-text-secondary text-sm mb-4 font-medium">
                Theme toggle
              </h3>
              <ThemeToggle />
            </div>

            <div>
              <h3 className="text-text-secondary text-sm mb-4 font-medium">
                Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  title="Full card"
                  body="This card has a title, body, and footer."
                  footer={
                    <Button variant="primary" size="sm">
                      Action
                    </Button>
                  }
                />
                <Card
                  title="Title only"
                />
                <Card
                  body="Body only card with just a description and no other slots."
                />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
