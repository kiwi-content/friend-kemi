"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ──────────────────────────────────────
   오행 계산 유틸
   ────────────────────────────────────── */
const ELEMENTS = ["금", "금", "수", "수", "목", "목", "화", "화", "토", "토"];

function getElement(year: number): string {
  return ELEMENTS[year % 10];
}

const ELEMENT_EMOJI: Record<string, string> = {
  목: "🌿",
  화: "🔥",
  토: "🪨",
  금: "⚔️",
  수: "🌊",
};

/* ──────────────────────────────────────
   연/월/일 옵션 생성
   ────────────────────────────────────── */
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function getDays(year: number, month: number) {
  if (!year || !month) return Array.from({ length: 31 }, (_, i) => i + 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

/* ──────────────────────────────────────
   Person Form Component
   ────────────────────────────────────── */
interface PersonData {
  name: string;
  year: number;
  month: number;
  day: number;
}

function PersonForm({
  label,
  emoji,
  person,
  onChange,
}: {
  label: string;
  emoji: string;
  person: PersonData;
  onChange: (data: PersonData) => void;
}) {
  const days = getDays(person.year, person.month);
  const element = person.year ? getElement(person.year) : null;

  return (
    <div className="form-card">
      <div className="form-card-label">
        <span>{emoji}</span> {label}
        {element && (
          <span
            style={{
              marginLeft: "auto",
              background: "var(--rose-bg)",
              color: "var(--rose)",
              padding: "2px 10px",
              borderRadius: "100px",
              fontSize: "0.75rem",
            }}
          >
            {ELEMENT_EMOJI[element]} {element} 유형
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          className="form-input"
          placeholder="이름 또는 별명"
          maxLength={10}
          value={person.name}
          onChange={(e) => onChange({ ...person, name: e.target.value })}
        />

        <div className="birth-grid">
          <select
            className="birth-select"
            value={person.year || ""}
            onChange={(e) =>
              onChange({ ...person, year: Number(e.target.value) })
            }
          >
            <option value="">태어난 해</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>

          <select
            className="birth-select"
            value={person.month || ""}
            onChange={(e) =>
              onChange({ ...person, month: Number(e.target.value) })
            }
          >
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>

          <select
            className="birth-select"
            value={person.day || ""}
            onChange={(e) =>
              onChange({ ...person, day: Number(e.target.value) })
            }
          >
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}일
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   Test Page
   ────────────────────────────────────── */
export default function TestPage() {
  const router = useRouter();

  const [person1, setPerson1] = useState<PersonData>({
    name: "",
    year: 0,
    month: 0,
    day: 0,
  });

  const [person2, setPerson2] = useState<PersonData>({
    name: "",
    year: 0,
    month: 0,
    day: 0,
  });

  const isValid =
    person1.name.trim() &&
    person1.year &&
    person1.month &&
    person1.day &&
    person2.name.trim() &&
    person2.year &&
    person2.month &&
    person2.day;

  const filledSteps =
    (person1.name.trim() ? 1 : 0) +
    (person1.year && person1.month && person1.day ? 1 : 0) +
    (person2.name.trim() ? 1 : 0) +
    (person2.year && person2.month && person2.day ? 1 : 0);

  function handleSubmit() {
    if (!isValid) return;

    const el1 = getElement(person1.year);
    const el2 = getElement(person2.year);

    const params = new URLSearchParams({
      n1: person1.name,
      n2: person2.name,
      e1: el1,
      e2: el2,
    });

    router.push(`/result?${params.toString()}`);
  }

  return (
    <div className="form-page">
      <div className="form-container">
        {/* 네비게이션 */}
        <div className="form-nav">
          <Link href="/" className="form-back">
            ←
          </Link>
          <span className="form-nav-title">친구 케미 궁합</span>
        </div>

        {/* 스텝 인디케이터 */}
        <div className="form-steps">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`form-step-dot ${i < filledSteps ? "active" : ""}`}
            />
          ))}
        </div>

        {/* 섹션 헤더 */}
        <div className="form-section-header">
          <span className="form-section-emoji">🫶🏻</span>
          <h1 className="form-section-title">케미 궁합 테스트</h1>
          <p className="form-section-sub">
            두 사람의 생년월일을 입력하면
            <br />
            오행 기반 케미를 분석해줄게!
          </p>
        </div>

        {/* 나 */}
        <PersonForm
          label="나"
          emoji="💗"
          person={person1}
          onChange={setPerson1}
        />

        {/* 구분선 */}
        <div className="form-divider">
          <div className="form-divider-line" />
          <span className="form-divider-text">✕</span>
          <div className="form-divider-line" />
        </div>

        {/* 친구 */}
        <PersonForm
          label="내 친구"
          emoji="🧡"
          person={person2}
          onChange={setPerson2}
        />

        {/* 제출 */}
        <button
          className="form-submit"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {isValid
            ? `${person1.name}이랑 ${person2.name} 케미 확인하기 💗`
            : "정보를 입력해주세요"}
        </button>

        <p className="form-notice">
          입력된 정보는 저장되지 않아요 · 결과는 즉시 생성됩니다
        </p>
      </div>
    </div>
  );
}