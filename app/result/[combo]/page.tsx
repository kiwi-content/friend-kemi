import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chemistryData } from "../../data/chemistry-data";

/* ──────────────────────────────────────
   슬러그 ↔ 한국어 매핑
   URL: /result/mok-hwa → 목_화
   ────────────────────────────────────── */
const SLUG_TO_KR: Record<string, string> = {
  mok: "목",
  hwa: "화",
  to: "토",
  geum: "금",
  su: "수",
};

const KR_TO_SLUG: Record<string, string> = {
  목: "mok",
  화: "hwa",
  토: "to",
  금: "geum",
  수: "su",
};

const SLUGS = ["mok", "hwa", "to", "geum", "su"] as const;

const ELEMENT_EMOJI: Record<string, string> = {
  목: "🌿",
  화: "🔥",
  토: "🪨",
  금: "⚔️",
  수: "🌊",
};

const ELEMENT_COLOR: Record<string, string> = {
  목: "#34d399",
  화: "#fb7185",
  토: "#d4a574",
  금: "#94a3b8",
  수: "#38bdf8",
};

const REL_BADGE: Record<string, { text: string; bg: string; color: string }> = {
  상생: { text: "상생 ✨", bg: "#d1fae5", color: "#059669" },
  비화: { text: "비화 🪞", bg: "#ede9fe", color: "#7c3aed" },
  상극: { text: "상극 ⚡", bg: "#fff1f2", color: "#e11d48" },
};

/* ──────────────────────────────────────
   Static Params — 빌드 시 25개 생성
   ────────────────────────────────────── */
export function generateStaticParams() {
  return SLUGS.flatMap((s1) =>
    SLUGS.map((s2) => ({ combo: `${s1}-${s2}` }))
  );
}

/* ──────────────────────────────────────
   Per-page Metadata
   ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ combo: string }>;
}): Promise<Metadata> {
  const { combo } = await params;
  const [s1, s2] = combo.split("-");
  const e1 = SLUG_TO_KR[s1];
  const e2 = SLUG_TO_KR[s2];
  if (!e1 || !e2) return {};

  const data = chemistryData[`${e1}_${e2}`];
  if (!data) return {};

  return {
    title: `${e1} × ${e2} 친구 궁합 — ${data.title} | 친구 케미 궁합`,
    description: `${e1} 유형과 ${e2} 유형의 친구 궁합 ${data.score}점, ${data.title}. ${data.subtitle}`,
    keywords: [
      `${e1}${e2} 궁합`,
      `${e1} ${e2} 친구 궁합`,
      `오행 ${e1} ${e2}`,
      `사주 ${e1} ${e2} 케미`,
      `${data.relationship} 궁합`,
      data.title,
      "친구 궁합 테스트",
    ],
    openGraph: {
      title: `${e1} × ${e2} 친구 궁합 — ${data.title}`,
      description: `${data.score}점 · ${data.subtitle}`,
      locale: "ko_KR",
      type: "article",
    },
  };
}

/* ──────────────────────────────────────
   Score Ring (정적 SVG)
   ────────────────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="result-score-ring">
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e5e2dd" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="var(--rose)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="result-score-inner">
        <span className="result-score-num">{score}</span>
        <span className="result-score-label">점</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   Section
   ────────────────────────────────────── */
function Section({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="result-section">
      <div className="result-section-header">
        <span className="result-section-emoji">{emoji}</span>
        <h2 className="result-section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ──────────────────────────────────────
   Page
   ────────────────────────────────────── */
export default async function ResultStaticPage({
  params,
}: {
  params: Promise<{ combo: string }>;
}) {
  const { combo } = await params;
  const [s1, s2] = combo.split("-");
  const e1 = SLUG_TO_KR[s1];
  const e2 = SLUG_TO_KR[s2];
  if (!e1 || !e2) notFound();

  const data = chemistryData[`${e1}_${e2}`];
  if (!data) notFound();

  const relBadge = REL_BADGE[data.relationship];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${e1} × ${e2} 친구 궁합 — ${data.title}`,
    description: data.summary,
    url: `https://friend-kemi.vercel.app/result/${combo}`,
    inLanguage: "ko-KR",
    keywords: `${e1}${e2} 궁합, 오행 ${e1} ${e2}, 친구 궁합 테스트`,
  };

  return (
    <div className="result-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="result-container">

        {/* ━━━ 네비 ━━━ */}
        <div className="result-nav">
          <Link href="/" className="form-back">←</Link>
          <span className="form-nav-title">{e1} × {e2} 케미 결과</span>
        </div>

        {/* ━━━ 히어로 카드 ━━━ */}
        <div className="result-hero-card">
          <div className="result-names">
            <div className="result-name-chip">
              <span>{ELEMENT_EMOJI[e1]}</span>
              <span>{e1} 유형</span>
            </div>
            <span className="result-name-x">✕</span>
            <div className="result-name-chip">
              <span>{ELEMENT_EMOJI[e2]}</span>
              <span>{e2} 유형</span>
            </div>
          </div>

          <ScoreRing score={data.score} />

          <div className="result-hero-emoji">{data.emoji}</div>
          <h1 className="result-hero-title">{data.title}</h1>
          <p className="result-hero-subtitle">{data.subtitle}</p>

          <div className="result-badges">
            <span
              className="result-rel-badge"
              style={{ background: relBadge.bg, color: relBadge.color }}
            >
              {relBadge.text}
            </span>
            <span
              className="result-el-badge"
              style={{ background: `${ELEMENT_COLOR[e1]}20`, color: ELEMENT_COLOR[e1] }}
            >
              {ELEMENT_EMOJI[e1]} {e1}
            </span>
            <span
              className="result-el-badge"
              style={{ background: `${ELEMENT_COLOR[e2]}20`, color: ELEMENT_COLOR[e2] }}
            >
              {ELEMENT_EMOJI[e2]} {e2}
            </span>
          </div>

          <p className="result-summary">{data.summary}</p>
        </div>

        {/* ━━━ 잘 맞는 점 ━━━ */}
        <Section emoji="💗" title="잘 맞는 점">
          <div className="result-cards">
            {data.goodPoints.map((p, i) => (
              <div key={i} className="result-point-card result-point-good">
                <div className="result-point-head">
                  <span className="result-point-emoji">{p.emoji}</span>
                  <span className="result-point-title">{p.title}</span>
                </div>
                <p className="result-point-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 갈등 포인트 ━━━ */}
        <Section emoji="⚡" title="갈등 포인트">
          <div className="result-cards">
            {data.conflictPoints.map((p, i) => (
              <div key={i} className="result-point-card result-point-conflict">
                <div className="result-point-head">
                  <span className="result-point-emoji">{p.emoji}</span>
                  <span className="result-point-title">{p.title}</span>
                </div>
                <p className="result-point-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 친해지는 팁 ━━━ */}
        <Section emoji="🫶" title="친해지는 팁">
          <div className="result-tips">
            {data.tips.map((t, i) => (
              <div key={i} className="result-tip-row">
                <span className="result-tip-emoji">{t.emoji}</span>
                <p className="result-tip-text">{t.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 추천 활동 ━━━ */}
        <Section emoji="🎯" title="같이 하면 좋은 활동">
          <div className="result-activities-grid">
            {data.activities.map((a, i) => (
              <div key={i} className="result-activity-card">
                <span className="result-activity-emoji">{a.emoji}</span>
                <span className="result-activity-title">{a.title}</span>
                <p className="result-activity-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━ 케미 운세 ━━━ */}
        <div className="result-fortune-card">
          <span className="result-fortune-icon">🔮</span>
          <p className="result-fortune-title">케미 운세</p>
          <p className="result-fortune-text">{data.fortune}</p>
        </div>

        {/* ━━━ CTA ━━━ */}
        <div className="result-actions">
          <Link href="/test" className="result-share-btn" style={{ textDecoration: "none", textAlign: "center" }}>
            내 친구랑 케미 테스트하기 💗
          </Link>
          <Link href="/" className="result-retry-link">
            다른 조합 보러가기 →
          </Link>
        </div>

        <p className="result-oneliner">{data.oneLiner}</p>
      </div>
    </div>
  );
}

/* 외부에서 slug 생성 시 사용 */
export { KR_TO_SLUG };
