import Link from "next/link";
import type { Metadata } from "next";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/seo";
import HeroForm from "./components/HeroForm";

/* ──────────────────────────────────────
   FriendKemi Hero — Editorial × Playful
   로즈/딥핑크 컬러 시스템
   ────────────────────────────────────── */

const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
      fill="currentColor"
    />
  </svg>
);

export const metadata: Metadata = {
  title: `${SITE_NAME} | 이 친구랑 나, 진짜 통할까?`,
  description:
    "생년월일만 넣으면 오행으로 찐친 케미를 알 수 있어. 조별과제 팀원부터 룸메까지, 우리 사이 진짜 궁합 확인해봐.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | 이 친구랑 나, 진짜 통할까?`,
    description:
      "생년월일만 넣으면 오행으로 찐친 케미를 알 수 있어. 우리 사이 진짜 궁합 확인해봐.",
    siteName: SITE_NAME,
    url: "/",
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 이 친구랑 나, 진짜 통할까?`,
    description:
      "생년월일만 넣으면 오행으로 찐친 케미를 알 수 있어. 우리 사이 진짜 궁합 확인해봐.",
    images: [OG_IMAGE_PATH],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "FriendKemi",
      inLanguage: "ko-KR",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "EntertainmentApplication",
      inLanguage: "ko-KR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    },
  ],
};

export default function Home() {
  return (
    <main className="hero-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ━━━ MARQUEE BAND ━━━ */}
      <div className="marquee-band">
        <div className="marquee-track">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="marquee-item">
              FriendKemi
              <svg
                className="marquee-star"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* ━━━ HERO SECTION ━━━ */}
      <section className="hero-section">
        <Sparkle className="sparkle sparkle--1" />
        <Sparkle className="sparkle sparkle--2" />
        <Sparkle className="sparkle sparkle--3" />

        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            친구 케미 궁합
          </div>

          <h1 className="hero-title">
            <span className="title-line-1">
              <em>두근두근</em>
            </span>
            <span className="title-line-2">캠퍼스 케미</span>
          </h1>

          <p className="hero-desc">
            친구에도 <strong>케미</strong>는 필수!
            <br />
            사주 오행으로 알아보는
            <br />
            우리 사이 <em>진짜</em> 궁합
          </p>

          <div className="hero-tags">
            <span className="sticker sticker--rose">🏫 조별과제</span>
            <span className="sticker sticker--peach">🧡 찐친</span>
            <span className="sticker sticker--mint">🍀 신학기</span>
          </div>

        </div>

        <HeroForm />
      </section>

      {/* ━━━ BOTTOM MARQUEE ━━━ */}
      <div className="bottom-band">
        <div className="bottom-band-inner">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="bottom-band-item">
              우린 잘 맞을까? ✨
            </span>
          ))}
        </div>
      </div>

      {/* ━━━ FOOTER ━━━ */}
      <footer
        style={{
          borderTop: "1px solid #e9e4de",
          padding: "2rem 1.5rem",
          textAlign: "center",
          color: "var(--ink-muted)",
          fontSize: "0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/blog" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>친구 관계 꿀팁</Link>
          <Link href="/combinations" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>전체 조합 보기</Link>
          <Link href="/faq" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>자주 묻는 질문</Link>
          <Link href="/contact" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>문의하기</Link>
          <Link href="/terms" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>이용약관</Link>
          <Link href="/privacy" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>개인정보처리방침</Link>
        </nav>
        <p style={{ margin: 0 }}>© 2026 FriendKemi · 사주 오행 기반 친구 케미 테스트</p>
      </footer>
    </main>
  );
}
