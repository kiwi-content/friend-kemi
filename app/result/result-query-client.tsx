"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { chemistryData } from "../data/chemistry-data";

/* ──────────────────────────────────────
   오행 이모지 맵
   ────────────────────────────────────── */
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
   Score Ring SVG
   ────────────────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="result-score-ring">
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#e5e2dd"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--rose)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
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
   Section Component
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
   Result Content (needs Suspense for useSearchParams)
   ────────────────────────────────────── */
function ResultContent() {
  const params = useSearchParams();
  const VALID_ELEMENTS = ["목", "화", "토", "금", "수"];
  const n1 = params.get("n1") || "나";
  const n2 = params.get("n2") || "친구";
  const e1Raw = params.get("e1") || "목";
  const e2Raw = params.get("e2") || "화";
  const e1 = VALID_ELEMENTS.find((el) => e1Raw.startsWith(el)) || "목";
  const e2 = VALID_ELEMENTS.find((el) => e2Raw.startsWith(el)) || "화";

  const key = `${e1}_${e2}`;
  const data = chemistryData[key];

  if (!data) {
    return (
      <div className="result-page">
        <div className="result-container">
          <div className="result-error">
            <span style={{ fontSize: "3rem" }}>🤔</span>
            <h2>결과를 찾을 수 없어요</h2>
            <p>다시 테스트해볼까?</p>
            <Link href="/test" className="result-retry-btn">
              다시 테스트하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relBadge = REL_BADGE[data.relationship];

  function handleSaveImage() {
    const W = 1080;
    const H = 1920;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── 배경 ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#faf8f5");
    bg.addColorStop(1, "#f3efe9");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 장식 원
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = "#e8a0b4";
    ctx.beginPath();
    ctx.arc(540, 340, 280, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    const font = (weight: number, size: number) =>
      `${weight} ${size}px "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`;

    // ── 이름 ──
    ctx.textAlign = "center";
    ctx.fillStyle = "#4a4365";
    ctx.font = font(600, 42);
    ctx.fillText(`${ELEMENT_EMOJI[e1]} ${n1}  ✕  ${ELEMENT_EMOJI[e2]} ${n2}`, W / 2, 240);

    // ── 스코어 ──
    ctx.fillStyle = "#e8a0b4";
    ctx.font = font(800, 120);
    ctx.fillText(`${data.score}`, W / 2, 420);
    ctx.fillStyle = "#6e6a80";
    ctx.font = font(500, 36);
    ctx.fillText("점", W / 2 + 90, 420);

    // ── 이모지 + 타이틀 ──
    ctx.font = font(400, 64);
    ctx.fillText(data.emoji, W / 2, 520);
    ctx.fillStyle = "#1a1625";
    ctx.font = font(800, 52);
    ctx.fillText(data.title, W / 2, 600);
    ctx.fillStyle = "#4a4365";
    ctx.font = font(500, 32);
    ctx.fillText(data.subtitle, W / 2, 660);

    // ── 구분선 ──
    ctx.strokeStyle = "#e5e2dd";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(140, 720);
    ctx.lineTo(W - 140, 720);
    ctx.stroke();

    // ── 잘 맞는 점 (상위 2개) ──
    let y = 800;
    ctx.textAlign = "left";
    ctx.fillStyle = "#e8a0b4";
    ctx.font = font(700, 34);
    ctx.fillText("💗 잘 맞는 점", 120, y);
    y += 52;

    data.goodPoints.slice(0, 2).forEach((p) => {
      ctx.fillStyle = "#1a1625";
      ctx.font = font(700, 30);
      ctx.fillText(`${p.emoji} ${p.title}`, 140, y);
      y += 42;
      ctx.fillStyle = "#6e6a80";
      ctx.font = font(400, 26);
      const lines = wrapCanvasText(ctx, p.desc, W - 300);
      lines.forEach((line) => {
        ctx.fillText(line, 140, y);
        y += 36;
      });
      y += 20;
    });

    // ── 갈등 포인트 (상위 2개) ──
    y += 10;
    ctx.fillStyle = "#e8a0b4";
    ctx.font = font(700, 34);
    ctx.fillText("⚡ 갈등 포인트", 120, y);
    y += 52;

    data.conflictPoints.slice(0, 2).forEach((p) => {
      ctx.fillStyle = "#1a1625";
      ctx.font = font(700, 30);
      ctx.fillText(`${p.emoji} ${p.title}`, 140, y);
      y += 42;
      ctx.fillStyle = "#6e6a80";
      ctx.font = font(400, 26);
      const lines = wrapCanvasText(ctx, p.desc, W - 300);
      lines.forEach((line) => {
        ctx.fillText(line, 140, y);
        y += 36;
      });
      y += 20;
    });

    // ── 운세 ──
    y = Math.max(y + 20, 1620);
    ctx.textAlign = "center";
    ctx.fillStyle = "#e8a0b4";
    ctx.font = font(700, 30);
    ctx.fillText("🔮 케미 운세", W / 2, y);
    y += 44;
    ctx.fillStyle = "#4a4365";
    ctx.font = font(500, 26);
    const fortuneLines = wrapCanvasText(ctx, data.fortune, W - 240);
    fortuneLines.forEach((line) => {
      ctx.fillText(line, W / 2, y);
      y += 36;
    });

    // ── 하단 워터마크 ──
    ctx.fillStyle = "#c4b5a8";
    ctx.font = font(500, 26);
    ctx.textAlign = "center";
    ctx.fillText("friend-kemi.vercel.app", W / 2, H - 60);

    // 다운로드
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `케미결과_${n1}_${n2}.png`;
    a.click();
  }

  function handleShare() {
    const cleanParams = new URLSearchParams({ n1, n2, e1, e2 });
    const shareUrl = `${window.location.origin}/result?${cleanParams.toString()}`;
    const text = `${n1}이랑 ${n2}의 케미는? ${data.title} ${data.emoji} ${data.score}점!`;
    if (navigator.share) {
      navigator.share({ title: "친구 케미 궁합", text, url: shareUrl });
    } else {
      navigator.clipboard.writeText(`${text}\n친구 케미 궁합 테스트 해보기 👉\n${shareUrl}`);
      alert("링크가 복사됐어! 친구에게 공유해봐 💗");
    }
  }

  return (
    <div className="result-page">
      <div className="result-container">
        {/* ━━━ 네비 ━━━ */}
        <div className="result-nav">
          <Link href="/test" className="form-back">
            ←
          </Link>
          <span className="form-nav-title">케미 결과</span>
        </div>

        {/* ━━━ 히어로 카드 ━━━ */}
        <div className="result-hero-card">
          {/* 이름 뱃지 */}
          <div className="result-names">
            <div className="result-name-chip">
              <span>{ELEMENT_EMOJI[e1]}</span>
              <span>{n1}</span>
            </div>
            <span className="result-name-x">✕</span>
            <div className="result-name-chip">
              <span>{ELEMENT_EMOJI[e2]}</span>
              <span>{n2}</span>
            </div>
          </div>

          {/* 스코어 링 */}
          <ScoreRing score={data.score} />

          {/* 타이틀 */}
          <div className="result-hero-emoji">{data.emoji}</div>
          <h1 className="result-hero-title">{data.title}</h1>
          <p className="result-hero-subtitle">{data.subtitle}</p>

          {/* 관계 뱃지 */}
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

          {/* 요약 */}
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

        {/* ━━━ 한 줄 운세 ━━━ */}
        <div className="result-fortune-card">
          <span className="result-fortune-icon">🔮</span>
          <p className="result-fortune-title">케미 운세</p>
          <p className="result-fortune-text">{data.fortune}</p>
        </div>

        {/* ━━━ 공유 + 다시하기 ━━━ */}
        <div className="result-actions">
          <button className="result-share-btn" onClick={handleShare}>
            결과 공유하기 💌
          </button>
          <button className="result-save-img-btn" onClick={handleSaveImage}>
            이미지로 저장 📸
          </button>
          <Link href="/test" className="result-retry-link">
            다른 친구랑 다시 해보기 →
          </Link>
        </div>

        {/* ━━━ 하단 한 줄 ━━━ */}
        <p className="result-oneliner">{data.oneLiner}</p>
      </div>
    </div>
  );
}

/* ── canvas 텍스트 줄바꿈 헬퍼 ── */
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split("");
  const lines: string[] = [];
  let line = "";
  for (const char of words) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/* ──────────────────────────────────────
   Export with Suspense wrapper
   ────────────────────────────────────── */
export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="result-page">
          <div className="result-container" style={{ textAlign: "center", paddingTop: "6rem" }}>
            <span style={{ fontSize: "2.5rem" }}>🫶🏻</span>
            <p style={{ fontFamily: "var(--font-display)", marginTop: "1rem", color: "var(--ink-light)" }}>
              케미 분석 중...
            </p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}