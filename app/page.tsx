import Link from "next/link";

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

const previewCards = [
  { emoji: "🔥", title: "불꽃 시너지", sub: "화 × 목", rotate: "-2deg" },
  { emoji: "🌿", title: "힐링 메이트", sub: "목 × 수", rotate: "1.5deg" },
  { emoji: "⚡", title: "티격태격 콤비", sub: "금 × 화", rotate: "-1deg" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "친구 케미 궁합",
  url: "https://friend-kemi.vercel.app",
  description:
    "생년월일을 입력하면 사주 오행으로 두 사람의 친구 궁합을 분석해주는 무료 테스트.",
  applicationCategory: "EntertainmentApplication",
  inLanguage: "ko-KR",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
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
            <span className="title-line-2">스쿨 케미</span>
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

          <div className="hero-cta-wrap">
            <Link href="/test" className="hero-cta-btn">
              케미 확인하러 가기
              <span className="cta-arrow">↗</span>
            </Link>
            <span className="cta-sub">가입 없이 · 30초면 끝!</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="badge-main">
            <span className="badge-emoji">🫶🏻</span>
            <span className="badge-ring" />
          </div>

          <div className="combo-float">
            <span>🔥</span>
            <span className="combo-op">+</span>
            <span>🌊</span>
            <span className="combo-op">=</span>
            <span className="combo-result">💗</span>
          </div>

          <div className="year-sticker">
            <span>2026</span>
            신학기
            <br />
            에디션
          </div>
        </div>
      </section>

      {/* ━━━ DIVIDER ━━━ */}
      <div className="divider" />

      {/* ━━━ PREVIEW SECTION ━━━ */}
      <section className="preview-section">
        <p className="preview-label">
          <Sparkle className="sparkle-inline" />
          이런 결과를 받아볼 수 있어요
        </p>

        <div className="preview-grid">
          {previewCards.map((card) => (
            <div
              key={card.title}
              className="preview-card"
              style={{ "--rotate": card.rotate } as React.CSSProperties}
            >
              <div className="preview-card-emoji">{card.emoji}</div>
              <div className="preview-card-title">{card.title}</div>
              <div className="preview-card-sub">{card.sub}</div>
              <div className="preview-card-arrow">↗</div>
            </div>
          ))}
        </div>
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