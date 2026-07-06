import { SiteHeader } from "@/components/site-header";
import { Intro } from "@/components/intro";
import { FeaturedProjects } from "@/components/featured-projects";
import { Social } from "@/components/social";
import { Footer } from "@/components/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Technologies } from "@/components/technologies";
import { HtmlLang } from "@/components/html-lang";
import { getDictionary, type Locale } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <>
      <HtmlLang locale={locale} />
      {/* Aurora backdrop behind the header, fading into the page.
          Uses inset-x-0 (not 100vw) so it spans the content width without
          adding horizontal scroll when a vertical scrollbar is present. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] overflow-hidden opacity-45 [mask-image:linear-gradient(to_bottom,black_0%,black_8%,transparent_55%)] dark:opacity-70"
      >
        <AuroraBackground />
      </div>

      <main className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12 sm:py-16">
        <div className="space-y-6">
          <SiteHeader dict={dict} locale={locale} />
          <Intro dict={dict} />
        </div>

        <div className="mt-14 space-y-14">
          <FeaturedProjects dict={dict} locale={locale} />
          <Technologies dict={dict} />
          <Social dict={dict} />
          <Footer dict={dict} />
        </div>
      </main>
    </>
  );
}
