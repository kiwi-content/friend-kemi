"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ELEMENTS = ["금", "금", "수", "수", "목", "목", "화", "화", "토", "토"];
function getElement(year: number) {
  return ELEMENTS[year % 10];
}
const ELEMENT_EMOJI: Record<string, string> = {
  목: "🌿", 화: "🔥", 토: "🪨", 금: "⚔️", 수: "🌊",
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
function getDays(year: number, month: number) {
  if (!year || !month) return Array.from({ length: 31 }, (_, i) => i + 1);
  return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);
}

interface PersonData { name: string; year: number; month: number; day: number; }

function InlinePersonForm({ label, emoji, person, onChange }: {
  label: string; emoji: string; person: PersonData;
  onChange: (data: PersonData) => void;
}) {
  const days = getDays(person.year, person.month);
  const element = person.year ? getElement(person.year) : null;

  return (
    <div className="inline-form-card">
      <div className="inline-form-label">
        <span>{emoji}</span> {label}
        {element && (
          <span className="inline-element-badge">
            {ELEMENT_EMOJI[element]} {element}
          </span>
        )}
      </div>
      <input type="text" className="form-input" placeholder="이름 또는 별명" maxLength={10}
        value={person.name} onChange={(e) => onChange({ ...person, name: e.target.value })}
        style={{ padding: "10px 14px", fontSize: "0.9rem" }} />
      <div className="birth-grid" style={{ marginTop: "6px" }}>
        <select className="birth-select" value={person.year || ""} style={{ padding: "10px 10px", fontSize: "0.85rem" }}
          onChange={(e) => onChange({ ...person, year: Number(e.target.value) })}>
          <option value="">년도</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select className="birth-select" value={person.month || ""} style={{ padding: "10px 10px", fontSize: "0.85rem" }}
          onChange={(e) => onChange({ ...person, month: Number(e.target.value) })}>
          <option value="">월</option>
          {months.map((m) => <option key={m} value={m}>{m}월</option>)}
        </select>
        <select className="birth-select" value={person.day || ""} style={{ padding: "10px 10px", fontSize: "0.85rem" }}
          onChange={(e) => onChange({ ...person, day: Number(e.target.value) })}>
          <option value="">일</option>
          {days.map((d) => <option key={d} value={d}>{d}일</option>)}
        </select>
      </div>
    </div>
  );
}

export default function HeroForm() {
  const router = useRouter();
  const [person1, setPerson1] = useState<PersonData>({ name: "", year: 0, month: 0, day: 0 });
  const [person2, setPerson2] = useState<PersonData>({ name: "", year: 0, month: 0, day: 0 });

  const isValid = person1.name.trim() && person1.year && person1.month && person1.day
    && person2.name.trim() && person2.year && person2.month && person2.day;

  function handleSubmit() {
    if (!isValid) return;
    const params = new URLSearchParams({
      n1: person1.name, n2: person2.name,
      e1: getElement(person1.year), e2: getElement(person2.year),
    });
    router.push(`/result?${params.toString()}`);
  }

  return (
    <div className="hero-right-form">
      <div className="hero-form-wrapper">
        <div className="hero-form-header">
          <span style={{ fontSize: "1.5rem" }}>🫶🏻</span>
          <span className="hero-form-title">30초 궁합 확인!</span>
        </div>

        <InlinePersonForm label="나" emoji="💗" person={person1} onChange={setPerson1} />

        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "#e5e2dd" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: "var(--ink-muted)" }}>✕</span>
          <div style={{ flex: 1, height: "1px", background: "#e5e2dd" }} />
        </div>

        <InlinePersonForm label="친구" emoji="🧡" person={person2} onChange={setPerson2} />

        <button className="form-submit" disabled={!isValid} onClick={handleSubmit}
          style={{ marginTop: "12px", padding: "14px", fontSize: "0.95rem", borderRadius: "16px" }}>
          {isValid ? `케미 확인하기 💗` : "정보를 입력해주세요"}
        </button>
      </div>
    </div>
  );
}
