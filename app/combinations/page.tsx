import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import { chemistryData } from "../data/chemistry-data";
import { OG_IMAGE_PATH, SITE_NAME } from "../lib/seo";

export const metadata: Metadata = {
  title: "전체 오행 궁합 조합 25가지 | 친구 케미 궁합",
  description:
    "목·화·토·금·수 오행 유형별 친구 궁합 조합 25가지를 한눈에 확인하세요. 상생·비화·상극 관계와 궁합 점수까지 모아봤어요.",
  keywords: [
    "오행 궁합 조합",
    "목화토금수 궁합",
    "친구 궁합 전체",
    "사주 오행 친구 궁합",
    "상생 상극 궁합",
    "오행 궁합 점수",
  ],
  alternates: {
    canonical: "/combinations",
  },
  openGraph: {
    title: `전체 오행 궁합 조합 25가지 | ${SITE_NAME}`,
    description:
      "목·화·토·금·수 오행 유형별 친구 궁합 조합 25가지를 한눈에 확인하세요.",
    url: "/combinations",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: `전체 오행 궁합 조합 25가지 | ${SITE_NAME}`,
    description: "오행 유형별 친구 궁합 조합 25가지를 한눈에 확인해보세요.",
    images: [OG_IMAGE_PATH],
  },
};

const ELEMENTS = [
  { slug: "mok",  kr: "목", emoji: "🌿", color: "#34d399", desc: "나무·성장·창의" },
  { slug: "hwa",  kr: "화", emoji: "🔥", color: "#fb7185", desc: "불·열정·추진력" },
  { slug: "to",   kr: "토", emoji: "🪨", color: "#d4a574", desc: "흙·안정·신중함" },
  { slug: "geum", kr: "금", emoji: "⚔️", color: "#94a3b8", desc: "쇠·결단·완벽주의" },
  { slug: "su",   kr: "수", emoji: "🌊", color: "#38bdf8", desc: "물·유연·공감력" },
] as const;

const REL_COLOR: Record<string, string> = {
  상생: "#059669",
  비화: "#7c3aed",
  상극: "#e11d48",
};

export default function Combinations() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-12">
      <Container>
        {/* 네비 */}
        <div className="form-nav">
          <Link href="/" className="form-back">←</Link>
          <span className="form-nav-title">전체 조합 보기</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">오행 궁합 조합 25가지</h1>
        <p className="text-gray-500 text-sm mb-8">
          목·화·토·금·수 유형별 친구 궁합을 한눈에 확인해보세요.
        </p>

        {/* 오행 유형 소개 */}
        <div className="bg-white rounded-3xl p-5 shadow-lg mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">오행 유형 안내</p>
          <div className="space-y-2">
            {ELEMENTS.map((e) => (
              <div key={e.slug} className="flex items-center gap-3">
                <span style={{ fontSize: "1.3rem" }}>{e.emoji}</span>
                <span className="font-semibold w-6" style={{ color: e.color }}>{e.kr}</span>
                <span className="text-sm text-gray-500">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 범례 */}
        <div className="flex gap-3 flex-wrap mb-5">
          {Object.entries(REL_COLOR).map(([rel, color]) => (
            <span
              key={rel}
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: `${color}18`, color }}
            >
              {rel === "상생" ? "상생 ✨" : rel === "비화" ? "비화 🪞" : "상극 ⚡"}
            </span>
          ))}
        </div>

        {/* 5×5 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.5rem",
          }}
        >
          {ELEMENTS.flatMap((e1) =>
            ELEMENTS.map((e2) => {
              const data = chemistryData[`${e1.kr}_${e2.kr}`];
              const relColor = data ? REL_COLOR[data.relationship] : "#888";
              return (
                <Link
                  key={`${e1.slug}-${e2.slug}`}
                  href={`/result/${e1.slug}-${e2.slug}`}
                  title={data ? `${e1.kr}×${e2.kr} — ${data.title} (${data.score}점)` : ""}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0.6rem 0.25rem",
                    borderRadius: "12px",
                    border: `1.5px solid ${relColor}40`,
                    background: "white",
                    textDecoration: "none",
                    fontSize: "0.6rem",
                    color: "#4a4365",
                    gap: "0.2rem",
                  }}
                >
                  <span style={{ fontSize: "1.05rem" }}>{e1.emoji}{e2.emoji}</span>
                  <span style={{ fontWeight: 600 }}>{e1.kr}×{e2.kr}</span>
                  {data && (
                    <span style={{ color: relColor, fontSize: "0.55rem" }}>
                      {data.score}점
                    </span>
                  )}
                </Link>
              );
            })
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/test"
            className="inline-block px-8 py-4 rounded-full text-white font-bold text-sm"
            style={{ background: "var(--rose)", textDecoration: "none" }}
          >
            내 오행 유형 찾고 직접 테스트하기 💗
          </Link>
        </div>
      </Container>
    </section>
  );
}
