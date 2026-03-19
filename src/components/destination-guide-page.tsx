import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Landmark, Lightbulb, MapPinned, Sparkles } from "lucide-react";

import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { Button } from "@/src/components/ui/button";
import { DestinationContent, SupportedLocale } from "@/src/lib/destinations";

const labels = {
  en: {
    badge: "Destination Guide",
    about: "About the city",
    attractions: "Top attractions",
    thingsToDo: "Things to do",
    bestTime: "Best time to visit",
    tips: "Travel tips",
    ctaTitle: "Ready to explore Uzbekistan?",
    ctaText:
      "Browse our curated tour packages and let our team help you design a seamless Silk Road journey.",
    ctaButton: "View Tour Packages",
  },
  ru: {
    badge: "Путеводитель",
    about: "О городе",
    attractions: "Главные достопримечательности",
    thingsToDo: "Чем заняться",
    bestTime: "Лучшее время для поездки",
    tips: "Полезные советы",
    ctaTitle: "Готовы открыть для себя Узбекистан?",
    ctaText:
      "Посмотрите наши туры и позвольте команде Naseem's Travel помочь вам спланировать идеальное путешествие по Шелковому пути.",
    ctaButton: "Смотреть туры",
  },
  uz: {
    badge: "Sayohat qo'llanmasi",
    about: "Shahar haqida",
    attractions: "Asosiy diqqatga sazovor joylar",
    thingsToDo: "Nimalar qilish mumkin",
    bestTime: "Borish uchun eng yaxshi vaqt",
    tips: "Sayohat tavsiyalari",
    ctaTitle: "O'zbekistonni kashf etishga tayyormisiz?",
    ctaText:
      "Saralangan tur paketlarimizni ko'ring va Silk Road sayohatingizni puxta rejalashtirishda jamoamizga ishoning.",
    ctaButton: "Tur paketlarini ko'rish",
  },
} satisfies Record<SupportedLocale, Record<string, string>>;

type Props = {
  locale: SupportedLocale;
  destination: DestinationContent;
};

export function DestinationGuidePage({ locale, destination }: Props) {
  const t = labels[locale];

  return (
    <div className="min-h-screen bg-[#fbfbf9]">
      <Header />

      <main>
        <section className="relative isolate min-h-[420px] overflow-hidden sm:min-h-[480px] lg:min-h-[520px]">
          <Image
            src={destination.heroImage}
            alt={destination.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fbfbf9]" />

          <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-end px-4 pb-12 pt-24 sm:min-h-[480px] sm:px-6 sm:pb-14 lg:min-h-[520px] lg:px-8 lg:pb-16">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md sm:mb-6 sm:px-4">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-xs font-black tracking-[0.18em] text-white">
                  {t.badge}
                </span>
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {destination.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg md:text-xl">
                {destination.preview[locale]}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_24px_60px_-22px_rgba(0,0,0,0.1)] sm:rounded-[36px] sm:p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007654]/10 text-[#007654] sm:h-12 sm:w-12">
                  <Landmark className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] sm:text-3xl">{t.about}</h2>
              </div>
              <div className="space-y-5 text-base leading-7 text-gray-600 sm:space-y-6 sm:text-lg sm:leading-8">
                {destination.about[locale].split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_20px_48px_-22px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007654]/10 text-[#007654]">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-[#1a1a1a] sm:text-2xl">{t.bestTime}</h3>
                </div>
                <p className="leading-7 text-gray-600">{destination.bestTime[locale]}</p>
              </div>

              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_20px_48px_-22px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007654]/10 text-[#007654]">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-[#1a1a1a] sm:text-2xl">{t.tips}</h3>
                </div>
                <ul className="space-y-3">
                  {destination.tips[locale].map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-gray-600">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#007654]" />
                      <span className="leading-7">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_24px_60px_-22px_rgba(0,0,0,0.1)] sm:rounded-[36px] sm:p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007654]/10 text-[#007654] sm:h-12 sm:w-12">
                  <MapPinned className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] sm:text-3xl">{t.attractions}</h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {destination.attractions[locale].map((item) => (
                  <li key={item} className="rounded-2xl bg-[#fbfbf9] px-5 py-4 font-bold text-[#1a1a1a]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_24px_60px_-22px_rgba(0,0,0,0.1)] sm:rounded-[36px] sm:p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007654]/10 text-[#007654] sm:h-12 sm:w-12">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[#1a1a1a] sm:text-3xl">{t.thingsToDo}</h2>
              </div>
              <ul className="space-y-4">
                {destination.thingsToDo[locale].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#007654]" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#007654] via-[#008c64] to-[#007654] px-6 py-10 shadow-[0_28px_70px_-22px_rgba(0,118,84,0.4)] sm:rounded-[40px] sm:px-8 sm:py-12 md:px-12">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
                  {t.ctaTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{t.ctaText}</p>
                <Link href={`/${locale}/tour`} className="mt-8 inline-block w-full sm:w-auto">
                  <Button className="h-12 w-full rounded-2xl bg-white px-6 font-black text-[#007654] hover:bg-[#dcfae7] sm:h-14 sm:w-auto sm:px-8">
                    {t.ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
